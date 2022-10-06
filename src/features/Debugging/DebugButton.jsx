import { serializeResponses } from "#utils/save";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";

import { useSelector } from "react-redux";

export default function DebugButton({ getCallback, postCallback, putCallback }) {
	const saveData = useSelector((state) => state.workbookState.data);
	const currentUser = useSelector((state) => state.workbookState.user);
	const workbookData = useSelector((state) => state.workbookState.workbook);

	return (
		<Menu>
			<MenuButton as={Button} rightIcon={<ChevronDownIcon />} size="sm">
				Debug API
			</MenuButton>
			<MenuList>
				<MenuItem onClick={getCallback}>GET</MenuItem>
				<MenuItem onClick={postCallback}>POST</MenuItem>
				<MenuItem onClick={putCallback}>PUT</MenuItem>
				<MenuItem onClick={() => console.log(serializeResponses(currentUser, saveData))}>Serialize Data</MenuItem>
				<MenuItem onClick={() => console.log(workbookData)}>Print Workbook State</MenuItem>
				<MenuItem onClick={() => console.log(currentUser)}>Print User State</MenuItem>
				<MenuItem onClick={() => console.log(saveData)}>Print Data State</MenuItem>
			</MenuList>
		</Menu>
	);
}
