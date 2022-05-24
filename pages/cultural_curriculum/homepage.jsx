import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

import Navigation from "#components/Navigation/Navigation";

import Application from "./Application";
import Filter from "./Filter";

import { getClassrooms, getUser } from "/src/utils/apiRequests";
import { setWorkbookData, setCurrentUser, setUserClassrooms, loadConfigSave } from "/src/slices/workbookSlice";
import { motion, AnimatePresence } from "framer-motion";

import "/src/App.css";
import "./styles.scss";
import "react-toastify/dist/ReactToastify.css";

const notifyError = (error) => {
	if (import.meta.env.PROD)
		toast.error("There seems to be an issue connecting to the server. Please try again later.", { theme: "colored" });
	console.error(error);
};

const setUser = (userObject, dispatch) => {
	dispatch(setCurrentUser(userObject));
};

function App() {
	const dispatch = useDispatch();

	const user = useSelector((state) => state.workbookState.user);

	const [apps, setApps] = useState([]);
	const [filtered, setFiltered] = useState([]);
	const [activeTags, setActiveTags] = useState(0);

	const fetchApplications = async () => {
		const res = await fetch("data.json");
		const data = await res.json();
		setApps(data);
		setFiltered(data);
	};

	let localStorageUser = JSON.parse(localStorage.getItem("currentUser")) || "";

	React.useEffect(() => {
		if (localStorageUser) setUser(localStorageUser, dispatch);

		fetchApplications();

		getUser()
			.then((response) => {
				if (localStorageUser?.username == response.data?.username) return;
				setUser(response.data, dispatch);
			})
			.catch((error) => notifyError(error));
	}, []);

	return (
		<React.Fragment>
			<main className={`h-100 w-100`}>
				<Navigation user={user} />

				<ToastContainer />
				<section className={` col-md-10 mx-auto mt-5`}>
					<Filter apps={apps} setFiltered={setFiltered} activeTags={activeTags} setActiveTags={setActiveTags} />
					<motion.div layout className={`applications`}>
						<AnimatePresence>
							{filtered.map((app) => (
								<Application {...app} key={app.name} />
							))}
						</AnimatePresence>
					</motion.div>
				</section>
			</main>
		</React.Fragment>
	);
}

export default App;
