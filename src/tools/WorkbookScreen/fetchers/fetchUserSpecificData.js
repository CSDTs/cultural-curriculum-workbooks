const isProduction = import.meta.env.PROD;
const ROOT_URL = isProduction ? "" : "http://127.0.0.1:8000";
const WORKBOOK_API_HOST = ROOT_URL + "/api/workbook_saves/";
const CLASSROOM_API_HOST = ROOT_URL + "/api/classroom/";
const USER_API_HOST = ROOT_URL + "/api/users/c";
const USER_CLASSROOMS_API_HOST = ROOT_URL + "/api/team/";
const LOGIN_API_HOST = ROOT_URL + "/accounts/login/";
const LOGOUT_API_HOST = ROOT_URL + "/accounts/logout/";
const CSRF_API_HOST = ROOT_URL + "/workbooks/csrf/";
import axios from "axios";
const fetchClassrooms = async (id) => {
	const response = await fetch(`${USER_CLASSROOMS_API_HOST}?user=${id}`);
	const data = await response.json();

	return { data, status: response.status };
};
const fetchWorkbooks = async (id) => {
	const response = await fetch(`${WORKBOOK_API_HOST}?user=${id}`);
	const data = await response.json();

	return { data, status: response.status };
};

const fetchUserSpecificData = async (host, id) => {
	// const [_, host, id] = queryKey;
	const address = `${ROOT_URL + host}?user=${id}`;
	const response = await axios.get(address);
	// console.log(data);
	return response.data;
};

export default fetchUserSpecificData;
