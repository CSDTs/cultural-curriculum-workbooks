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

import useSave from "../../hooks/useSave";
import AuthService from "../../services/AuthService";
import LoginPrompt from "../authentication/LoginPrompt";
import useLocalStorage from "/src/common/hooks/useLocalStorage";
import useUser from "/src/common/hooks/useUser";
import { getSlug } from "/src/common/services/WorkbookService";
function updateURL(slug, id) {
	// if (window.history !== undefined && window.history.pushState !== undefined) {
	// 	let updatedPathname = window.location.pathname.replace(/\d+$/, `${id}`);
	// 	if (updatedPathname === window.location.pathname) window.history.pushState({}, "", `${updatedPathname}${id}`);
	// 	else window.history.pushState({}, "", updatedPathname);
	// }

	window.history.pushState({}, "", `/workbooks/start_${slug}/${id}/` + window.location.search);
}

export default function SavePrompt({ title, login, onStart, openOnStart, children }) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [id, username] = useUser();
	const [autoSave, setAutoSave] = useLocalStorage("autoSave");
	const classroomList = useSelector((state) => state.workbookState.user.classroom_list);
	const reduxAutoSave = useSelector((state) => state.workbookState.workbook.autosave);
	const reduxUser = useSelector((state) => state.workbookState.user.id);
	const reduxSaveID = useSelector((state) => state.workbookState.user.save_id);
	const [isSaving, isSaved, { saveWorkbook }] = useSave(reduxAutoSave);
	const dispatch = useDispatch();
	const slug = getSlug();
	const [firstTime, setFirstTime] = useState(!reduxSaveID);
	const { fetchWorkbooks } = AuthService();
	const [previous, setPrevious] = useState(null);

	useEffect(() => {
		if (openOnStart) onOpen();
	}, [openOnStart]);

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

	useEffect(() => {
		if (firstTime) {
			fetchWorkbooks().then((res) => {
				if (res.status === 200 && res.data.length > 0) {
					setPrevious(res.data.pop().id);
				}
			});
		}
	}, [firstTime]);

	const saveAndContinue = () => {
		setFirstTime(false);
		saveWorkbook()
			.then((res) => {
				if (res.ok && import.meta.env.PROD) updateURL(slug, res.data.id);
				console.log("app", res);
				if (res.ok) dispatch(updateSaveStatus(true));
				onClose();
				if (import.meta.env.DEV) return;
			})
			.catch((err) => console.error("app", err));
	};

	const skipForNow = () => {
		setAutoSave(false);
		onClose();
	};

	const handleChange = () => {
		setAutoSave((current) => !current);
	};

	const handleContinuePrevious = () => {
		if (import.meta.env.PROD)
			window.location.href = window.location.origin + "/workbooks/start_" + slug + "/" + previous + "/";
	};
	const handleSkip = () => {
		setPrevious(null);
	};
	return (
		<>
			{!reduxUser && (
				// <Button onClick={onOpen} size="sm">
				// 	Save and Continue (First Time)
				// </Button>
				<LoginPrompt saveToContinue={true} />
			)}

			{!reduxAutoSave && firstTime && reduxUser && (
				<Button onClick={onOpen} size="sm">
					First Time Save
				</Button>
			)}

			{!reduxAutoSave && !firstTime && reduxUser && (
				<Button onClick={saveAndContinue} size="sm">
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
						{id && previous && (
							<> You have already started a previous workbook: {previous}. Did you want to continue?</>
						)}
						{id && !previous && (
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
					{!previous && (
						<ModalFooter>
							<Button variant="ghost" onClick={skipForNow} mr={3}>
								Skip
							</Button>

							<Button colorScheme="blue" onClick={saveAndContinue}>
								{autoSave ? "Save and continue" : "Continue"}
							</Button>
						</ModalFooter>
					)}
					{previous && (
						<ModalFooter>
							<Button variant="ghost" onClick={handleSkip} mr={3}>
								No, start a new one
							</Button>

							<Button colorScheme="blue" onClick={handleContinuePrevious} isDisabled={import.meta.env.DEV}>
								Yes, continue
							</Button>
						</ModalFooter>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
