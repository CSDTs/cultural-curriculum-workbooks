import React from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

import Navigation from "./components/layout/Navigation";
import Stage from "./components/layout/Stage/Stage";
import Sidebar from "./components/layout/Sidebar";
import WorkbookSelection from "./features/WorkbookSelection/WorkbookSelection";

import { getClassrooms, getUser } from "./utils/apiRequests";
import { setWorkbookData, setCurrentUser, setUserClassrooms, loadConfigSave } from "./slices/workbookSlice";
import SavePrompt from "#components/ui/Prompt/SavePrompt";
import AVAILABLE_WORKBOOKS from "./data/";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

const checkForWorkbookType = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	let urlParam = searchParams.get("wb");
	if (urlParam != null) return urlParam;

	if (typeof config !== "undefined") return config.slug;

	return "";
};

const checkForCurrentSave = (dispatch) => {
	if (typeof config === "undefined") return {};
	dispatch(loadConfigSave(config));
};

const notifyError = (error) => {
	if (import.meta.env.PROD)
		toast.error("There seems to be an issue connecting to the server. Please try again later.", { theme: "colored" });
	console.error(error);
};

const setUser = (userObject, dispatch) => {
	dispatch(setCurrentUser(userObject));

	getClassrooms(userObject.id)
		.then((response) => {
			dispatch(setUserClassrooms(response.data));
		})
		.catch((error) => notifyError(error));
};

function App() {
	const dispatch = useDispatch();

	const user = useSelector((state) => state.workbookState.user);
	const saveID = user.save_id;

	let localStorageUser = JSON.parse(localStorage.getItem("currentUser")) || "";

	const currentWorkbook = checkForWorkbookType();
	const isValidWorkbook = currentWorkbook in AVAILABLE_WORKBOOKS;

	React.useEffect(() => {
		if (currentWorkbook && isValidWorkbook) dispatch(setWorkbookData(AVAILABLE_WORKBOOKS[currentWorkbook]));

		if (localStorageUser) setUser(localStorageUser, dispatch);

		getUser()
			.then((response) => {
				if (localStorageUser?.username == response.data?.username) return;
				setUser(response.data, dispatch);
			})
			.catch((error) => notifyError(error));

		checkForCurrentSave(dispatch);
	}, []);

	return (
		<>
			<main className={`d-inline-flex h-100 w-100`}>
				{(isValidWorkbook || currentWorkbook) && <Sidebar />}
				<section className={`appContainer ${!isValidWorkbook || !currentWorkbook ? "col-12" : "w-100"}`}>
					<Navigation user={user} />
					<ToastContainer />
					{/* <CurrentSavePrompt /> */}
					{(isValidWorkbook || currentWorkbook) && saveID == null && <SavePrompt />}

					{!isValidWorkbook || !currentWorkbook ? <WorkbookSelection /> : <Stage />}
				</section>
			</main>
		</>
	);
}

export default App;
