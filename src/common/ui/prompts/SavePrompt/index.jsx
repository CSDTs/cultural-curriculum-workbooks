import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import styles from "./SavePrompt.module.scss";
import { checkSaveState } from "/src/common/utils/apiRequests";
import { updateURL } from "/src/common/utils/helpers";
import { serializeResponses } from "/src/common/utils/save";
import { triggerNewSave, triggerSaveUpdate } from "/src/common/utils/triggerSave";
import { setSaveDataId, updateAutoSaveState, updateSaveStatus } from "/src/setup/slices/workbookSlice";
import { setWorkbookClassroom } from "/src/setup/slices/workbookSlice.js";

import LoginPrompt from "/src/common/ui/prompts/LoginPrompt";
export default function SavePrompt() {
	const checkAutoSave = window.localStorage.getItem("autoSave") || false;

	const [modalShow, setModalShow] = useState(true);
	const [show, setShow] = useState(false);
	const [isSaving, setIsSaving] = useState(false);
	const dispatch = useDispatch();
	const handleClose = () => setShow(false);
	const [isOptingForAutoSave, setIsOptingForAutoSave] = useState(true);
	const currentUser = useSelector((state) => state.workbookState.user);
	const userClassrooms = useSelector((state) => state.workbookState.user.classroom_list);
	const saveObjectClassroom = useSelector((state) => state.workbookState.user.selected_classroom);

	const workbookState = useSelector((state) => state.workbookState);
	const saveData = workbookState.data;

	const isCurrentUser = currentUser.username != "";
	const saveID = currentUser.save_id;
	const isAutoSaveEnabled = window.localStorage.getItem("autoSave") || false;

	const handleChange = (event) => {
		// if (event.target.checked) {
		// 	console.log("✅ Auto save is enabled");
		// } else {
		// 	console.log("⛔️ Auto save is disabled");
		// }
		setIsOptingForAutoSave((current) => !current);
	};

	useEffect(() => {
		if (isSaving) {
			saveWorkbook();
		}
		// checkSaveState(currentUser.id, parseInt(saveObjectClassroom.id)).then((data) => {
		// 	console.log(data);
		// });

		// checkSaveState(currentUser.id, "None").then((data) => {
		// 	console.log(data);
		// });
	}, [saveObjectClassroom, isSaving]);

	const saveAndContinue = () => {
		window.localStorage.setItem("autoSave", isOptingForAutoSave);

		setModalShow(false);
		if (import.meta.env.DEV) return;
		saveWorkbook();
	};

	const skipForNow = () => {
		window.localStorage.setItem("autoSave", false);

		setModalShow(false);
	};

	const saveWorkbook = () => {
		const newSaveResponse = (response) => {
			dispatch(setSaveDataId(response.data.id));
			dispatch(updateSaveStatus(true));
			updateURL(response.data.id);
		};

		const updateSaveResponse = () => {
			dispatch(updateSaveStatus(true));
		};

		const newSaveData = serializeResponses(currentUser, saveData);
		if (!saveID) triggerNewSave(newSaveData, newSaveResponse);
		if (saveID) triggerSaveUpdate(saveID, newSaveData, updateSaveResponse);
	};
	return (
		<Modal
			show={modalShow}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
			className={styles.prompt}>
			<Modal.Header>
				<Modal.Title id="contained-modal-title-vcenter">First Time Save</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{!currentUser.id && <p>You have the ability to save your work if you are logged in.</p>}
				{currentUser.id && userClassrooms && userClassrooms.length > 0 && (
					<>
						<p>You have the option to save to a classroom or save to your profile.</p>
						<Form className="mt-4">
							<fieldset>
								<Form.Group className="mb-3">
									<Form.Label htmlFor="disabledSelect">All your classrooms</Form.Label>
									<Form.Select
										defaultValue={userClassrooms[0].team}
										id="disabledSelect"
										onChange={(e) => {
											dispatch(setWorkbookClassroom(JSON.parse(e.target.value)));
										}}>
										<option key="unselected-option" value={JSON.stringify({ id: null, name: "" })}>
											Select an option...
										</option>
										{userClassrooms.map((classroom) => (
											<option
												key={classroom.team}
												value={JSON.stringify({ id: classroom.team, name: classroom.team_name })}>
												{classroom.team_name}
											</option>
										))}
									</Form.Select>
								</Form.Group>
							</fieldset>
						</Form>
					</>
				)}
				{import.meta.env.DEV && (
					<strong>
						<p className="mt-2">Dev mode. Unable to fetch classrooms </p>
					</strong>
				)}

				{currentUser.id && (
					<Form.Check
						type="checkbox"
						id={`enable-auto-save`}
						label={`Select to enable auto saving`}
						value={isOptingForAutoSave}
						onChange={handleChange}
						checked={isOptingForAutoSave}

						// onChange={() => console.log("auto save enabled")}
					/>
				)}
			</Modal.Body>
			<Modal.Footer>
				<Button variant="outline-primary" onClick={() => skipForNow()} size="sm">
					Skip for Now
				</Button>
				{!currentUser.id && <LoginPrompt />}

				{currentUser.id && (
					<Button onClick={() => saveAndContinue()} size="sm">
						{" "}
						Save and Continue
					</Button>
				)}
			</Modal.Footer>
		</Modal>
	);
}
