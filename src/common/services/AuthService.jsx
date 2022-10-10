const isProduction = import.meta.env.PROD;
const ROOT_URL = isProduction ? "" : "http://127.0.0.1:8000";
const WORKBOOK_API_HOST = ROOT_URL + "/api/workbook_saves/";
const CLASSROOM_API_HOST = ROOT_URL + "/api/classroom/";
const USER_API_HOST = ROOT_URL + "/api/users/c";
const USER_CLASSROOMS_API_HOST = ROOT_URL + "/api/team/";
const LOGIN_API_HOST = ROOT_URL + "/accounts/login/";
const LOGOUT_API_HOST = ROOT_URL + "/accounts/logout/";
const CSRF_API_HOST = ROOT_URL + "/workbooks/csrf/";

function AuthService() {
	async function getCsrfToken() {
		const response = await fetch(`${CSRF_API_HOST}`, {
			credentials: "include",
		});
		const data = await response.json();
		return data.csrfToken;
	}

	async function login(username, password) {
		let payload = {
			login: username,
			password: password,
		};

		const response = await fetch(LOGIN_API_HOST, {
			method: "POST",
			headers: { "X-CSRFToken": await getCsrfToken() },
			credentials: "include",
			body: new URLSearchParams(`login=${payload.login}&password=${payload.password}`),
		});

		if (!response.redirected) throw new Error("Incorrect login info.");

		const getUserResponse = await fetch(USER_API_HOST);
		const userData = await getUserResponse.json();
		if (userData?.id == null) throw new Error("Accessing from different host.");

		localStorage.setItem("currentUser", JSON.stringify(userData));

		return { data: userData, status: getUserResponse.status };
	}
	async function logout() {
		const response = await fetch(LOGOUT_API_HOST, {
			method: "POST",
			headers: { "X-CSRFToken": await getCsrfToken() },
			credentials: "include",
			body: JSON.stringify({}),
		});

		if (response.status === 200) {
			localStorage.removeItem("currentUser");
		}

		return { status: response.status };
	}

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

	async function loginUser(username, password) {
		let payload = {
			login: username,
			password: password,
		};

		const response = await fetch(`http://127.0.0.1:8000/accounts/login/`, {
			method: "POST",
			headers: { "X-CSRFToken": await getCsrfToken() },
			credentials: "include",
			body: new URLSearchParams(`login=${payload.login}&password=${payload.password}`),
		});

		console.log(response.redirected);

		if (!response.redirected) throw new Error("Incorrect login info.");

		const getUserResponse = await fetch(`http://127.0.0.1:8000/api/users/c`);
		const userData = await getUserResponse.json();
		if (userData?.id == null) throw new Error("Accessing from different host.");

		localStorage.setItem("currentUser", JSON.stringify(userData));

		return { data: userData, status: getUserResponse.status };
	}

	return {
		getCsrfToken,
		login,
		loginUser,
		logout,
		fetchClassrooms,
		fetchWorkbooks,
	};
}

export default AuthService;

// async function loginUser() {
// 	let payload = {
// 		login: document.querySelector("#formUsername").value,
// 		password: document.querySelector("#formPassword").value,
// 	};

// 	const response = await fetch(`http://127.0.0.1:8000/accounts/login/`, {
// 		method: "POST",
// 		headers: { "X-CSRFToken": await getCsrfToken() },
// 		credentials: "include",
// 		body: new URLSearchParams(`login=${payload.login}&password=${payload.password}`),
// 	});

// 	console.log(response.redirected);

// 	if (!response.redirected) throw new Error("Incorrect login info.");

// 	const getUserResponse = await fetch(`http://127.0.0.1:8000/api/users/c`);
// 	const userData = await getUserResponse.json();
// 	if (userData?.id == null) throw new Error("Accessing from different host.");

// 	localStorage.setItem("currentUser", JSON.stringify(userData));

// 	return { data: userData, status: getUserResponse.status };
// }
