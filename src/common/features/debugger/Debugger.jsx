import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import useLocalStorage from "../../hooks/useLocalStorage";
import { serializeResponses } from "/src/common/utils/serializeResponses";
import { setSaveDataId, updateAutoSaveState, updateSaveStatus } from "/src/setup/slices/workbookSlice";

export default function Debugger() {
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
			<MenuButton as={Button} rightIcon={<ChevronDownIcon />} size="sm">
				Debug API
			</MenuButton>
			<MenuList>
				<MenuItem onClick={() => console.log(serializeResponses(currentUser, saveData))}>Serialize Data</MenuItem>
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
}
