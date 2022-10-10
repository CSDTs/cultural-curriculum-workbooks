import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../../setup/slices/workbookSlice";
import AuthService from "../services/AuthService";
import useLocalStorage from "./useLocalStorage";
import { setUserClassrooms } from "/src/setup/slices/workbookSlice";
const ROOT_URL = import.meta.env.DEV ? import.meta.env.VITE_ROOT_URL_DEV : "";

const WORKBOOK_API_HOST = ROOT_URL + "/api/workbook_saves/";
const CLASSROOM_API_HOST = ROOT_URL + "/api/classroom/";
const USER_API_HOST = ROOT_URL + "/api/users/c";
const USER_CLASSROOMS_API_HOST = ROOT_URL + "/api/team/";
const LOGIN_API_HOST = ROOT_URL + "/accounts/login/";
const CSRF_API_HOST = ROOT_URL + "/workbooks/csrf/";

const useUser = () => {
	const [id, setId] = useState(null);
	const dispatch = useDispatch();
	const [username, setUsername] = useState(null);
	const [classrooms, setClassrooms] = useState(null);
	const userData = useSelector((state) => state.workbookState.user);
	const [storedUser, setStoredUser] = useLocalStorage("currentUser");
	const [selectedClassroom, setSelectedClassroom] = useLocalStorage("currentUser");
	const { fetchWorkbooks } = AuthService();

	const authenticateCloud = async () => {
		const address = ROOT_URL + import.meta.env.VITE_USERS_API;
		const response = await fetch(address);
		const data = await response.json();

		if (data?.id == null) throw new Error("User is not currently logged in");

		return { data, status: response.status };
	};

	const fetchClassroomsCloud = async (id) => {
		const response = await fetch(`${USER_CLASSROOMS_API_HOST}?user=${id}`);
		const data = await response.json();

		return { data, status: response.status };
	};

	const authenticateLocal = async () => {
		if (storedUser) return { data: storedUser, status: 200 };
	};

	const fetchClassroomsLocal = async (id) => {
		const testData = [
			{
				id: 2028,
				role: 10,
				team_name: "VISTA",
				team: 281,
			},
			{
				id: 2076,
				role: 20,
				team_name: "VISTA 3",
				team: 297,
			},

			{
				id: 2030,
				role: 20,
				team_name: "VISTA 2",
				team: 282,
			},
		];

		return { data: testData, status: 200 };
	};

	const fetchClassrooms = async (id) => {
		// if (import.meta.env.DEV) return fetchClassroomsLocal();
		return fetchClassroomsCloud(id);
	};

	const authenticate = async () => {
		if (import.meta.env.DEV) return authenticateLocal();
		return authenticateCloud();
	};

	const authorizeNewUser = async () => {
		return "yeet";
	};

	useEffect(() => {
		authenticate().then((res) => {
			setId(res.data.id);
			setUsername(res.data.username);
			setStoredUser(res.data);
			dispatch(setCurrentUser(res.data));
			fetchClassrooms(res.data.id)
				.then((res) => {
					dispatch(setUserClassrooms(res.data));
					fetchWorkbooks().then((res) => {
						console.log(res);
					});
				})
				.catch((err) => console.warn("Unable to find / fetch classrooms for " + username, err));
		});
	}, []);

	useEffect(() => {
		setId(userData.id);
		setUsername(userData.username);
	}, [userData]);

	return [id, username];
};

export default useUser;
