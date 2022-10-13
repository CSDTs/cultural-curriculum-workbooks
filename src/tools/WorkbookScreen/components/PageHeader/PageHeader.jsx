import { Flex, Heading } from "@chakra-ui/react";

import { SavePrompt } from "/src/tools/WorkbookScreen/features";

const PageHeader = ({ title }) => {
	return (
		<Flex align={"center"} w="100%" justifyContent={"space-between"}>
			<Flex direction={"column"}>
				<Heading fontSize={"2xl"} fontWeight={"500"}>
					{title}
				</Heading>
			</Flex>

			<Flex aria-label="Toolbar with button groups" justifyContent={"end"}>
				<SavePrompt />
			</Flex>
		</Flex>
	);
};

export default PageHeader;
