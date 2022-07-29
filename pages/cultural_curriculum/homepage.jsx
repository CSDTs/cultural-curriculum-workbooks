import React, { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

import Navigation from "#components/layout/Navigation";

import Application from "./Application/Application";
import Filter from "./Filter/Filter";
import Menu from "./Filter/Menu";
import Search from "./Filter/Search";

import AdvancedFilter from "./Filter";

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

	const [apps, setApps] = useState([]); //CardList
	var [filtered, setFiltered] = useState([]); //Selectedcategory
	// const [searchField, setSearchField] = useState(""); //forsearchfield
	// var [searchResult, setSearchResult] = useState([]); //for search result to iterate
	// const [selectedOption, setSelectedOption] = useState(0);

	// const [activeTags, setActiveTags] = useState(0);

	const fetchApplications = async () => {
		const res = await fetch("data.json");
		const data = await res.json();
		setApps(data);
		setFiltered(data);
		// setOptionList(data);
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
					{/* <Menu
						apps={apps}
						setFiltered={setFiltered}
						selectedOption={selectedOption}
						setSelectedOption={setSelectedOption}
					/> */}
					{/* <Search
						apps={apps}
						setFiltered={setFiltered}
						setSearchResult={setSearchResult}
						setSearchField={setSearchField}
						searchField={searchField}
					/> */}

					{/* Added parent filter to handle all filtering operations */}
					<AdvancedFilter apps={apps} setFiltered={setFiltered} />
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
