import { useSelector } from "react-redux";

import SavePrompt from "/src/common/features/savePrompt";

import { Flex } from "@chakra-ui/react";

export default function Toolbar() {
	const reduxAutoSave = useSelector((state) => state.workbookState.workbook.autosave);

	return (
		<Flex aria-label="Toolbar with button groups" justifyContent={"end"}>
			<SavePrompt onStart={reduxAutoSave} />
		</Flex>
	);
}
