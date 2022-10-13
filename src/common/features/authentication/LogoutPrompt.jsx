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
import { updateAutoSaveState } from "/src/setup/slices/workbookSlice";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../../setup/slices/workbookSlice";

import getSlug from "/src/common/utils/getSlug";

import fetchCsrfToken from "./fetchers/fetchCsrfToken";
import postLogout from "./fetchers/postLogout";

export default function LogoutPrompt() {
	const dispatch = useDispatch();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { data: token } = useQuery(["csrftoken"], fetchCsrfToken);
	const slug = getSlug();
	const cancelRef = useRef();

	const { mutateAsync } = useMutation(postLogout, {
		onSuccess: () => {
			window.location.href = window.location.origin + "/workbooks/start_" + slug;
		},
	});

	const logoutUser = () => {
		if (import.meta.env.DEV) {
			localStorage.removeItem("currentUser");
			dispatch(setCurrentUser({ id: null, username: null }));
			dispatch(updateAutoSaveState(false));
			onClose();
			return;
		}
		mutateAsync({ token });
	};

	return (
		<>
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
