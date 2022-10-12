import { Badge, Flex, Heading, Stack } from "@chakra-ui/react";

import { Toolbar } from "/src/common/features/toolbar";

import { useSelector } from "react-redux";
const PageHeader = ({ title }) => {
	return (
		<Flex align={"center"} w="100%" justifyContent={"space-between"}>
			<Flex direction={"column"}>
				<Heading fontSize={"2xl"} fontWeight={"500"}>
					{title}
				</Heading>
			</Flex>

			<Toolbar />
		</Flex>
	);
};

export default PageHeader;
