import {
	Button,
	chakra,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	InputRightElement,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	useColorModeValue,
	useDisclosure,
} from "@chakra-ui/react";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser, setUserClassrooms } from "../../../setup/slices/workbookSlice";
import useUser from "/src/common/hooks/useUser";

import { FaRegUser } from "react-icons/fa";
import AuthService from "../../services/AuthService";

export default function LoginPrompt({ saveToContinue = false }) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [show, setShow] = useState(false);
	const handleClick = () => setShow(!show);
	const initialRef = useRef(null);
	const finalRef = useRef(null);

	const [username, setUsername] = useState(null);
	const [password, setPassword] = useState(null);

	const handleUsernameChange = (e) => setUsername(e.target.value);
	const handlePasswordChange = (e) => setPassword(e.target.value);
	const { login, fetchClassrooms, fetchWorkbooks } = AuthService();

	const dispatch = useDispatch();

	const loginUser = () => {
		if (import.meta.env.DEV) {
			localStorage.setItem("currentUser", JSON.stringify({ id: 12776, username: "localtest" }));
			dispatch(setCurrentUser({ id: 12776, username: "localtest" }));
		} else {
			login(username, password).then((res) => {
				dispatch(setCurrentUser(res.data));
				fetchClassrooms(res.data.id)
					.then((res) => {
						dispatch(setUserClassrooms(res.data));

						console.log(res);
					})
					.catch((err) => {
						console.warn("Unable to find / fetch classrooms for " + username, err);
						onClose();
					});
			});
		}
	};

	const reduxUser = useSelector((state) => state.workbookState.user.id);

	useEffect(() => {
		if (!reduxUser && !saveToContinue) onOpen();
	}, [reduxUser]);

	return (
		<>
			{!saveToContinue && (
				<Button
					onClick={onOpen}
					display={{ base: "none", md: "inline-flex" }}
					fontSize={"sm"}
					fontWeight={600}
					variant="ghost"
					justifyContent={"space-between"}
					_hover={{
						bg: useColorModeValue("gray.300", "gray.600"),
					}}>
					<FaRegUser /> <chakra.span px={1}>Login</chakra.span>
				</Button>
			)}

			{saveToContinue && (
				<Button onClick={onOpen} size={"sm"}>
					Login to Save
				</Button>
			)}

			<Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Login to CSDT</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<Text pb={5}>Hey! You can login to save your progress, or you can skip for now.</Text>
						<FormControl>
							<FormLabel htmlFor="username">Username</FormLabel>
							<Input
								ref={initialRef}
								type="text"
								placeholder="Username"
								onChange={handleUsernameChange}
								id="username"
							/>
						</FormControl>

						<FormControl mt={4}>
							<FormLabel htmlFor="password">Password</FormLabel>
							<InputGroup size="md">
								<Input
									pr="4.5rem"
									type={show ? "text" : "password"}
									placeholder="Enter password"
									id="password"
									onChange={handlePasswordChange}
								/>
								<InputRightElement width="4.5rem">
									<Button h="1.75rem" size="sm" onClick={handleClick}>
										{show ? "Hide" : "Show"}
									</Button>
								</InputRightElement>
							</InputGroup>
						</FormControl>
					</ModalBody>

					<ModalFooter>
						{" "}
						<Button onClick={onClose} mr={3} variant="ghost">
							Skip
						</Button>
						<Button colorScheme="blue" onClick={loginUser}>
							Login
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}
