const fetchWorkbookData = async (id) => {
	const address = `${import.meta.env.DEV ? import.meta.env.VITE_ROOT_URL_DEV : ""}${
		import.meta.env.VITE_WORKBOOK_SAVE_API
	}`;

	const query = `${address}?userid=${id}`;

	const response = await fetch(query);

	const data = await response.json();

	return { data, status: response.status, ok: response.ok };
};

export { fetchWorkbookData };
