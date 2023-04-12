import {
	Box,
	Button,
	Menu,
	MenuButton,
	MenuGroup,
	MenuItem,
	MenuList,
	Stack,
	Text,
	Tooltip,
	useColorMode,
	useColorModeValue,
} from "@chakra-ui/react";

import useLocalStorage from "@/hooks/useLocalStorage";
import { FaBug } from "react-icons/fa";

import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";

import AccountIndicator from "@/features/AccountIndicator";
import useSave from "@/hooks/useSave";
import useWorkbook from "@/hooks/useWorkbook";

const DebugMenu = () => {
	const { toggleAutoSave, workbookData, userData, saveData } = useWorkbook();
	const autoSaveStatus = workbookData.autosave ? "Disable" : "Enable";

	const printWorkbookData = () => console.log(workbookData);
	const printUserData = () => console.log(userData);
	const printSaveData = () => console.log(saveData);
	return (
		<Menu>
			<Tooltip label="Debug Menu" placement="top-start">
				<MenuButton as={Button} size="sm" rounded={"full"}>
					<FaBug />
				</MenuButton>
			</Tooltip>
			<MenuList>
				<MenuItem onClick={printWorkbookData}>Print Workbook State</MenuItem>
				<MenuItem onClick={printUserData}>Print User State</MenuItem>
				<MenuItem onClick={printSaveData}>Print Data State</MenuItem>

				<MenuGroup title="Saving">
					<MenuItem onClick={toggleAutoSave}>{autoSaveStatus} AutoSave</MenuItem>
					<MenuItem>Save</MenuItem>
				</MenuGroup>
			</MenuList>
		</Menu>
	);
};

export default function Footer() {
	const { userData, saveData, saveState } = useWorkbook();
	const { saveWorkbook } = useSave();

	const [backup] = useLocalStorage("backup");
	const { colorMode, toggleColorMode } = useColorMode();

	const { id: user_id } = userData;

	useEffect(() => {
		if (saveState.auto_save && userData.id) {
			saveWorkbook();
		}
	}, [saveData, saveState.isFirstTime]);

	const textColor =
		!saveState.status && !saveState.isLoading
			? "red.500"
			: saveState.isLoading
			? "cyan.500"
			: saveState.isSuccess
			? "green.500"
			: saveState.isError
			? "red.500"
			: "gray.500";

	return (
		<Box bg={useColorModeValue("white", "gray.900")} color={useColorModeValue("gray.700", "gray.200")}>
			<Stack
				py={4}
				px={4}
				direction={{ base: "column", md: "row" }}
				spacing={4}
				mt={"auto"}
				justify={{ base: "center", md: "space-between" }}
				align={{ base: "center", md: "center" }}>
				<Stack direction="row" align={"center"}>
					{saveState.isLoading && <ScaleLoader color={"rgb(144,205,244)"} height={"18px"} />}

					<Text color={textColor}>
						{" "}
						{!saveState.status && !saveState.isLoading && !saveState.isError
							? "You have unsaved changes"
							: saveState.isLoading
							? "Saving..."
							: saveState.isSuccess
							? "Saved"
							: saveState.isError
							? "Unable to save: Temporary backup created..."
							: saveState.last_saved
							? `Last saved ${saveState.last_saved}`
							: ""}
						{backup && !saveState.isSuccess && !saveState.isLoading && " Will attempt to save backup soon..."}
					</Text>
				</Stack>
				<Stack direction={"row"} spacing={6}>
					<AccountIndicator />
					<DebugMenu />

					<Tooltip label={colorMode === "light" ? "Enable Dark Mode" : "Enable Light Mode"} placement="top-start">
						<Button onClick={toggleColorMode} size="sm" rounded={"full"}>
							{colorMode === "light" ? <MoonIcon /> : <SunIcon />}
						</Button>
					</Tooltip>
				</Stack>
			</Stack>
		</Box>
	);
}
