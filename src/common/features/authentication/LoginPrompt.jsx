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
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../../setup/slices/workbookSlice";

import { useMutation, useQuery } from "@tanstack/react-query";

import { FaRegUser } from "react-icons/fa";

import useLocalStorage from "/src/common/hooks/useLocalStorage";

import postLogin from "./fetchers/postLogin";

import fetchCsrfToken from "./fetchers/fetchCsrfToken";

export default function LoginPrompt({ saveToContinue = false }) {
	const dispatch = useDispatch();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [currentUser] = useLocalStorage("currentUser");
	const [show, setShow] = useState(false);
	const username = useRef(null);
	const password = useRef(null);
	const { data: token } = useQuery(["csrftoken"], fetchCsrfToken);
	const { mutateAsync } = useMutation(postLogin, {
		onSuccess: (data) => {
			dispatch(setCurrentUser(data));
			localStorage.setItem("currentUser", JSON.stringify(data));
		},
	});

	const handleClick = () => setShow(!show);

	const loginUser = () => {
		if (import.meta.env.DEV) {
			localStorage.setItem("currentUser", JSON.stringify({ id: 12776, username: username.current.value }));
			dispatch(setCurrentUser({ id: 12776, username: username.current.value }));
			return;
		}

		mutateAsync({ payload: { login: username.current.value, password: password.current.value }, token });
	};

	useEffect(() => {
		if (!currentUser && !saveToContinue) onOpen();
	}, [currentUser]);

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

			<Modal initialFocusRef={username} isOpen={isOpen} onClose={onClose} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Login to CSDT</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<Text pb={5}>Hey! You can login to save your progress, or you can skip for now.</Text>
						<FormControl>
							<FormLabel htmlFor="username">Username</FormLabel>
							<Input ref={username} type="text" placeholder="Username" id="username" />
						</FormControl>

						<FormControl mt={4}>
							<FormLabel htmlFor="password">Password</FormLabel>
							<InputGroup size="md">
								<Input
									ref={password}
									pr="4.5rem"
									type={show ? "text" : "password"}
									placeholder="Enter password"
									id="password"
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
