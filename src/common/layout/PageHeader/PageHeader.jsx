import { Badge, Flex, Heading, Stack } from "@chakra-ui/react";

import WorkbookOptions from "/src/common/features/WorkbookOptions";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import useLocalStorage from "../../hooks/useLocalStorage";
import PageSubheader from "./PageSubheader";

const PageHeader = ({ title }) => {
	const autoSave = useSelector((state) => state.workbookState.workbook.autosave);

	return (
		<Flex align={"center"} w="100%" justifyContent={"space-between"}>
			<Flex direction={"column"}>
				<Heading fontSize={"2xl"} fontWeight={"500"}>
					{title}
				</Heading>
				<Stack direction="row" my={2}>
					<Badge colorScheme={autoSave ? "green" : "red"}>Autosave {autoSave ? "Enabled" : "Disabled"}</Badge>
				</Stack>
				{/* <PageSubheader /> */}
			</Flex>

			<WorkbookOptions />
		</Flex>
	);
};

export default PageHeader;
