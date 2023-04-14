import { useQuery } from "@tanstack/react-query";

const isProduction = import.meta.env.PROD;
const ROOT_URL = isProduction ? "" : "http://127.0.0.1:8000";

const USER_API_HOST = ROOT_URL + "/api/users/c";

const LOGIN_API_HOST = ROOT_URL + "/accounts/login/";

async function postLogin({ payload, token }: any) {
	const response = await fetch(LOGIN_API_HOST, {
		method: "POST",
		headers: { "X-CSRFToken": token },
		credentials: "include",
		body: new URLSearchParams(`login=${payload.login}&password=${payload.password}`),
	});

	if (!response.redirected) throw new Error("Incorrect login info.");

	const getUserResponse = await fetch(USER_API_HOST);

	const userData = await getUserResponse.json();
	if (userData?.id == null) throw new Error("Accessing from different host.");

	return userData;
}

export default postLogin;
