import React from "react";
import { useSearchParams } from "react-router-dom";

import AVAILABLE_WORKBOOKS from "./data/";
// import logo from "./logo.svg";

import Navigation from "./components/Navigation/Navigation";
import Stage from "./components/Stage";
import Sidebar from "./components/Sidebar";
import WorkbookSelection from "./components/WorkbookSelection/WorkbookSelection";
import { useSelector, useDispatch } from "react-redux";
import { setWorkbook } from "./components/counter/counterSlice";

import { setUser } from "./slices/userSlice";

import NotificationsSystem, { atalhoTheme, dismissNotification, setUpNotifications, notify } from "reapop";
import "./App.css";

async function getUser() {
	const response = await fetch("/api/users/c");

	if (!response.ok) {
		const message = `An error has occured: ${response.status}`;
		throw new Error(message);
	}

	const user = await response.json();
	return user;
}

function App() {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.currentUser);
	const notifications = useSelector((state) => state.notifications);
	const [searchParams, setSearchParams] = useSearchParams();

	let currentUser = JSON.parse(localStorage.getItem("currentUser")) || "";
	let currentWorkbook = searchParams.get("wb");
	let isValidWorkbook = currentWorkbook in AVAILABLE_WORKBOOKS;

	React.useEffect(() => {
		if (currentWorkbook && isValidWorkbook) dispatch(setWorkbook(AVAILABLE_WORKBOOKS[currentWorkbook]));

		dispatch(setUser(currentUser || {}));
		getUser().then((onlineUser) => {
			if (onlineUser?.username && currentUser?.username != onlineUser?.username) {
				dispatch(setUser(onlineUser || {}));
				dispatch(notify(`Welcome ${onlineUser.username || "new user"} (Fetch)!`, "info"));
			} else {
				console.info("Local storage matches API current user");
			}
		});

		if (currentUser) dispatch(notify(`Welcome ${currentUser.username || "new user"}!`, "info"));
	}, [""]);

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

					{!isValidWorkbook || !currentWorkbook ? <WorkbookSelection /> : <Stage />}
				</section>
			</main>

			<NotificationsSystem
				// 2. Pass the notifications you want Reapop to display.
				notifications={notifications}
				// 3. Pass the function used to dismiss a notification.
				dismissNotification={(id) => dispatch(dismissNotification(id))}
				// 4. Pass a builtIn theme or a custom theme.
				theme={atalhoTheme}
			/>
		</React.Fragment>
	);
}

export default App;
