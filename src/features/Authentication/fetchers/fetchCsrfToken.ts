const isProduction = import.meta.env.PROD;
const ROOT_URL = isProduction ? "" : "http://127.0.0.1:8000";

const CSRF_API_HOST = ROOT_URL + "/workbooks/csrf/";

const fetchCsrfToken = async () => {
	const response = await fetch(`${CSRF_API_HOST}`, {
		credentials: "include",
	});
	const data = await response.json();

	return data.csrfToken;
};

export default fetchCsrfToken;
