import React from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

import Navigation from "./components/Navigation/Navigation";
import Stage from "./components/Stage";
import Sidebar from "./components/Sidebar";
import WorkbookSelection from "./components/WorkbookSelection/WorkbookSelection";

import { getClassrooms, getUser } from "./utils/apiRequests";
import { setWorkbookData, setCurrentUser, setUserClassrooms, loadConfigSave } from "./slices/workbookSlice";

import AVAILABLE_WORKBOOKS from "./data/";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

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
		<React.Fragment>
			<main className={`justify-content-between d-inline-flex h-100 w-100`}>
				{(isValidWorkbook || currentWorkbook) && <Sidebar />}
				<section className={`appContainer ${!isValidWorkbook || !currentWorkbook ? "col-12" : "col-9"}`}>
					<Navigation user={user} />
					<ToastContainer />
					{!isValidWorkbook || !currentWorkbook ? <WorkbookSelection /> : <Stage />}
				</section>
			</main>
		</React.Fragment>
	);
}

export default App;
