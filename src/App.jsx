import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import WorkbookSelection from "./features/WorkbookSelection/WorkbookSelection";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AVAILABLE_WORKBOOKS from "./data/";
import { loadConfigSave, setCurrentUser, setUserClassrooms, setWorkbookData } from "./slices/workbookSlice";
import { getClassrooms, getUser } from "./utils/apiRequests";

import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";

import FirstTimePrompt from "./features/FirstTimePrompt";
import useCurrentLesson from "./hooks/useCurrentLesson";
import { Main, WorkbookLayout } from "./layout";
import SelectionScreen from "./pages/SelectionScreen";

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
		toast.info("You are not currently logged in. Make sure to log in to save your work.", {
			theme: "colored",
			pauseOnHover: false,
			closeOnClick: true,
		});
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

	const [wb, setWb] = useState(null);
	const [lesson, setLesson] = useState(null);

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
	useEffect(() => {
		setWb(AVAILABLE_WORKBOOKS[currentWorkbook]);

		console.log(AVAILABLE_WORKBOOKS[currentWorkbook]);
	}, [currentWorkbook]);

	useEffect(() => {
		console.log(lesson);
	}, [lesson]);

	return (
		<>
			<WorkbookLayout title={wb?.title || "CSDT Workbook"} sections={wb?.data} setLesson={setLesson}>
				<ToastContainer />
				{/* <CurrentSavePrompt /> */}

				{/* {(isValidWorkbook || currentWorkbook) && saveID == null && <FirstTimePrompt />} */}

				{!isValidWorkbook || !currentWorkbook ? <SelectionScreen /> : <Main />}
			</WorkbookLayout>
		</>
	);
}

export default App;
