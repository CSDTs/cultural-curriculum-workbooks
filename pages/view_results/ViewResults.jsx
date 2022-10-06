import { useMemo, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

import Navigation from "#components/layout/Navigation";

import { getClassrooms, getUser } from "/src/utils/apiRequests";
import { setWorkbookData, setCurrentUser, setUserClassrooms, loadConfigSave } from "/src/slices/workbookSlice";

import { getAllSaves } from "#utils/apiRequests";
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

	const [saves, setSaves] = useState();
	const [cleanedSaves, setCleanedSaves] = useState();
	let localStorageUser = JSON.parse(localStorage.getItem("currentUser")) || "";

	useEffect(() => {
		if (localStorageUser) setUser(localStorageUser, dispatch);

		getUser()
			.then((response) => {
				if (localStorageUser?.username == response.data?.username) return;
				setUser(response.data, dispatch);
			})
			.catch((error) => notifyError(error));
	}, []);

	useEffect(() => {
		getAllSaves().then((response) => setSaves(response.data));
	}, []);

	useEffect(() => {
		console.log(saves);
	}, [saves]);

	return (
		<main className={`h-100 w-100`}>
			<Navigation user={user} />

			<ToastContainer />
			<section className={` col-md-10 mx-auto mt-5`}>
				<h1>View Results</h1>
				{saves && saves.map((save) => <p>{save.data.toString()}</p>)}
			</section>
		</main>
	);
}

export default App;
