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

import { FC, useEffect, useRef, useState } from "react";

import { FaRegUser } from "react-icons/fa";

import Loader from "@/components/common/Loader";

import useAuth from "../hooks/useAuth";

interface LoginPromptProps {
	isLoginToSave?: boolean;
	isPreLaunched?: boolean;
	isNavLogin?: boolean;
}

const LoginPrompt: FC<LoginPromptProps> = ({ isLoginToSave = false, isPreLaunched = false, isNavLogin = false }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const [show, setShow] = useState(false);

	const username = useRef<HTMLInputElement>(null);
	const password = useRef<HTMLInputElement>(null);

	const { login, authState, isLoading, isError } = useAuth();
	const handleClick = () => setShow(!show);

	const loginUser = () => {
		if (username.current && password.current)
			login({ username: username.current.value, password: password.current.value });
	};

	const createUser = () => {
		window.location.href = "/accounts/signup/";
	};

	useEffect(() => {
		if (!isLoading && !authState.user.id && !isLoginToSave && isPreLaunched) onOpen();
		if (authState.user.id) onClose();
	}, [authState]);

	return (
		<>
			{isNavLogin && (
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

			{isLoginToSave && (
				<button
					className="rounded px-2 py-1 bg-gray-600 hover:bg-gray-700 transition-all ease-in-out font-medium"
					onClick={onOpen}>
					Login to Save
				</button>
			)}

			<Modal initialFocusRef={username} isOpen={isOpen} onClose={onClose} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Login to CSDT</ModalHeader>
					<ModalCloseButton />
					{isLoading && (
						<>
							<ModalBody>
								<Loader />
							</ModalBody>
							<ModalFooter></ModalFooter>
						</>
					)}
					{!isLoading && (
						<>
							<ModalBody pb={6}>
								<Text pb={5}>Hey! You can login to save your progress, or you can skip for now.</Text>
								{isError && (
									<Text color="red.500" pb={5}>
										Your username or password is incorrect. Please try again.
									</Text>
								)}
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

							<footer className="flex items-center px-6 py-4 justify-between ">
								<button
									className="py-2 px-3 bg-gray-700 hover:bg-gray-500 hover:bg-opacity-70 font-medium rounded-lg transition-all ease-linear"
									onClick={createUser}>
									Create an account
								</button>

								<div className="flex gap-2">
									<button
										className="py-2 px-3  hover:bg-gray-500 hover:bg-opacity-50 font-medium rounded-lg  transition-all ease-linear"
										onClick={onClose}>
										Skip
									</button>
									<button
										className="py-2 px-3 bg-blue-200 text-blue-900 hover:bg-blue-300  font-medium rounded-lg transition-all ease-linear"
										onClick={loginUser}>
										Login
									</button>
								</div>
							</footer>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
};
export default LoginPrompt;
