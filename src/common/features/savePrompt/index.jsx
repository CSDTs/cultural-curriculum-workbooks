import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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
	Switch,
	Text,
	useDisclosure,
} from "@chakra-ui/react";

import { checkSaveState } from "/src/common/utils/apiRequests";
// import { updateURL } from "/src/common/utils/helpers";
import { serializeResponses } from "/src/common/utils/serializeResponses";

import { setSaveDataId, updateAutoSaveState, updateSaveStatus } from "/src/setup/slices/workbookSlice";
import { setWorkbookClassroom } from "/src/setup/slices/workbookSlice.js";

import useLocalStorage from "/src/common/hooks/useLocalStorage";

import useUser from "/src/common/hooks/useUser";

export default function SavePrompt({ title, login, onStart, children }) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [id, username] = useUser();
	const [autoSave, setAutoSave] = useLocalStorage("autoSave");
	const classroomList = useSelector((state) => state.workbookState.user.classroom_list);
	const dispatch = useDispatch();

	useEffect(() => {
		if (onStart) onOpen();
	}, []);
	useEffect(() => {
		dispatch(updateAutoSaveState(autoSave));
	}, [autoSave]);

	const updateClassroomRedux = (e) => {
		if (!e.target.value) {
			dispatch(setWorkbookClassroom({ id: null, name: "" }));
		} else {
			dispatch(setWorkbookClassroom(JSON.parse(e.target.value)));
		}
	};

	const saveAndContinue = () => {
		// window.localStorage.setItem("autoSave", isOptingForAutoSave);
		onClose();
		if (import.meta.env.DEV) return;
	};

	const skipForNow = () => {
		setAutoSave(false);
		onClose();
	};

	const handleChange = () => {
		setAutoSave((current) => !current);
	};

	return (
		<>
			{!onStart && (
				<Button onClick={onOpen} size="sm">
					Save and Continue
				</Button>
			)}

			<Modal onClose={onClose} isOpen={isOpen} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Saving</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						{!id && <p>You have the ability to save your work if you are logged in.</p>}
						{id && (
							<>
								<Text>Hey {username}! We noticed that this is your first time saving this workbook.</Text>

								{classroomList && classroomList.length > 0 && (
									<>
										<Text my={2} fontWeight={600}>
											Select your classroom:
										</Text>
										<FormControl as="fieldset">
											<Select
												placeholder="Select option"
												id={"classroomSelect"}
												defaultValue={classroomList[0].team}
												onChange={updateClassroomRedux}>
												{classroomList.map((classroom) => (
													<option
														key={classroom.team}
														value={JSON.stringify({ id: classroom.team, name: classroom.team_name })}>
														{classroom.team_name}
													</option>
												))}
											</Select>
										</FormControl>
									</>
								)}

								<Text my={4}>You can enable autosaving, or you can save manually. </Text>
								<FormControl display="flex" alignItems="center">
									<FormLabel htmlFor="enable-autosave" mb="0">
										Enable autosave?
									</FormLabel>
									<Switch id="enable-autosave" onChange={handleChange} isChecked={autoSave} />
								</FormControl>
							</>
						)}
					</ModalBody>

					<ModalFooter>
						<Button variant="ghost" onClick={skipForNow}>
							Skip for now
						</Button>

						<Button onClick={saveAndContinue}>{autoSave ? "Save and continue" : "Continue"}</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}
