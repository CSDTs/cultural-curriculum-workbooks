import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { ButtonGroup, Button, Dropdown } from "react-bootstrap";
import { notify, dismissNotification } from "reapop";

import { workbookRequest, getClassroomInfo } from "../../../utils/apiRequests";
import { status, fetchedProps, loadProps } from "../../../utils/notificationProps";
import LoginPrompt from "../LoginPropmt/LoginPrompt";
import { loadConfigSave, setSaveDataId, updateSaveStatus } from "../../../slices/workbookSlice";
import NewSavePrompt from "../NewSavePrompt/NewSavePrompt";

import styles from "./SaveButtons.module.scss";

export default function SaveButtons() {
	const saveData = useSelector((state) => state.workbookState.data);
	const currentUser = useSelector((state) => state.workbookState.user);
	const workbookData = useSelector((state) => state.workbookState.workbook);
	const stat = useSelector((state) => state.workbookState.save_status);
	const userClassrooms = currentUser.classroom_list;
	const isCurrentUser = currentUser.username != "";

	const saveID = useSelector((state) => state.workbookState.user.save_id);

	const dispatch = useDispatch();

	let serializeResponses = () => {
		return {
			owner: currentUser.id,
			classroom: currentUser.selected_classroom.id || null,
			workbook: 1,
			data: JSON.stringify(saveData),
			progression: saveData.completion,
		};
	};

	const fetchWorkbook = (fetchMode) => {
		let project = serializeResponses();
		dispatch(notify(status[fetchMode].msg, status[fetchMode].state, loadProps));

		workbookRequest(project, fetchMode).then((res) => {
			let resState = res.status == 200 || res.status == 201 ? "SUCCESS" : "ERROR";

			if (fetchMode == "GET") resState = res.status == 200 || res.status == 201 ? "SUCCESS_GET" : "ERROR_GET";

			dispatch(loadConfigSave(res.data[0]));

			dispatch(dismissNotification(loadProps.id));
			dispatch(notify(`${status[resState].msg}`, status[resState].state, fetchedProps));
		});
	};

	const saveAndContinue = () => {
		workbookRequest(serializeResponses(), "GET")
			.then((response) => {
				if (response.status == 200 || response.status == 201) {
					dispatch(notify(`${status["SUCCESS"].msg}`, status["SUCCESS"].state, fetchedProps));
				}
			})
			.catch((error) => {
				dispatch(notify(`${status["ERROR"].msg}`, status["ERROR"].state, fetchedProps));
				console.log(error);
			});
	};

	const fetchUserWorkbooks = () => {
		workbookRequest(serializeResponses(), "GET")
			.then((response) => {
				if (response.status == 200 || response.status == 201) {
					dispatch(notify(`${status["SUCCESS"].msg}`, status["SUCCESS"].state, fetchedProps));
				}
			})
			.catch((error) => {
				dispatch(notify(`${status["ERROR"].msg}`, status["ERROR"].state, fetchedProps));
				console.log(error);
			});
	};

	const newWorkbookSave = () => {
		workbookRequest(serializeResponses(), "POST")
			.then((response) => {
				if (response.status == 200 || response.status == 201) {
					dispatch(notify(`${status["SUCCESS"].msg}`, status["SUCCESS"].state, fetchedProps));
					console.log(response);
					dispatch(setSaveDataId(response.data.id));
					dispatch(updateSaveStatus(true));
					if (window.history !== undefined && window.history.pushState !== undefined) {
						window.history.pushState({}, "", window.location.pathname + response.data.id);
					}
				}
			})
			.catch((error) => {
				dispatch(notify(`${status["ERROR"].msg}`, status["ERROR"].state, fetchedProps));
				console.log(error);
			});
	};

	const updateWorkbookSave = () => {
		if (!saveID) {
			newWorkbookSave();
			return;
		}

		let pendingSaveData = serializeResponses();
		Object.assign(pendingSaveData, { id: saveID });
		dispatch(notify(`${status["PUT"].msg}`, status["PUT"].state, loadProps));
		workbookRequest(pendingSaveData, "PUT")
			.then((response) => {
				if (response.status == 200 || response.status == 201) {
					dispatch(notify(`${status["SUCCESS"].msg}`, status["SUCCESS"].state, fetchedProps));
					dispatch(updateSaveStatus(true));
					dispatch(dismissNotification(loadProps.id));
					console.log(response.data);
				}
			})
			.catch((error) => {
				dispatch(notify(`${status["ERROR"].msg}`, status["ERROR"].state, fetchedProps));
				console.log(error);
			});
	};

	const printState = (givenState) => {
		console.log(givenState);
	};

	return (
		<div className={`col-auto ${styles.saveGroup}`}>
			<ButtonGroup aria-label="Basic example">
				{((isCurrentUser && saveID) || (isCurrentUser && !userClassrooms)) && (
					<>
						<Button
							variant="secondary"
							onClick={() => {
								updateWorkbookSave();
								alert("TODO: add redirect to user's workbook page");
							}}>
							Save and Exit
						</Button>
						<Button variant="secondary" onClick={() => updateWorkbookSave()}>
							Save and Continue
						</Button>
					</>
				)}
				{isCurrentUser && !saveID && userClassrooms && <NewSavePrompt handleClassNum={newWorkbookSave} />}

				{import.meta.env.DEV && (
					<Dropdown>
						<Dropdown.Toggle variant="success" id="dropdown-basic">
							Test API Requests
						</Dropdown.Toggle>

						<Dropdown.Menu>
							<Dropdown.Item onClick={() => fetchUserWorkbooks()}>GET</Dropdown.Item>
							<Dropdown.Item onClick={() => newWorkbookSave()}>POST</Dropdown.Item>
							<Dropdown.Item onClick={() => updateWorkbookSave()}>PUT</Dropdown.Item>
							<Dropdown.Item onClick={() => printState(workbookData)}>Print Workbook State</Dropdown.Item>
							<Dropdown.Item onClick={() => printState(currentUser)}>Print User State</Dropdown.Item>
							<Dropdown.Item onClick={() => printState(saveData)}>Print Data State</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				)}

				{!isCurrentUser && <LoginPrompt />}
			</ButtonGroup>
		</div>
	);
}
