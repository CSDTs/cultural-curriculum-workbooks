import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import fetchCsrfToken from "@/features/Authentication/fetchers/fetchCsrfToken";
import postLogin from "@/features/Authentication/fetchers/postLogin";
import postLogout from "@/features/Authentication/fetchers/postLogout";
import useLocalStorage from "@/hooks/useLocalStorage";
import { setCurrentUser, setUserClassrooms, updateAutoSaveState } from "@/setup/slices/workbookSlice";
import { RootState } from "@/setup/store";
import { User } from "@/types";
import getSlug from "@/utils/getSlug";
import { useMutation, useQuery } from "@tanstack/react-query";
type AuthResponse = {
	data: User;
	msg: string;
};
const ROOT_URL = import.meta.env.DEV ? import.meta.env.VITE_ROOT_URL_DEV : "";
interface Credentials {
	username: string;
	password: string;
}

interface AuthState {
	isAuthenticated: boolean;
	user: User;
}

const useAuth = () => {
	const dispatch = useDispatch();
	const [localUser, setLocalUser] = useLocalStorage("currentUser");
	const currentLoggedInUser = useSelector((state: RootState) => state.workbookState.user);
	const slug = getSlug();
	const [authState, setAuthState] = useState<AuthState>({
		isAuthenticated: false,
		user: localUser || { username: null, id: null },
	});

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);

	const { data: token } = useQuery(["csrftoken"], fetchCsrfToken);

	const { mutateAsync: mutateLogin } = useMutation(postLogin, {
		onMutate: () => {
			setIsLoading(true);
			setIsError(false);
		},
		onSuccess: (data) => {
			dispatch(setCurrentUser(data));
			setLocalUser(JSON.stringify(data));

			setIsLoading(false);
		},
		onError: (data) => {
			dispatch(setCurrentUser(data));
			setLocalUser(JSON.stringify(data));
			setIsLoading(false);
			setIsError(true);
		},
	});

	const { mutateAsync: mutateLogout } = useMutation(postLogout, {
		onSuccess: () => {
			window.location.href = window.location.origin + "/workbooks/start_" + slug;
		},
	});

	const login = (credentials: Credentials) => {
		// Local with Vite
		if (window.location.origin === import.meta.env.VITE_LOCAL_ROOT) {
			const localCredentials = { id: 12776, username: credentials.username };
			setLocalUser(localCredentials);
			dispatch(setCurrentUser(localCredentials));
		} else {
			//Django
			mutateLogin({ payload: { login: credentials.username, password: credentials.password }, token });
		}
	};

	const logout = () => {
		// Local with Vite
		if (window.location.origin === import.meta.env.VITE_LOCAL_ROOT) {
			localStorage.removeItem("currentUser");
			dispatch(setCurrentUser({ id: null, username: null }));
			dispatch(updateAutoSaveState(false));
		} else {
			//Django
			mutateLogout({ token });
		}
	};

	// Two scenarios: Testing through vite locally, or through django online via dev or prod server.
	const authenticate = async () => {
		// Option 1: Stored user in local storage and testing via Vite.
		if (window.location.origin === import.meta.env.VITE_LOCAL_ROOT) {
			if (localUser) {
				setAuthState({ isAuthenticated: true, user: localUser });

				return {
					data: localUser,
					msg: `Testing locally with '${localUser?.username}' account in vite`,
				} as AuthResponse;
			}
		}

		//Option 2: Inside Django application
		if (
			window.location.origin === import.meta.env.VITE_LOCAL_DJANGO_ROOT ||
			window.location.origin === import.meta.env.VITE_PROD_ROOT
		) {
			try {
				const address = import.meta.env.VITE_USERS_API;
				const response = await fetch(address);
				const data = await response.json();

				if (data?.id == null) throw new Error("User is not logged in");

				setAuthState({ isAuthenticated: true, user: data });

				return { data, msg: `'${data?.username}' has been authenticated.` } as AuthResponse;
			} catch (err) {
				return err;
			}
		}
	};

	useEffect(() => {
		setAuthState({
			isAuthenticated: currentLoggedInUser.id !== null,
			user: currentLoggedInUser || { username: null, id: null },
		});
	}, [currentLoggedInUser]);

	return { authenticate, isLoading, isError, login, authState, logout, currentLoggedInUser };
};

export default useAuth;
