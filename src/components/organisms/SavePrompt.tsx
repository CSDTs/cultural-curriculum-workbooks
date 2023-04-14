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

import { LoginPrompt } from "@/components/organisms/authentication";

// import useUser from "@/hooks/useUser";
import getSlug from "@/utils/getSlug";

import { Loader } from "@/components/atoms";
import useAuth from "@/hooks/useAuth";
import useWorkbook from "@/hooks/useWorkbook";

const SavePrompt: FC = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const slug = getSlug();
	const { setSelectedClassroom, classrooms, currentLoggedInUser } = useAuth();

	const { workbookData, saveState, setPrevious, setAutoSave } = useWorkbook();
	const { id, username } = currentLoggedInUser;
	useEffect(() => {
		if (currentLoggedInUser.id && !currentLoggedInUser.save_id) onOpen();
	}, [currentLoggedInUser]);

	const handleReject = () => {
		if (saveState.previous_project) {
			setPrevious(null);
			return;
		}
		setAutoSave(false);
		onClose();
	};

	const handleAccept = () => {
		if (saveState.previous_project && import.meta.env.PROD)
			window.location.href =
				window.location.origin + "/workbooks/start_" + slug + "/" + saveState.previous_project + "/";
		setAutoSave(true);
		onClose();
	};

	return (
		<>
			{!currentLoggedInUser.id && <LoginPrompt isPreLaunched={true} />}

			{!workbookData.autosave && saveState.isFirstTime && currentLoggedInUser.id && (
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
					{(saveState.isFetchingPrevious || classrooms.isLoading) && (
						<>
							<ModalBody>
								<Loader />
							</ModalBody>
							<ModalFooter> </ModalFooter>
						</>
					)}

					{!saveState.isFetchingPrevious && !classrooms.isLoading && (
						<>
							<ModalBody>
								{!id && <p>You have the ability to save your work if you are logged in.</p>}

								{id && saveState.previous_project && (
									<>
										{" "}
										You have already started a previous workbook: {saveState.previous_project}. Did you want to
										continue?
									</>
								)}

								{id && !saveState.previous_project && (
									<>
										<Text>Hey {username}! We noticed that this is your first time saving this workbook.</Text>

										{classrooms.data && classrooms.data.length > 0 && (
											<>
												<Text my={2} fontWeight={600}>
													Select your classroom:
												</Text>
												<FormControl as="fieldset">
													<Select
														placeholder="Select option"
														id={"classroomSelect"}
														defaultValue={classrooms.data[0].team}
														onChange={setSelectedClassroom}>
														{classrooms.data.map((classroom) => (
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
									{saveState.previous_project ? "No, start a new one" : "Skip"}
								</Button>
								<Button
									colorScheme="blue"
									onClick={handleAccept}
									isDisabled={saveState.previous_project && import.meta.env.DEV}>
									{saveState.previous_project ? "Yes, continue" : "Continue"}
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
