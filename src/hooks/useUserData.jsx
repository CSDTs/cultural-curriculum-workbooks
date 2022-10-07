import {
	loadConfigSave,
	setCurrentUser as setUserSlice,
	setUserClassrooms,
	setWorkbookData,
} from "#slices/workbookSlice";
import { useEffect, useMemo, useState } from "react";
import { FaRegCaretSquareDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
const isProduction = import.meta.env.PROD;
const ROOT_URL = isProduction ? "" : "http://127.0.0.1:8000";
const WORKBOOK_API_HOST = ROOT_URL + "/api/workbook_saves/";
const CLASSROOM_API_HOST = ROOT_URL + "/api/classroom/";
const USER_API_HOST = ROOT_URL + "/api/users/c";
const USER_CLASSROOMS_API_HOST = ROOT_URL + "/api/team/";
const LOGIN_API_HOST = ROOT_URL + "/accounts/login/";
const CSRF_API_HOST = ROOT_URL + "/workbooks/csrf/";

import useLocalStorage from "./useLocalStorage";
const useUserData = () => {
	const dispatch = useDispatch();
	const [currentUser, setCurrentUser] = useState(null);
	const [storedUser, setStoredUser] = useLocalStorage("currentUser");
	const [classrooms, setClassrooms] = useState(null);

	async function getUser() {
		const response = await fetch(`${USER_API_HOST}`);
		const data = await response.json();

		if (data?.id == null) throw new Error("User is not currently logged in");
		return { data, status: response.status };
	}

	async function getClassrooms(id) {
		const response = await fetch(`${USER_CLASSROOMS_API_HOST}?user=${id}`);
		const data = await response.json();

		return { data, status: response.status };
	}

	useEffect(() => {
		if (import.meta.env.DEV) {
			setCurrentUser(storedUser);
			dispatch(setUserSlice(storedUser));
			getClassrooms(storedUser.id).then((res) => {
				if (res.status == 200) {
					setClassrooms(res.data);
					dispatch(setUserClassrooms(res.data));
					return;
				}
				throw new Error("Unable to fetch classrooms from API");
			});
		} else {
			getUser().then((res) => {
				setUserSlice(res.data);
			});
		}
	}, []);

	useEffect(() => {
		if (import.meta.env.DEV) {
			console.table(currentUser);
		}
	}, [currentUser]);

	useEffect(() => {
		if (import.meta.env.DEV) {
			console.table(classrooms);
		}
	}, [classrooms]);

	const saveStatus = useSelector((state) => state.workbookState.save_status);
	const isUserLoggedIn = useSelector((state) => state.workbookState.user.id) == null;
	const lastSaved = useSelector((state) => state.workbookState.data.last_saved);
	// const currentUser = useSelector((state) => state.workbookState.user);
	const userClassrooms = useSelector((state) => state.workbookState.user.classroom_list);
	const saveObjectClassroom = useSelector((state) => state.workbookState.user.selected_classroom);

	return [
		currentUser,
		classrooms,
		{
			saveStatus,
			isUserLoggedIn,
			lastSaved,
			userClassrooms,
			saveObjectClassroom,
		},
	];
};

export default useUserData;
