const isProduction = import.meta.env.PROD;
const ROOT_URL = isProduction ? "" : "http://127.0.0.1:8000";

const LOGOUT_API_HOST = ROOT_URL + "/accounts/logout/";

async function postLogout({ token }: any) {
	const response = await fetch(LOGOUT_API_HOST, {
		method: "POST",
		headers: { "X-CSRFToken": token },
		credentials: "include",
		body: JSON.stringify({}),
	});

	if (response.status === 200) {
		localStorage.removeItem("currentUser");
	}

	return response;
}

export default postLogout;
