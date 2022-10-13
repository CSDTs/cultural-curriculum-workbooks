import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../../setup/slices/workbookSlice";

import useLocalStorage from "./useLocalStorage";
import { setUserClassrooms } from "/src/setup/slices/workbookSlice";
const ROOT_URL = import.meta.env.DEV ? import.meta.env.VITE_ROOT_URL_DEV : "";

const useUser = () => {
	const dispatch = useDispatch();
	const [id, setId] = useState(null);

	const [username, setUsername] = useState(null);

	const userData = useSelector((state) => state.workbookState.user);
	const [storedUser, setStoredUser] = useLocalStorage("currentUser");

	const authenticateCloud = async () => {
		const address = ROOT_URL + import.meta.env.VITE_USERS_API;
		const response = await fetch(address);
		const data = await response.json();

		if (data?.id == null) throw new Error("User is not currently logged in");

		return { data, status: response.status };
	};

	const authenticateLocal = async () => {
		if (storedUser) return { data: storedUser, status: 200 };
	};

	const authenticate = async () => {
		if (import.meta.env.DEV) return authenticateLocal();
		return authenticateCloud();
	};

	useEffect(() => {
		authenticate().then((res) => {
			setId(res.data.id);
			setUsername(res.data.username);
			setStoredUser(res.data);
			dispatch(setCurrentUser(res.data));
		});
	}, []);

	useEffect(() => {
		setId(userData.id);
		setUsername(userData.username);
	}, [userData]);

	return [id, username];
};

export default useUser;
