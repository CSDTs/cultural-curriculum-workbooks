import React from "react";
import { useSelector, useDispatch } from "react-redux";

// import { export } from "../counter/counterSlice.js";

export default function SaveButtons() {
	const dispatch = useDispatch();
	const RESPONSES = useSelector((state) => state.counter.responses);

	let exportAsJSON = () => {
		download("workbook.json", JSON.stringify(serializeResponses(RESPONSES)));
	};

	let serializeResponses = (responses) => {
		return {
			responses: responses,
			timestamp: new Date().getTime(),
		};
	};

	let download = (filename, text) => {
		let element = document.createElement("a");
		element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
		element.setAttribute("download", filename);

		element.style.display = "none";
		document.body.appendChild(element);

		element.click();

		document.body.removeChild(element);
	};

	return (
		<div className="col-auto">
			<button className="btn btn-secondary btn-inline">Save and Exit</button>
			<button className="btn btn-primary btn-inline" onClick={exportAsJSON}>
				Save and Continue
			</button>
		</div>
	);
}
