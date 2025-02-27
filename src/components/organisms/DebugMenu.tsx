import useAuth from "@/hooks/useAuth";
import useWorkbook from "@/hooks/useWorkbook";
import { Button, Menu, MenuButton, MenuGroup, MenuItem, MenuList, Tooltip } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaBug } from "react-icons/fa";

const DebugMenu = () => {
	const [auto, setAuto] = useState<boolean>(false);
	const { workbookData, saveData, setAutoSave } = useWorkbook();
	const { currentLoggedInUser } = useAuth();
	const autoSaveStatus = workbookData.autosave ? "Disable" : "Enable";

	const printWorkbookData = () => console.log(workbookData);
	const printUserData = () => console.log(currentLoggedInUser);
	const printSaveData = () => console.log(saveData);

	const toggleAutoSave = () => setAuto(!auto);

	useEffect(() => {
		setAutoSave(auto);
	}, [auto]);

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

export default DebugMenu;
