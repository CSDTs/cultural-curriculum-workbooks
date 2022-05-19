import * as React from "react";

import { Modal as BootstrapModal, Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import { setWorkbookClassroom } from "../../../slices/workbookSlice.js";
import style from "./NewSavePrompt.module.scss";

export default function Modal() {
	const [show, setShow] = React.useState(false);
	const dispatch = useDispatch();
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const userClassrooms = useSelector((state) => state.workbookState.user.classroom_list);
	const saveObjectClassroom = useSelector((state) => state.workbookState.data.classroom);
	const saveObject = useSelector((state) => state.workbookState.data);

	const saveWithClassNumber = () => {
		// Just as a precaution. Was unable to set current class number on select init.
		let classroomSelected = JSON.parse(document.querySelector("#disabledSelect").value);

		dispatch(setWorkbookClassroom(classroomSelected));
		//TODO: Add save functionality

		handleClose();
	};

	const saveWithoutClassNumber = () => {
		dispatch(setWorkbookClassroom({ id: -1, name: "" }));
		handleClose();
	};

	return (
		<>
			<Button variant="primary" onClick={handleShow}>
				Save and Continue (First Time)
			</Button>

			<BootstrapModal show={show} onHide={handleClose} centered className={style.prompt}>
				<BootstrapModal.Header closeButton>
					<BootstrapModal.Title>First Time Save</BootstrapModal.Title>
				</BootstrapModal.Header>
				<BootstrapModal.Body>
					Since this is your first time saving, please select a classroom number to save it to (or press continue
					without class number to save it to your profile). {saveObjectClassroom.id}
					<br />
					{userClassrooms && (
						<Form>
							<fieldset>
								<Form.Group className="mb-3">
									<Form.Label htmlFor="disabledSelect">All your classrooms</Form.Label>
									<Form.Select
										defaultValue={userClassrooms[0].team}
										id="disabledSelect"
										onChange={(e) => {
											dispatch(setWorkbookClassroom(JSON.parse(e.target.value)));
										}}>
										{userClassrooms.map((classroom) => (
											<option
												key={classroom.team}
												value={JSON.stringify({ id: classroom.team, name: classroom.team_name })}>
												{classroom.team_name}
											</option>
										))}
									</Form.Select>
								</Form.Group>

								{/* <Button type="submit">Submit</Button> */}
							</fieldset>
						</Form>
					)}
					Save Stats: <br />
					{JSON.stringify(saveObject.classroom)} <br />
					{JSON.stringify(saveObject.responses)} <br />
					{JSON.stringify(saveObject.optional)} <br />
					{JSON.stringify(saveObject.current_lesson)} <br />
					{JSON.stringify(saveObject.points_earned)} <br />
				</BootstrapModal.Body>
				<BootstrapModal.Footer>
					<Button variant="success" onClick={saveWithClassNumber}>
						Save
					</Button>
					<Button variant="success" onClick={saveWithoutClassNumber}>
						Save without Class Number
					</Button>
				</BootstrapModal.Footer>
			</BootstrapModal>
		</>
	);
}
