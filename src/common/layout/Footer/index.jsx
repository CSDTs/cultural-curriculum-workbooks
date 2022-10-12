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

import { useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";
import useSave from "/src/common/hooks/useSave";
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
	const reduxLastSaved = useSelector((state) => state.workbookState.last_saved);
	const reduxUser = useSelector((state) => state.workbookState.user.id);
	const reduxSaveID = useSelector((state) => state.workbookState.user.save_id);
	const reduxSaveStatus = useSelector((state) => state.workbookState.save_status);
	const reduxIsSaving = useSelector((state) => state.workbookState.is_saving);
	const saveData = useSelector((state) => state.workbookState.data);
	// const [response, error, isSaving, isPending, { saveProgress }] = useSave();
	const { isLoading, isSuccess, isError, saveWorkbook } = useSave(autoSave);

	const [firstTime, setFirstTime] = useState(true);

	const [backup] = useLocalStorage("backup");

	useEffect(() => {
		if (autoSave && reduxUser) {
			saveWorkbook();
		}
	}, [saveData, firstTime]);

	// useEffect(() => {
	// 	if (autoSave) {
	// 		setFirstTime(false);
	// 	}
	// }, [autoSave]);

	const badgeColor =
		!reduxSaveStatus && !isLoading ? "red" : isLoading ? "blue" : isSuccess ? "green" : isError ? "red" : "gray";
	const textColor =
		!reduxSaveStatus && !isLoading
			? "red.500"
			: isLoading
			? "cyan.500"
			: isSuccess
			? "green.500"
			: isError
			? "red.500"
			: "gray.500";

	return (
		<Box bg={useColorModeValue("white", "gray.900")} color={useColorModeValue("gray.700", "gray.200")}>
			<Stack
				// maxW={"6xl"}
				py={4}
				px={4}
				direction={{ base: "column", md: "row" }}
				spacing={4}
				mt={"auto"}
				justify={{ base: "center", md: "space-between" }}
				align={{ base: "center", md: "center" }}>
				<Stack direction="row" align={"center"}>
					{isLoading && <ScaleLoader color={"rgb(144,205,244)"} height={"18px"} />}

					{/* <Badge colorScheme={badgeColor}>
						{" "}
						{!reduxSaveStatus && !isLoading
							? "You have unsaved changes"
							: isLoading
							? "Saving..."
							: isSuccess
							? "Saved"
							: isError
							? "Something happened"
							: "Last saved x min ago"}
					</Badge> */}
					{/* <Badge>Autosave {autoSave ? "Enabled" : "Disabled"}</Badge> */}
					<Text color={textColor}>
						{" "}
						{!reduxSaveStatus && !isLoading && !isError
							? "You have unsaved changes"
							: isLoading
							? "Saving..."
							: isSuccess
							? "Saved"
							: isError
							? "Unable to save: Temporary backup created..."
							: reduxLastSaved
							? `Last saved ${reduxLastSaved}`
							: ""}
						{backup && !isSuccess && !isLoading && " Will attempt to save backup soon..."}
					</Text>
				</Stack>
				<Stack direction={"row"} spacing={6}>
					<DebugMenu />
				</Stack>
			</Stack>
		</Box>
	);
}
