import { Badge, Flex, Heading, Stack } from "@chakra-ui/react";

import { Toolbar } from "/src/common/features/toolbar";

import { useSelector } from "react-redux";
const PageHeader = ({ title }) => {
	// const autoSave = useSelector((state) => state.workbookState.workbook.autosave);

	return (
		<Flex align={"center"} w="100%" justifyContent={"space-between"}>
			<Flex direction={"column"}>
				<Heading fontSize={"2xl"} fontWeight={"500"}>
					{title}
				</Heading>
				{/* <Stack direction="row" my={2}>
					<Badge colorScheme={autoSave ? "green" : "red"}>Autosave {autoSave ? "Enabled" : "Disabled"}</Badge>
				</Stack> */}
			</Flex>

			<Toolbar />
		</Flex>
	);
};

export default PageHeader;
