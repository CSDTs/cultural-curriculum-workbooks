import React from "react";
import { useSearchParams } from "react-router-dom";

import AVAILABLE_WORKBOOKS from "./data/";
import logo from "./logo.svg";
import { Counter } from "./components/counter/Counter";
import { Navigation } from "./components/navigation/Navigation";
import Stage from "./components/stage/";
import Sidebar from "./components/sidebar/";

import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, setWorkbook } from "./components/counter/counterSlice";
// import Notification from "./components/notification/Notification";

import NotificationsSystem, { atalhoTheme, dismissNotification, setUpNotifications, notify } from "reapop";
import "./App.css";

function App() {
	const [count, setCount] = React.useState(0);
	const notifications = useSelector((state) => state.notifications);
	const [searchParams, setSearchParams] = useSearchParams();
	let current = searchParams.get("wb") || "cc_math";

	let defaultState = [{ title: "CSDT Workbooks", data: [] }];

	const currentLesson = useSelector((state) => state.counter.value);

	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(setWorkbook(AVAILABLE_WORKBOOKS[current] || defaultState));
		dispatch(notify("Welcome to the documentation", "info"));
	}, [""]);

	setUpNotifications({
		defaultProps: {
			position: "top-right",
			dismissible: true,
		},
	});
	// dispatch(setWorkbook(AVAILABLE_WORKBOOKS[current] || defaultState));

	return (
		<React.Fragment>
			<main className={`justify-content-between d-inline-flex h-100`}>
				<Sidebar />
				<section className={`appContainer col-9`}>
					<Navigation />
					<Stage />

					<NotificationsSystem
						// 2. Pass the notifications you want Reapop to display.
						notifications={notifications}
						// 3. Pass the function used to dismiss a notification.
						dismissNotification={(id) => dispatch(dismissNotification(id))}
						// 4. Pass a builtIn theme or a custom theme.
						theme={atalhoTheme}
					/>
				</section>
			</main>
		</React.Fragment>
	);
}

export default App;
