import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
	Button,
	FormControl,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Select,
	Text,
	useDisclosure,
} from "@chakra-ui/react";

import { setWorkbookClassroom, updateAutoSaveState } from "@/setup/slices/workbookSlice";

import fetchUserSpecificData from "@/fetchers/fetchUserSpecificData";
import { useQuery } from "@tanstack/react-query";

import { LoginPrompt } from "@/features/Authentication";

import useUser from "@/hooks/useUser";
import getSlug from "@/utils/getSlug";

import Loader from "@/components/common/Loader";
import useWorkbook from "@/hooks/useWorkbook";

const SavePrompt: FC = () => {
	const dispatch = useDispatch();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const slug = getSlug();
	const [id, username] = useUser();
	const [firstTime, setFirstTime] = useState(true);
	const [previous, setPrevious] = useState(null);
	const { userData, workbookData } = useWorkbook();
	const reduxAutoSave = workbookData.autosave;
	const reduxUser = userData.id;
	const reduxSaveID = userData.save_id;

	const {
		data: classroomList,
		isLoading: isFetchingClassrooms,
		isError,
		isSuccess,
	} = useQuery(["classrooms"], async () => fetchUserSpecificData(import.meta.env.VITE_CLASSROOMS_API, reduxUser), {
		enabled: !!reduxUser,
	});

	const { data: workbookSaves, isLoading: isFetchingLast } = useQuery(
		["workbookSaves"],
		async () => fetchUserSpecificData(import.meta.env.VITE_WORKBOOK_SAVE_API, reduxUser),
		{
			enabled: !!reduxUser,
		}
	);

	useEffect(() => {
		if (reduxUser && !reduxSaveID) onOpen();
	}, [reduxUser, reduxSaveID]);

	useEffect(() => {
		if (reduxSaveID) setFirstTime(false);
	}, [reduxSaveID]);

	useEffect(() => {
		if (firstTime && workbookSaves && workbookSaves?.length > 0) setPrevious(workbookSaves.pop().id);
	}, [firstTime, workbookSaves]);

	const updateClassroomRedux = (e) => {
		if (!e.target.value) {
			dispatch(setWorkbookClassroom({ id: null, name: "" }));
			return;
		}
		dispatch(setWorkbookClassroom(JSON.parse(e.target.value)));
	};

	const handleReject = () => {
		if (previous) {
			setPrevious(null);
			return;
		}
		dispatch(updateAutoSaveState(false));
		onClose();
	};

	const handleAccept = () => {
		if (previous && import.meta.env.PROD)
			window.location.href = window.location.origin + "/workbooks/start_" + slug + "/" + previous + "/";
		dispatch(updateAutoSaveState(true));
		onClose();
	};

	return (
		<>
			{!reduxUser && <LoginPrompt isPreLaunched={true} />}

			{!reduxAutoSave && firstTime && reduxUser && (
				<button
					className="h-8 px-3 dark:bg-slate-500 bg-slate-600   rounded font-medium text-sm text-white hover:bg-opacity-50 dark:hover:bg-opacity-50"
					onClick={onOpen}>
					First Time Save
				</button>
			)}

			<Modal onClose={onClose} isOpen={isOpen} closeOnOverlayClick={false} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Saving</ModalHeader>
					{(isFetchingLast || isFetchingClassrooms) && (
						<>
							<ModalBody>
								<Loader />
							</ModalBody>
							<ModalFooter> </ModalFooter>
						</>
					)}

					{!isFetchingLast && !isFetchingClassrooms && (
						<>
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

										<Text my={4}>
											Saving is handled automatically. Whenever you make a change to a prompt, it will save to the
											cloud.{" "}
										</Text>
									</>
								)}
							</ModalBody>
							<ModalFooter>
								<Button variant="ghost" onClick={handleReject} mr={3}>
									{previous ? "No, start a new one" : "Skip"}
								</Button>
								<Button colorScheme="blue" onClick={handleAccept} isDisabled={previous && import.meta.env.DEV}>
									{previous ? "Yes, continue" : "Continue"}
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
};

export default SavePrompt;
