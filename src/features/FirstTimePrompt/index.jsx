import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Button, Modal, Form } from "react-bootstrap";

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

import Prompt from "../../components/Prompt";

import { setSaveDataId, updateAutoSaveState, updateSaveStatus } from "#slices/workbookSlice";
import { setWorkbookClassroom } from "#slices/workbookSlice.js";
import { checkSaveState } from "#utils/apiRequests";
import { updateURL } from "#utils/helpers";
import { serializeResponses } from "#utils/save";
import { triggerNewSave, triggerSaveUpdate } from "#utils/triggerSave";
import styles from "./SavePrompt.module.scss";

import LoginPrompt from "#components/ui/Prompt/LoginPrompt";
import useLocalStorage from "../../hooks/useLocalStorage";
import useUserData from "../../hooks/useUserData";
export default function FirstTimePrompt() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { currentUser, saveObjectClassroom, userClassrooms } = useUserData();

	const [autoSave, setAutosave] = useLocalStorage("autoSave");

	const [isOptingForAutoSave, setIsOptingForAutoSave] = useState(true);
	const [isSaving, setIsSaving] = useState(false);

	const dispatch = useDispatch();

	useEffect(() => {
		onOpen();
	}, []);

	const handleChange = () => {
		setIsOptingForAutoSave((current) => !current);
	};

	useEffect(() => {
		if (isSaving) saveWorkbook();
	}, [saveObjectClassroom, isSaving]);

	const saveAndContinue = (onClose) => {
		window.localStorage.setItem("autoSave", isOptingForAutoSave);
		onClose();
		if (import.meta.env.DEV) return;
		saveWorkbook();
	};

	const skipForNow = (onClose) => {
		setAutoSs;
		window.localStorage.setItem("autoSave", false);

		onClose();
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

	const accept = {
		name: "Save and Continue",
		callback: saveAndContinue,
	};

	const reject = {
		name: "Skip for Now",
		callback: skipForNow,
	};
	return (
		<Prompt title={"First Time Save"} onStart="true" accept={accept} reject={reject} login={!currentUser.id}>
			{!currentUser.id && <p>You have the ability to save your work if you are logged in.</p>}{" "}
			{currentUser.id && userClassrooms && userClassrooms.length > 0 && (
				<>
					<p>You have the option to save to a classroom or save to your profile.</p>

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
								<option key={classroom.team} value={JSON.stringify({ id: classroom.team, name: classroom.team_name })}>
									{classroom.team_name}
								</option>
							))}
						</Select>
					</FormControl>
					{currentUser.id && (
						<Checkbox value={isOptingForAutoSave} onChange={handleChange} defaultChecked={isOptingForAutoSave}>
							Select to enable auto saving
						</Checkbox>
					)}
				</>
			)}
		</Prompt>
	);
}
