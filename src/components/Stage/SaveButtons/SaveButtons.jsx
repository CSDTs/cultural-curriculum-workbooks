import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { ButtonGroup, Button, Dropdown } from "react-bootstrap";
import { toast } from "react-toastify";

import { workbookRequest, getClassroomInfo } from "../../../utils/apiRequests";
import { status, fetchedProps, loadProps } from "../../../utils/notificationProps";
import LoginPrompt from "../LoginPropmt/LoginPrompt";
import { loadConfigSave, setSaveDataId, updateSaveStatus } from "../../../slices/workbookSlice";
import NewSavePrompt from "../NewSavePrompt/NewSavePrompt";

import styles from "./SaveButtons.module.scss";

const notifySaving = () => toast.loading("Saving your work, please wait...", { theme: "colored" });
const notifyTest = () => toast.loading("Saving your work, please wait...", { theme: "colored" });
const notifyGetting = () => toast.loading("Fetching your workbooks, please wait...", { theme: "colored" });

const errorProps = {
	render: "There was an error saving your work. Please try again later.",
	type: "error",
	isLoading: false,
	autoClose: 5000,
};

const successProps = { render: "Workbook Saved!", type: "success", isLoading: false, autoClose: 5000 };

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

	const fetchUserWorkbooks = () => {
		const getToast = notifyGetting();

		workbookRequest(serializeResponses(), "GET")
			.then((response) => {
				if (!response.ok) {
					toast.update(getToast, errorProps);
					return;
				}
				toast.update(getToast, successProps);
				console.log(response.data);
			})
			.catch((error) => {
				toast.update(getToast, errorProps);
				console.log(error);
			});
	};

	const newWorkbookSave = () => {
		const postToast = notifySaving();

		workbookRequest(serializeResponses(), "POST")
			.then((response) => {
				if (!response.ok) {
					toast.update(postToast, errorProps);
					return;
				}

				toast.update(postToast, successProps);

				dispatch(setSaveDataId(response.data.id));
				dispatch(updateSaveStatus(true));

				if (window.history !== undefined && window.history.pushState !== undefined) {
					let updatedPathname = window.location.pathname.replace(/\d+$/, `${response.data.id}`);
					window.history.pushState({}, "", updatedPathname);
				}
			})
			.catch((error) => {
				toast.update(postToast, errorProps);
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

		const putToast = notifyTest();

		workbookRequest(pendingSaveData, "PUT")
			.then((response) => {
				if (!response.ok) {
					toast.update(putToast, errorProps);
					console.log(response);
					return;
				}

				toast.update(putToast, successProps);

				dispatch(updateSaveStatus(true));
			})
			.catch((error) => {
				toast.update(putToast, errorProps);
				console.log(error);
			});
	};

	const printState = (givenState) => {
		console.log(givenState);
	};

	const checkIfCanBeSaved = () => {};

	return (
		<div className={`col-auto ${styles.saveGroup}`}>
			<ButtonGroup aria-label="Basic example">
				{((isCurrentUser && saveID) || (isCurrentUser && !userClassrooms)) && (
					<>
						{/* <Button
							variant="secondary"
							onClick={() => {
								updateWorkbookSave();
								alert("TODO: add redirect to user's workbook page");
							}}>
							Save and Exit
						</Button> */}
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
