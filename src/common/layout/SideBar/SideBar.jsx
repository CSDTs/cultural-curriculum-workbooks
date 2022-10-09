import { Box, Flex, useColorModeValue } from "@chakra-ui/react";

import PropTypes from "prop-types";
import NamePlate from "./NamePlate";
import WorkbookNavigation from "./WorkbookNavigation";
import WorkbookSections from "./WorkbookSections";

import { WorkbookProgress } from "/src/common/features/progress";

const SideBar = ({ ...additionalStyles }) => {
	return (
		<Box
			as="nav"
			pos="fixed"
			top="0"
			left="0"
			zIndex="sticky"
			h="full"
			pb="10"
			overflowX="hidden"
			overflowY="auto"
			bg={useColorModeValue("white", "gray.800")}
			border
			color="inherit"
			borderRightWidth="1px"
			w="96"
			{...additionalStyles}>
			<Flex direction="column" justifyContent={"space-between"} h="full">
				<Flex direction="column">
					<NamePlate />
					<WorkbookProgress />
					<WorkbookSections />
				</Flex>
				<WorkbookNavigation />
			</Flex>
		</Box>
	);
};

SideBar.propTypes = {
	additionalStyles: PropTypes.object,
};
export default SideBar;
