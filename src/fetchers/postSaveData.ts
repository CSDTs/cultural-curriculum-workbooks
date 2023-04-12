const ROOT_URL = import.meta.env.PROD ? "" : "http://127.0.0.1:8000";
const WORKBOOK_API_HOST = ROOT_URL + "/api/workbook_saves/";
const postSaveData = async ({ saveID, updatedSaveData, token }) => {
	const method = saveID ? "PUT" : "POST";
	const query = saveID ? `${updatedSaveData?.id || ""}/` : ``;

	let alterProps = {
		method: method,
		headers: { "X-CSRFToken": token, "Content-Type": "application/json" },
		credentials: "include",
		body: JSON.stringify(updatedSaveData),
	};

	const response = await fetch(`${WORKBOOK_API_HOST}${query}`, alterProps);
	return response.json();
};

export default postSaveData;
