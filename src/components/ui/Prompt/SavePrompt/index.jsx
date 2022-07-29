import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Modal, Form } from "react-bootstrap";
import styles from "./SavePrompt.module.scss";
import { setWorkbookClassroom } from "#slices/workbookSlice.js";
import { checkSaveState } from "#utils/apiRequests";
import { triggerSaveUpdate, triggerNewSave } from "#utils/triggerSave";
import { updateURL } from "#utils/helpers";
import { setSaveDataId, updateSaveStatus, updateAutoSaveState } from "#slices/workbookSlice";
import { serializeResponses } from "#utils/save";
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
		if (event.target.checked) {
			console.log("✅ Auto save is enabled");
		} else {
			console.log("⛔️ Auto save is disabled");
		}
		setIsOptingForAutoSave((current) => !current);
	};

	useEffect(() => {
		if (isSaving) {
			saveWorkbook();
		}
		checkSaveState(currentUser.id, parseInt(saveObjectClassroom.id)).then((data) => {
			console.log(data);
		});

		checkSaveState(currentUser.id, "None").then((data) => {
			console.log(data);
		});
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
				<p>You have the option to save to a classroom or save to your profile.</p>
				{userClassrooms && userClassrooms.length > 0 && (
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
				)}
				{import.meta.env.DEV && (
					<strong>
						<p className="mt-2">Dev mode. Unable to fetch classrooms </p>
					</strong>
				)}
				<Form.Check
					type="checkbox"
					id={`enable-auto-save`}
					label={`Select to enable auto saving`}
					value={isOptingForAutoSave}
					onChange={handleChange}
					checked={isOptingForAutoSave}
					// onChange={() => console.log("auto save enabled")}
				/>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="outline-primary" onClick={() => skipForNow()}>
					Skip for Now
				</Button>
				<Button onClick={() => saveAndContinue()}>Save and Continue</Button>
			</Modal.Footer>
		</Modal>
	);
}
