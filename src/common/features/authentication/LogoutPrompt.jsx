import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogCloseButton,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
	MenuItem,
	useDisclosure,
} from "@chakra-ui/react";
import { setSaveDataId, updateAutoSaveState, updateSaveStatus } from "/src/setup/slices/workbookSlice";

import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../../../setup/slices/workbookSlice";
import useLocalStorage from "../../hooks/useLocalStorage";
import AuthService from "../../services/AuthService";
import { getSlug } from "/src/common/services/WorkbookService";
export default function LogoutPrompt() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = useRef();
	const dispatch = useDispatch();
	const [autoSave, setAutoSave] = useLocalStorage("autoSave");
	const reduxAutoSave = useSelector((state) => state.workbookState.workbook.autosave);
	const slug = getSlug();
	const { logout } = AuthService();

	const logoutUser = () => {
		if (import.meta.env.DEV) {
			localStorage.removeItem("currentUser");
			// setAutoSave(false);
			dispatch(setCurrentUser({ id: null, username: null }));
			dispatch(updateAutoSaveState(false));
			onClose();
		} else {
			logout().then(() => {
				window.location.href = window.location.origin + "/workbooks/start_" + slug;
			});
		}
	};

	return (
		<>
			{/* <Button onClick={onOpen}>Logout</Button> */}

			<MenuItem onClick={onOpen}>Logout</MenuItem>

			<AlertDialog
				motionPreset="slideInBottom"
				leastDestructiveRef={cancelRef}
				onClose={onClose}
				isOpen={isOpen}
				isCentered>
				<AlertDialogOverlay />

				<AlertDialogContent>
					<AlertDialogHeader>Logout</AlertDialogHeader>
					<AlertDialogCloseButton />
					<AlertDialogBody>
						Are you sure you want to logout? You would not be able to save your progress without being signed in.
					</AlertDialogBody>
					<AlertDialogFooter>
						<Button ref={cancelRef} onClick={onClose}>
							No
						</Button>
						<Button colorScheme="red" ml={3} onClick={logoutUser}>
							Yes
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}
