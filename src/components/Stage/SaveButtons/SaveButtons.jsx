import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { ButtonGroup, Button } from "react-bootstrap";
import { notify, dismissNotification } from "reapop";

import { workbookRequest, getClassroomInfo } from "../../../utils/apiRequests";
import { status, fetchedProps, loadProps } from "../../../utils/notificationProps";

import { loadConfigSave } from "../../../slices/workbookSlice";
import NewSavePrompt from "../NewSavePrompt/NewSavePrompt";

import styles from "./SaveButtons.module.scss";

export default function SaveButtons() {
	const RESPONSES = useSelector((state) => state.workbookState.data.responses);
	const saveObject = useSelector((state) => state.workbookState.data);
	const CURRENT_USER = useSelector((state) => state.workbookState.user.username);
	const currentUser = useSelector((state) => state.workbookState.user);
	const dispatch = useDispatch();

	let serializeResponses = () => {
		return {
			owner: currentUser.userID,
			classroom: saveObject.classroom.id || null,
			workbook: 1,
			data: JSON.stringify({
				responses: saveObject.responses,
				optional: saveObject.optional,
				current_lesson: saveObject.current_lesson,
				points_earned: saveObject.points_earned,
				timestamp: new Date().getTime(),
			}),
		};
	};

	const updateSaveObject = (data) => {};

	// const setClassroom = (id) => {
	// 	getClassroomInfo(id).then((res) => {
	// 		console.log(res.data);
	// 	});
	// };
	const fetchWorkbook = (fetchMode) => {
		let project = {};
		dispatch(notify(status[fetchMode].msg, status[fetchMode].state, loadProps));

		if (fetchMode === "POST" || fetchMode === "PATCH") project = serializeResponses();
		if (fetchMode === "GET") project = serializeResponses();

		workbookRequest(project, fetchMode).then((res) => {
			let resState = res.status == 200 || res.status == 201 ? "SUCCESS" : "ERROR";

			if (fetchMode == "GET") resState = res.status == 200 || res.status == 201 ? "SUCCESS_GET" : "ERROR_GET";

			dispatch(loadConfigSave(res.data[0]));

			// setClassroom(282);
			dispatch(dismissNotification(loadProps.id));
			dispatch(notify(`${status[resState].msg}`, status[resState].state, fetchedProps));
		});
	};

	return (
		<div className={`col-auto ${styles.saveGroup}`}>
			<ButtonGroup aria-label="Basic example">
				{CURRENT_USER != "" && (
					<Button variant="secondary" onClick={() => fetchWorkbook("GET")}>
						Update Current
					</Button>
				)}
				{CURRENT_USER != "" && (
					<>
						<Button variant="secondary" onClick={() => fetchWorkbook("GET")}>
							Upload to CSDT
						</Button>

						<Button variant="secondary" onClick={() => fetchWorkbook("GET")}>
							Get Project
						</Button>

						<NewSavePrompt />
					</>
				)}
				{CURRENT_USER == "" && (
					<Button variant="secondary" onClick={() => fetchWorkbook("GET")}>
						Login to Save
					</Button>
				)}
			</ButtonGroup>
		</div>
	);
}
