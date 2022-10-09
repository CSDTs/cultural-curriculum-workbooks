const ROOT_URL = import.meta.env.DEV ? import.meta.env.VITE_ROOT_URL_DEV : "";

const getCsrfToken = async () => {
	const address = `${ROOT_URL}${import.meta.env.CSRF_API}`;
	const options = {
		credentials: "include",
	};

	const response = await fetch(address, options);
	const data = await response.json();
	return data.csrfToken;
};

const fetchWorkbookData = async (id) => {
	const address = `${ROOT_URL}${import.meta.env.VITE_WORKBOOK_SAVE_API}`;
	const query = `${address}?userid=${id}`;
	const response = await fetch(query);
	const data = await response.json();

	return { data, status: response.status, ok: response.ok };
};

const updateWorkbookData = async () => {};

export { fetchWorkbookData };
