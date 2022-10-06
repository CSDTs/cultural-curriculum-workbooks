import { toast } from "react-toastify";

const isProduction = import.meta.env.PROD;
const ROOT_URL = isProduction ? "" : "http://127.0.0.1:8000";
const WORKBOOK_API_HOST = ROOT_URL + "/api/workbook_saves/";
const CSRF_API_HOST = ROOT_URL + "/workbooks/csrf/";

let _csrfToken = null;
const successProps = {
	render: "Your workbook successfully saved.",
	type: "success",
	isLoading: false,
	autoClose: 5000,
	pauseOnHover: true,
	closeOnClick: true,
	closeButton: true,
};

const saveErrorProps = {
	render: "There was an error saving your work. Please try again later.",
	type: "error",
	isLoading: false,
	autoClose: 5000,
	pauseOnHover: true,
	closeOnClick: true,
	closeButton: true,
};
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

	// console.log(alterProps);
	// console.log(response);
	// console.log(data);
	return { data, status: response.status, ok: response.ok };
}

const errCallback = (err, obj, props) => {
	// toast.update(obj, props);
	console.error(err);
};

const newWorkbookSave = (data, callback) => {
	// const postToast = toast.loading("Saving your work, please wait...", { theme: "colored" });

	workbookRequest(data, "POST")
		.then((response) => {
			// toast.update(postToast, !response.ok ? saveErrorProps : successProps);

			if (response.ok) callback(response);
		})
		.catch((err) => errCallback(err, postToast, saveErrorProps));
};

const updateWorkbookSave = (id, data, callback) => {
	// const putToast = toast.loading("Saving your work, please wait...", { theme: "colored" });

	let pendingSaveData = Object.assign(data, { id: id });

	workbookRequest(pendingSaveData, "PUT")
		.then((response) => {
			// toast.update(putToast, !response.ok ? saveErrorProps : successProps);

			if (response.ok) callback(response);
		})
		.catch((err) => errCallback(err, putToast, saveErrorProps));
};

function triggerNewSave(data, callback) {
	// console.log("new save");
	newWorkbookSave(data, callback);
	// updateWorkbookSave(callback);
}

function triggerSaveUpdate(id, data, callback) {
	// console.log("update save");
	updateWorkbookSave(id, data, callback);
}

function triggerSave(data, callback, id = null) {
	if (id) Object.assign(data, { id: id });
	workbookRequest(data, id ? "PUT" : "POST")
		.then((response) => {
			if (response.ok) callback(response);
		})
		.catch((err) => errCallback(err, postToast, saveErrorProps));
}

export { triggerNewSave, triggerSaveUpdate, triggerSave };
