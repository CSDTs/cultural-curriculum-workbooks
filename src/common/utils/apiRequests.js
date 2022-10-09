const isProduction = import.meta.env.PROD;
const ROOT_URL = isProduction ? "" : "http://127.0.0.1:8000";
const WORKBOOK_API_HOST = ROOT_URL + "/api/workbook_saves/";
const CLASSROOM_API_HOST = ROOT_URL + "/api/classroom/";
const USER_API_HOST = ROOT_URL + "/api/users/c";
const USER_CLASSROOMS_API_HOST = ROOT_URL + "/api/team/";
const LOGIN_API_HOST = ROOT_URL + "/accounts/login/";
const CSRF_API_HOST = ROOT_URL + "/workbooks/csrf/";

let _csrfToken = null;

async function getCsrfToken() {
	if (_csrfToken === null) {
		const response = await fetch(`${CSRF_API_HOST}`, {
			credentials: "include",
		});
		const data = await response.json();
		_csrfToken = data.csrfToken;
	}
	return _csrfToken;
}

async function workbookRequest(project, method) {
	let alterProps = {
		method: method,
		headers: method === "GET" ? {} : { "X-CSRFToken": await getCsrfToken(), "Content-Type": "application/json" },
		credentials: "include",
		body: JSON.stringify(project),
	};
	let query = "";
	if (method === "GET") query = `?userid=${project.owner}`;
	if (method === "POST") query = ``;
	if (method === "PUT") query = `${project?.id || ""}/`;

	const response = await fetch(`${WORKBOOK_API_HOST}${query}`, method === "GET" ? {} : alterProps);
	const data = await response.json();

	return { data, status: response.status, ok: response.ok };
}

async function getClassroomInfo(id) {
	const response = await fetch(`${CLASSROOM_API_HOST}?classid=${id}`);
	const data = await response.json();

	return { data, status: response.status };
}

async function getUser() {
	const response = await fetch(`${USER_API_HOST}`);
	const data = await response.json();

	if (data?.id == null) throw new Error("User is not currently logged in");
	return { data, status: response.status };
}

async function getClassrooms(userid) {
	const response = await fetch(`${USER_CLASSROOMS_API_HOST}?user=${userid}`);
	const data = await response.json();

	return { data, status: response.status };
}

async function loginUser() {
	let payload = {
		login: document.querySelector("#formUsername").value,
		password: document.querySelector("#formPassword").value,
	};

	const response = await fetch(`http://127.0.0.1:8000/accounts/login/`, {
		method: "POST",
		headers: { "X-CSRFToken": await getCsrfToken() },
		credentials: "include",
		body: new URLSearchParams(`login=${payload.login}&password=${payload.password}`),
	});

	if (!response.redirected) throw new Error("Incorrect login info.");

	const getUserResponse = await fetch(`http://127.0.0.1:8000/api/users/c`);
	const userData = await getUserResponse.json();
	if (userData?.id == null) throw new Error("Accessing from different host.");

	localStorage.setItem("currentUser", JSON.stringify(userData));

	return { data: userData, status: getUserResponse.status };
}

async function checkSaveState(user, classroom) {
	const response = await fetch(`${WORKBOOK_API_HOST}?userid=${user}&classroom=${classroom}`);
	const data = await response.json();

	return { data, status: response.status };
}

async function getAllSaves() {
	const response = await fetch(`${WORKBOOK_API_HOST}`);

	const data = await response.json();

	return { data, status: response.status };
}

export {
	getAllSaves,
	getCsrfToken,
	workbookRequest,
	getClassroomInfo,
	getClassrooms,
	getUser,
	loginUser,
	checkSaveState,
};
