import * as React from "react";
import { useState, useEffect } from "react";
import { Modal as BootstrapModal, Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { workbookRequest, getClassroomInfo } from "#utils/apiRequests";
import { setWorkbookClassroom } from "#slices/workbookSlice.js";
import style from "./NewSavePrompt.module.scss";

import { checkSaveState } from "#utils/apiRequests";

export default function NewSavePrompt(props) {
	const [show, setShow] = React.useState(false);
	const [isSaving, setIsSaving] = React.useState(false);
	const dispatch = useDispatch();
	const handleClose = () => setShow(false);

	const currentUser = useSelector((state) => state.workbookState.user);
	const userClassrooms = useSelector((state) => state.workbookState.user.classroom_list);
	const saveObjectClassroom = useSelector((state) => state.workbookState.user.selected_classroom);
	const [isOptingForAutoSave, setIsOptingForAutoSave] = useState(false);
	const saveWorkbook = props.handleClassNum.bind(this);

	const handleShow = () => {
		setShow(true);
	};

	React.useEffect(() => {
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
	const handleChange = (event) => {
		if (event.target.checked) {
			console.log("✅ Checkbox is checked");
		} else {
			console.log("⛔️ Checkbox is NOT checked");
		}
		setIsOptingForAutoSave((current) => !current);
	};

	return (
		<>
			<Button variant="primary" onClick={handleShow}>
				First Time Save
			</Button>
			{/* <Button variant="primary" onClick={handleShow}>
				Save and Continue (New)
			</Button> */}

			<BootstrapModal show={show} onHide={handleClose} centered className={style.prompt}>
				<BootstrapModal.Header closeButton>
					<BootstrapModal.Title>First Time Save</BootstrapModal.Title>
				</BootstrapModal.Header>
				<BootstrapModal.Body>
					Since this is your first time saving, please select a classroom number to save it to (or press continue
					without class number to save it to your profile).
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
										<option key="disabled-option-2" value={JSON.stringify({ id: null, name: "" })}>
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
					<Form.Check
						type="checkbox"
						id={`enable-auto-save`}
						label={`Select to enable auto saving`}
						value={isOptingForAutoSave}
						onChange={handleChange}
						// checked={isOptingForAutoSave}
						// onChange={() => console.log("auto save enabled")}
					/>
				</BootstrapModal.Body>
				<BootstrapModal.Footer>
					<Button
						variant="outline-primary"
						onClick={() => {
							handleClose();
							window.localStorage.setItem("autoSave", false);
						}}>
						Skip for Now
					</Button>
					<Button
						onClick={() => {
							handleClose();
							window.localStorage.setItem("autoSave", isOptingForAutoSave);
							dispatch(setWorkbookClassroom(JSON.parse(document.querySelector("#disabledSelect").value)));
							setIsSaving(true);
						}}>
						Save and Continue
					</Button>
					{/* <Button
						variant="success"
						onClick={() => {
							handleClose();

							

							dispatch(setWorkbookClassroom({ id: null, name: "" }));
							setIsSaving(true);
						}}>
						Save without Class Number
					</Button> */}
				</BootstrapModal.Footer>
			</BootstrapModal>
		</>
	);
}
