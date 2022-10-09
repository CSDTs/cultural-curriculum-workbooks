import { Box, Collapse, useDisclosure } from "@chakra-ui/react";

export default function Collapsible({ description, children }) {
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
}
