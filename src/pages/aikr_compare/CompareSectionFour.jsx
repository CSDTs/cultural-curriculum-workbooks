import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { updateResponse, updateEarnedPoints, updateSaveStatus } from "#slices/workbookSlice.js";

import styles from "./Slides.module.scss";

export default function CompareSectionFour() {
	const dispatch = useDispatch();

	const data = useSelector((state) => state.workbookState.data);

	let currentMisc = data.misc || "";

	// Generates embedded params for Joe's Lunch (now obsolete since slide to set params was removed)
	const getURL = () => {
		let myIframe = document.querySelector("iframe");
		let url_string = "./build/index.html";

		let paramsURL =
			url_string +
			`?embedded=true&` +
			`classASet=` +
			(currentMisc?.classASet || "") +
			`&classACount=` +
			(currentMisc?.classACount || 0) +
			`&classBSet=` +
			(currentMisc?.classBSet || "") +
			`&classBCount=` +
			(currentMisc?.classBCount || 0);

		myIframe.src = paramsURL;

		dispatch(updateResponse(paramsURL));
		dispatch(updateEarnedPoints());
		dispatch(updateSaveStatus(false));
	};

	useEffect(() => {
		getURL();
	}, []);

	return <iframe className={`w-100 shadow ${styles.lunchFrame}`}></iframe>;
}
