import { useSelector } from "react-redux";

import SavePrompt from "/src/common/features/savePrompt";

import { Flex } from "@chakra-ui/react";
import LoginPrompt from "../authentication/LoginPrompt";

export default function Toolbar() {
	const user = useSelector((state) => state.workbookState.user.id);
	const saveID = useSelector((state) => state.workbookState.user.save_id);
	return (
		<Flex aria-label="Toolbar with button groups" justifyContent={"end"}>
			<SavePrompt openOnStart={!saveID && user} />
			{/* <LoginPrompt /> */}
		</Flex>
	);
}
