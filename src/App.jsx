import React, { Suspense } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import NotificationsSystem, { atalhoTheme, dismissNotification, setUpNotifications, notify } from "reapop";

import Navigation from "./components/Navigation/Navigation";
import Stage from "./components/Stage";
import Sidebar from "./components/Sidebar";
import WorkbookSelection from "./components/WorkbookSelection/WorkbookSelection";

import { getClassrooms, getUser } from "./utils/apiRequests";

import { setWorkbookData, setCurrentUser, setUserClassrooms, loadConfigSave } from "./slices/workbookSlice";

import { commonProps } from "./utils/notificationProps";

import "./App.css";

import AVAILABLE_WORKBOOKS from "./data/";

const checkForWorkbookType = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	let urlParam = searchParams.get("wb");
	if (urlParam != null) return urlParam;

	if (typeof config !== "undefined") return config.slug;

	return "";
};

const checkForCurrentSave = (dispatch) => {
	if (typeof config === "undefined") return {};

	dispatch(loadConfigSave(JSON.parse(config.data)));
};

const throwConnectionError = (error, dispatch) => {
	dispatch(
		notify(`There seems to be an error connecting to the server. Please try again later`, "warning", commonProps)
	);
	console.log(error);
};

function App() {
	const dispatch = useDispatch();

	const user = useSelector((state) => state.workbookState.user);
	const notifications = useSelector((state) => state.notifications);
	const currentLesson = useSelector((state) => state.workbookState.workbook.current_lesson);
	let localStorageUser = JSON.parse(localStorage.getItem("currentUser")) || "";
	let onlineUser = "";

	const currentWorkbook = checkForWorkbookType();
	const isValidWorkbook = currentWorkbook in AVAILABLE_WORKBOOKS;

	React.useEffect(() => {
		if (currentWorkbook && isValidWorkbook) {
			dispatch(setWorkbookData(AVAILABLE_WORKBOOKS[currentWorkbook]));
		}

		if (localStorageUser) {
			dispatch(setCurrentUser(localStorageUser));

			getClassrooms(localStorageUser.id).then((res) => {
				dispatch(setUserClassrooms(res.data));
			});
		}

		getUser()
			.then((res) => {
				onlineUser = res.data;

				dispatch(notify(`Welcome back ${onlineUser.username}`, "info", commonProps));

				if (localStorageUser?.username == onlineUser?.username) return;

				dispatch(setCurrentUser(onlineUser));

				getClassrooms(onlineUser.id)
					.then((res) => {
						dispatch(setUserClassrooms(res.data));
					})
					.catch((error) => throwConnectionError(error, dispatch));
			})
			.catch((error) => throwConnectionError(error, dispatch));

		checkForCurrentSave(dispatch);
	}, []);

	setUpNotifications({
		defaultProps: {
			position: "top-right",
			dismissible: true,
			dismissAfter: 5000,
			showDismissButton: true,
		},
	});

	return (
		<React.Fragment>
			<main className={`justify-content-between d-inline-flex h-100 w-100`}>
				{(isValidWorkbook || currentWorkbook) && <Sidebar />}

				<section className={`appContainer ${!isValidWorkbook || !currentWorkbook ? "col-12" : "col-9"}`}>
					<Navigation user={user} />

					<Suspense fallback={<h5>Loading ... </h5>}>
						{!isValidWorkbook || !currentWorkbook ? <WorkbookSelection /> : <Stage />}
					</Suspense>
				</section>
			</main>

			<NotificationsSystem
				notifications={notifications}
				dismissNotification={(id) => dispatch(dismissNotification(id))}
				theme={atalhoTheme}
			/>
		</React.Fragment>
	);
}

export default App;
