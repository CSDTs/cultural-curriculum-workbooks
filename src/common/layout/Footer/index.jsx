import {
	Badge,
	Box,
	Button,
	chakra,
	Container,
	Menu,
	MenuButton,
	MenuDivider,
	MenuGroup,
	MenuItem,
	MenuList,
	Stack,
	Text,
	Tooltip,
	useColorModeValue,
	VisuallyHidden,
} from "@chakra-ui/react";

import { FaBug, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import useLocalStorage from "../../hooks/useLocalStorage";
import { updateAutoSaveState } from "/src/setup/slices/workbookSlice";
const SocialButton = ({ children, label, href }) => {
	return (
		<chakra.button
			bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
			rounded={"full"}
			w={8}
			h={8}
			cursor={"pointer"}
			as={"a"}
			href={href}
			display={"inline-flex"}
			alignItems={"center"}
			justifyContent={"center"}
			transition={"background 0.3s ease"}
			_hover={{
				bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
			}}>
			<VisuallyHidden>{label}</VisuallyHidden>
			{children}
		</chakra.button>
	);
};

const DebugMenu = () => {
	const saveData = useSelector((state) => state.workbookState.data);
	const currentUser = useSelector((state) => state.workbookState.user);
	const workbookData = useSelector((state) => state.workbookState.workbook);

	const dispatch = useDispatch();

	const [autoSave, setAutoSave] = useLocalStorage("autoSave");

	const reduxAutoSave = useSelector((state) => state.workbookState.workbook.autosave);

	const toggleAutoSave = () => {
		setAutoSave(!reduxAutoSave);
		dispatch(updateAutoSaveState(!reduxAutoSave));
	};
	return (
		<Menu>
			<Tooltip label="Debug Menu" placement="top">
				<MenuButton as={Button} size="sm" rounded={"full"}>
					<FaBug />
				</MenuButton>
			</Tooltip>
			<MenuList>
				<MenuItem onClick={() => console.log(workbookData)}>Print Workbook State</MenuItem>
				<MenuItem onClick={() => console.log(currentUser)}>Print User State</MenuItem>
				<MenuItem onClick={() => console.log(saveData)}>Print Data State</MenuItem>

				<MenuGroup title="Saving">
					<MenuItem onClick={toggleAutoSave}>{reduxAutoSave ? "Disable" : "Enable"} AutoSave</MenuItem>
					<MenuItem>Save</MenuItem>
				</MenuGroup>
			</MenuList>
		</Menu>
	);
};

export default function Footer() {
	const autoSave = useSelector((state) => state.workbookState.workbook.autosave);
	const reduxUser = useSelector((state) => state.workbookState.user.id);
	const reduxSaveID = useSelector((state) => state.workbookState.user.save_id);
	const reduxSaveStatus = useSelector((state) => state.workbookState.save_status);
	return (
		<Box bg={useColorModeValue("gray.50", "gray.900")} color={useColorModeValue("gray.700", "gray.200")}>
			<Stack
				// maxW={"6xl"}
				py={4}
				px={4}
				direction={{ base: "column", md: "row" }}
				spacing={4}
				mt={"auto"}
				justify={{ base: "center", md: "space-between" }}
				align={{ base: "center", md: "center" }}>
				<Stack direction="row">
					<Badge colorScheme={autoSave ? "green" : "red"}>Autosave {autoSave ? "Enabled" : "Disabled"}</Badge>{" "}
					<Badge colorScheme={reduxUser ? "green" : "red"}>User {reduxUser ? "Logged In" : "Not Logged In"}</Badge>
					<Badge colorScheme={reduxSaveID ? "green" : "red"}>Save {reduxSaveID ? "Found" : "Not Found"}</Badge>
					<Badge colorScheme={reduxSaveStatus ? "green" : "red"}>
						{" "}
						{reduxSaveStatus ? "Saved" : "You have unsaved changes"}
					</Badge>
				</Stack>
				{/* <Text>© 2022 Chakra Templates. All rights reserved</Text> */}
				<Stack direction={"row"} spacing={6}>
					<DebugMenu />

					{/* <SocialButton label={"YouTube"} href={"#"}>
						<FaYoutube />
					</SocialButton>
					<SocialButton label={"Instagram"} href={"#"}>
						<FaInstagram />
					</SocialButton> */}
				</Stack>
			</Stack>
		</Box>
	);
}
