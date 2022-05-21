import * as React from "react";

import { Modal as BootstrapModal, Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { workbookRequest, getClassroomInfo } from "../../../utils/apiRequests";
import { setWorkbookClassroom } from "../../../slices/workbookSlice.js";
import style from "./NewSavePrompt.module.scss";

export default function Modal(props) {
	const [show, setShow] = React.useState(false);
	const [isSaving, setIsSaving] = React.useState(false);
	const dispatch = useDispatch();
	const handleClose = () => setShow(false);
	const handleShow = () => {
		setShow(true);
	};

	const userClassrooms = useSelector((state) => state.workbookState.user.classroom_list);
	const saveObjectClassroom = useSelector((state) => state.workbookState.user.selected_classroom);

	const saveWorkbook = props.handleClassNum.bind(this);

	React.useEffect(() => {
		if (isSaving) {
			saveWorkbook();
		}
	}, [saveObjectClassroom, isSaving]);

	return (
		<>
			<Button variant="primary" onClick={handleShow}>
				Save and Exit (New)
			</Button>
			<Button variant="primary" onClick={handleShow}>
				Save and Continue (New)
			</Button>

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
				</BootstrapModal.Body>
				<BootstrapModal.Footer>
					<Button
						variant="success"
						onClick={() => {
							handleClose();
							dispatch(setWorkbookClassroom(JSON.parse(document.querySelector("#disabledSelect").value)));
							setIsSaving(true);
						}}>
						Save
					</Button>
					<Button
						variant="success"
						onClick={() => {
							handleClose();
							dispatch(setWorkbookClassroom({ id: null, name: "" }));
							setIsSaving(true);
						}}>
						Save without Class Number
					</Button>
				</BootstrapModal.Footer>
			</BootstrapModal>
		</>
	);
}
