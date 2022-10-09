import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
} from "@chakra-ui/react";
import { useEffect } from "react";
import LoginPrompt from "./prompts/LoginPrompt";

export default function Prompt({ title, accept, reject, login, onStart, children }) {
	const { isOpen, onOpen, onClose } = useDisclosure();

	useEffect(() => {
		if (onStart) onOpen();
	}, []);

	return (
		<>
			{!onStart && (
				<Button onClick={onOpen} size="sm">
					{title}
				</Button>
			)}

			<Modal onClose={onClose} isOpen={isOpen} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{title}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>{children}</ModalBody>

					<ModalFooter>
						<Button variant="ghost" onClick={() => reject.callback(onClose)}>
							{reject.name}
						</Button>
						{login && <LoginPrompt />}
						<Button onClick={() => accept.callback(onClose)}>{accept.name}</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}
