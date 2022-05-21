import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	updateResponse,
	updateOptionalResponse,
	updateEarnedPoints,
	updateMiscResponse,
	updateSaveStatus,
} from "/src/slices/workbookSlice.js";

import styles from "./Slides.module.scss";

const STATIC_URL = "./img/aikr_compare/";

export default function SlideSix() {
	const dispatch = useDispatch();

	const data = useSelector((state) => state.workbookState.data);
	const index = useSelector((state) => state.workbookState.workbook.current_lesson_id);

	let currentMisc = data.misc || "";

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
		// dispatch(updateResponse(paramsURL));

		dispatch(updateResponse(paramsURL));
		dispatch(updateEarnedPoints());
		dispatch(updateSaveStatus(false));
	};

	React.useEffect(() => {
		getURL();
	}, []);
	return (
		<React.Fragment>
			<iframe className={`w-100 shadow ${styles.lunchFrame}`}></iframe>
		</React.Fragment>
	);
}
