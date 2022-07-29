import * as React from "react";

import { Modal as BootstrapModal, Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { workbookRequest, getClassroomInfo } from "../../../../utils/apiRequests";
import { setWorkbookClassroom } from "../../../../slices/workbookSlice.js";
import style from "./CurrentSavePrompt.module.scss";

import { checkSaveState } from "../../../../utils/apiRequests";

export default function CurrentSaveModal(props) {
	const [show, setShow] = React.useState(false);
	const [isSaving, setIsSaving] = React.useState(false);
	const [userSave, setUserSave] = React.useState("#!");
	const dispatch = useDispatch();
	const handleClose = () => setShow(false);

	const currentUser = useSelector((state) => state.workbookState.user);
	const currentSlug = useSelector((state) => state.workbookState.workbook.slug);
	// const userClassrooms = useSelector((state) => state.workbookState.user.classroom_list);
	// const saveObjectClassroom = useSelector((state) => state.workbookState.user.selected_classroom);

	// const saveWorkbook = props.handleClassNum.bind(this);
	const currentSaveId = useSelector((state) => state.workbookState.user.save_id);
	const handleShow = () => {
		setShow(true);
	};

	React.useEffect(() => {
		if (currentUser?.id)
			checkSaveState(currentUser.id, "").then((response) => {
				console.log(currentUser);
				if (response.data.length > 0 && !currentSaveId) {
					setUserSave(`/workbooks/start_${currentSlug}/${response.data[0].id}`);
					setShow(true);
				}
			});
	}, [currentUser]);

	return (
		<>
			<BootstrapModal show={show} onHide={handleClose} centered className={style.prompt}>
				<BootstrapModal.Header closeButton>
					<BootstrapModal.Title>First Time Save</BootstrapModal.Title>
				</BootstrapModal.Header>
				<BootstrapModal.Body>
					It appears that you already have started this workbook. Would you like to continue your previous progress? Or
					start a new one?
				</BootstrapModal.Body>
				<BootstrapModal.Footer>
					<Button
						variant="success"
						onClick={() => {
							handleClose();
						}}>
						Start New Workbook
					</Button>
					<Button variant="success" href={userSave}>
						Continue from Last Save
					</Button>
				</BootstrapModal.Footer>
			</BootstrapModal>
		</>
	);
}
