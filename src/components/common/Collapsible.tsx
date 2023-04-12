import { Box, Collapse, useDisclosure } from "@chakra-ui/react";
import React, { FC } from "react";

interface CollapsibleProps {
	description?: string;
	children?: React.ReactElement;
}
const Collapsible: FC<CollapsibleProps> = ({ description, children }) => {
	const { isOpen, onToggle } = useDisclosure();

	return (
		<>
			<Box onClick={onToggle}>{children}</Box>
			<Collapse in={isOpen} animateOpacity>
				<Box p="40px" color="white" mb="5" bg="gray.500" rounded="md" shadow="md">
					{description}
				</Box>
			</Collapse>
		</>
	);
};

export default Collapsible;
