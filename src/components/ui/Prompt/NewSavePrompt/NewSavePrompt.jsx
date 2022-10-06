import { setWorkbookClassroom } from "#slices/workbookSlice.js";
import { getClassroomInfo, workbookRequest } from "#utils/apiRequests";

import * as React from "react";
import { useEffect, useState } from "react";
import { Form, Modal as BootstrapModal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { checkSaveState } from "#utils/apiRequests";
import {
	Button,
	Checkbox,
	FormControl,
	FormErrorMessage,
	FormHelperText,
	FormLabel,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Select,
	useDisclosure,
} from "@chakra-ui/react";

export default function NewSavePrompt(props) {
	const { isOpen, onOpen, onClose } = useDisclosure();
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
	const handleChange = () => {
		setIsOptingForAutoSave((current) => !current);
	};
	const saveAndContinue = () => {
		window.localStorage.setItem("autoSave", isOptingForAutoSave);
		onClose();
		if (import.meta.env.DEV) return;
		saveWorkbook();
	};

	const skipForNow = () => {
		window.localStorage.setItem("autoSave", false);

		onClose();
	};

	React.useEffect(() => {
		if (isSaving) saveWorkbook();
	}, [saveObjectClassroom, isSaving]);

	return (
		<>
			<Button onClick={onOpen} size="sm">
				First Time Save
			</Button>

			<Modal onClose={onClose} isOpen={isOpen} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>First Time Save</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						Since this is your first time saving, please select a classroom number to save it to (or press continue
						without class number to save it to your profile).
						{userClassrooms && userClassrooms.length > 0 && (
							<FormControl as="fieldset">
								<FormLabel htmlFor="classroomSelect">All your classrooms</FormLabel>
								<Select
									placeholder="Select option"
									id={"classroomSelect"}
									defaultValue={userClassrooms[0].team}
									onChange={(e) => {
										if (!e.target.value) {
											dispatch(setWorkbookClassroom({ id: null, name: "" }));
										} else {
											dispatch(setWorkbookClassroom(JSON.parse(e.target.value)));
										}
									}}>
									{userClassrooms.map((classroom) => (
										<option
											key={classroom.team}
											value={JSON.stringify({ id: classroom.team, name: classroom.team_name })}>
											{classroom.team_name}
										</option>
									))}
								</Select>
							</FormControl>
						)}
						{currentUser.id && (
							<Checkbox value={isOptingForAutoSave} onChange={handleChange} defaultChecked={isOptingForAutoSave}>
								Select to enable auto saving
							</Checkbox>
						)}
					</ModalBody>

					<ModalFooter>
						<Button variant="outline-primary" onClick={skipForNow}>
							Skip for Now
						</Button>
						<Button
							onClick={() => {
								onClose();
								window.localStorage.setItem("autoSave", isOptingForAutoSave);
								dispatch(setWorkbookClassroom(JSON.parse(document.querySelector("#disabledSelect").value)));
								setIsSaving(true);
							}}>
							Save and Continue
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}
