import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import fetchCsrfToken from "@/fetchers/fetchCsrfToken";
import fetchUserSpecificData from "@/fetchers/fetchUserSpecificData";
import postLogin from "@/fetchers/postLogin";
import postLogout from "@/fetchers/postLogout";
import useLocalStorage from "@/hooks/useLocalStorage";
import { setCurrentUser, setWorkbookClassroom, updateAutoSaveState } from "@/setup/slices/workbookSlice";
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
	// True until the initial on-load session check resolves — lets the UI avoid flashing the
	// login modal before we know whether the user is already logged in.
	const [isAuthenticating, setIsAuthenticating] = useState<boolean>(true);

	const { data: token } = useQuery(["csrftoken"], fetchCsrfToken);

	const { mutateAsync: mutateLogin } = useMutation(postLogin, {
		onMutate: () => {
			setIsLoading(true);
			setIsError(false);
		},
		onSuccess: (data) => {
			dispatch(setCurrentUser(data));
			setLocalUser(data);

			setIsLoading(false);
		},
		onError: (data) => {
			// dispatch(setCurrentUser(data));
			localStorage.removeItem("currentUser");
			setIsLoading(false);
			setIsError(true);
		},
	});

	const { mutateAsync: mutateLogout } = useMutation(postLogout, {
		onSuccess: () => {
			window.location.href = window.location.origin + "/workbooks/start_" + slug;
		},
	});

	const classrooms = useQuery(
		["classrooms"],
		async () => fetchUserSpecificData(import.meta.env.VITE_CLASSROOMS_API, authState.user.id),
		{
			enabled: !!authState.user.id,
		}
	);

	const setSelectedClassroom = (e: ChangeEvent<HTMLSelectElement>) => {
		if (!e.target.value) {
			dispatch(setWorkbookClassroom({ id: null, name: "" }));
			return;
		}
		dispatch(setWorkbookClassroom(JSON.parse(e.target.value)));
	};

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

	// Two scenarios: testing through Vite locally (no Django session — use the cached user),
	// or served/embedded by Django (derive the user from the session cookie).
	const authenticate = async () => {
		// Option 1: standalone Vite dev server — use the localStorage-cached user.
		if (window.location.origin === import.meta.env.VITE_LOCAL_ROOT) {
			if (localUser) {
				setAuthState({ isAuthenticated: true, user: localUser });

				return {
					data: localUser,
					msg: `Testing locally with '${localUser?.username}' account in vite`,
				} as AuthResponse;
			}
			return;
		}

		// Option 2: served by Django (any other origin — csdt.org, a staging host,
		// localhost vs 127.0.0.1, etc.). Ask the backend who the session cookie belongs to.
		// Do NOT gate on an exact origin string: that silently breaks session restoration on
		// refresh whenever the real serving origin differs from the hardcoded env values.
		try {
			const address = import.meta.env.VITE_USERS_API;
			const response = await fetch(address, { credentials: "include" });
			const data = await response.json();

			if (data?.id == null) throw new Error("User is not logged in");

			setAuthState({ isAuthenticated: true, user: data });

			return { data, msg: `'${data?.username}' has been authenticated.` } as AuthResponse;
		} catch (err) {
			return err;
		}
	};

	//Change status of user auth based on logged in user
	useEffect(() => {
		setAuthState({
			isAuthenticated: currentLoggedInUser.id !== null,
			user: currentLoggedInUser || { username: null, id: null },
		});
	}, [currentLoggedInUser]);

	//On app load, restore the logged-in user (from the Django session, or the local cache).
	useEffect(() => {
		authenticate()
			.then((res: any) => {
				if (res?.data?.id != null) dispatch(setCurrentUser(res.data));
			})
			.finally(() => setIsAuthenticating(false));
	}, []);

	return {
		authenticate,
		isLoading,
		isAuthenticating,
		isError,
		login,
		authState,
		logout,
		currentLoggedInUser,
		classrooms,
		setSelectedClassroom,
	};
};

export default useAuth;
