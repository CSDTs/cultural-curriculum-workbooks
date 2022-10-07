import { serializeResponses } from "#utils/save";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useLocalStorage from "./useLocalStorage";

const isProduction = import.meta.env.PROD;
const ROOT_URL = isProduction ? "" : "http://127.0.0.1:8000";
const CSRF_API_HOST = ROOT_URL + "/workbooks/csrf/";
const WORKBOOK_API_HOST = ROOT_URL + "/api/workbook_saves/";

const useSave = (autosave = true) => {
	const currentUser = useSelector((state) => state.workbookState.user);
	const saveData = useSelector((state) => state.workbookState.data);
	const saveID = useSelector((state) => state.workbookState.user.save_id);
	const updatedSaveData = serializeResponses(currentUser, saveData);

	const data = useSelector((state) => state.workbookState.data);
	const index = useSelector((state) => state.workbookState.workbook.current_lesson_id);

	let currentResponse = data.responses[index] || "";
	let currentOptional = data.optional[index] || "";

	const [isSaving, setIsSaving] = useState(false);
	const [isSaved, setIsSaved] = useState(autosave ? currentResponse : false);
	const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

	const getCsrfToken = async () => {
		let _csrfToken = null;

		const response = await fetch(`${CSRF_API_HOST}`, {
			credentials: "include",
		});
		const data = await response.json();
		_csrfToken = data.csrfToken;

		return _csrfToken;
	};

	const saveWorkbookProd = async () => {
		if (saveID) {
			Object.assign(updatedSaveData, { id: saveID });
		}

		const method = saveID ? "PUT" : "POST";
		const query = saveID ? `${updatedSaveData?.id || ""}/` : ``;

		let token = await getCsrfToken();

		let alterProps = {
			method: method,
			headers: { "X-CSRFToken": token, "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify(updatedSaveData),
		};
		console.log(alterProps);
		const response = await fetch(`${WORKBOOK_API_HOST}${query}`, alterProps);
		const data = await response.json();

		return { data, status: response.status, ok: response.ok };
	};

	const saveWorkbookDev = async () => {
		setIsSaving(true);
		if (saveID) {
			Object.assign(updatedSaveData, { id: saveID });
		}

		const method = saveID ? "PUT" : "POST";
		const query = saveID ? `${updatedSaveData?.id || ""}/` : ``;

		let token = await getCsrfToken();

		let alterProps = {
			method: method,
			headers: { "X-CSRFToken": token, "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify(updatedSaveData),
		};

		sessionStorage.setItem("data", JSON.stringify(updatedSaveData));

		await delay(1000);

		const response = JSON.parse(sessionStorage.getItem("data"));
		const data = await { response, status: 201, ok: true };

		console.log(alterProps);
		setIsSaving(false);
		setIsSaved(data.status == 201 ? true : false);
		return data;
	};

	return [
		isSaving,
		isSaved,
		{
			serializedData: updatedSaveData,
			saveWorkbook: import.meta.env.DEV ? saveWorkbookDev : saveWorkbookProd,
		},
	];
};

export default useSave;
