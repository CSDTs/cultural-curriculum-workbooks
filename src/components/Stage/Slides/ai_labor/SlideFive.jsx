import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	updateResponse,
	updateOptionalResponse,
	updateEarnedPoints,
	updateSaveStatus,
	updateMiscResponse,
	goToNextLesson,
} from "/src/slices/workbookSlice.js";
import { Form, Button } from "react-bootstrap";
import { CreateLunchOptions } from "./index";
import styles from "./Slides.module.scss";

export default function SlideFive() {
	const dispatch = useDispatch();

	const currentMisc = useSelector((state) => state.workbookState.data.misc);

	const updateLunchParams = (value, key) => {
		let temp = {
			[key]: value,
		};

		dispatch(updateMiscResponse(temp));
		dispatch(updateResponse("Params set in misc"));
		dispatch(updateEarnedPoints());
		dispatch(updateSaveStatus(false));
	};

	React.useEffect(() => {
		if (currentMisc.classASet) document.querySelector(`#${currentMisc.classASet}-checkbox`).checked = true;
		if (currentMisc.classACount) document.querySelector(`#classACount-input`).value = currentMisc.classACount;

		if (currentMisc.classBSet) document.querySelector(`#${currentMisc.classBSet}-checkbox`).checked = true;
		if (currentMisc.classBCount) document.querySelector(`#classACount-input`).value = currentMisc.classBCount;
	}, []);

	const homeParams = [
		{ type: "homeHome", label: "Dimmer Lighting" },
		{ type: "homeOutside", label: "Brighter Lighting" },
		{ type: "homeCafeteria", label: "With Square Surfaces" },
	];

	const factoryParams = [
		{ type: "factoryHome", label: "Dimmer Lighting" },
		{ type: "factoryOutside", label: "Brighter Lighting" },
		{ type: "factoryCafeteria", label: "With Square Surfaces" },
	];
	return (
		<React.Fragment>
			<p>
				Now onto solutions! The data from economists suggest that technology does not have to have these impacts. It
				might be possible to design a different kind of system, one where automation empowers workers and consumers.
				This will be one of the most important challenges for your generation. Here are a couple of paths you can
				explore:
			</p>

			<div className="row justify-content-center">
				<div className="col-md-4">
					<img src="./img/ai_labor/food.png" className="w-100" />
					<p>Real vs Fake: create an app to help consumers choose between hand made and machine made products</p>
				</div>
				<div className="col-md-4">
					<img src="./img/ai_labor/patterns.png" className="w-100" />
					<p>Tradition + Tech: help old school designers create new hybrid patterns using AI</p>
				</div>
			</div>
		</React.Fragment>
	);
}
