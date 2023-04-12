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

import { useRef } from "react";

import useAuth from "../hooks/useAuth";

export default function LogoutPrompt() {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const cancelRef = useRef(null);
	const { logout } = useAuth();

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
						<Button colorScheme="red" ml={3} onClick={logout}>
							Yes
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}
