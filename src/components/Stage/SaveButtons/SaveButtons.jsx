import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { ButtonGroup, Button } from "react-bootstrap";
import { notify } from "reapop";

import styles from "./SaveButtons.module.css";

export default function SaveButtons() {
	const RESPONSES = useSelector((state) => state.counter.responses);
	const CURRENT_USER = useSelector((state) => state.currentUser.username);
	const dispatch = useDispatch();

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

	let uploadToCSDT = () => {
		dispatch(
			notify(`Progress is being uploaded...`, "loading", {
				dismissible: false,
				showDismissButton: false,
				dismissAfter: false,
			})
		);
	};

	return (
		<div className={`col-auto ${styles.saveGroup}`}>
			<ButtonGroup aria-label="Basic example">
				{CURRENT_USER != "" && <Button variant="secondary">Save and Exit</Button>}
				{CURRENT_USER != "" && (
					<Button variant="secondary" onClick={exportAsJSON}>
						Save and Continue
					</Button>
				)}
				{CURRENT_USER == "" && (
					<Button variant="secondary" onClick={uploadToCSDT}>
						Login to Save
					</Button>
				)}
			</ButtonGroup>
		</div>
	);
}
