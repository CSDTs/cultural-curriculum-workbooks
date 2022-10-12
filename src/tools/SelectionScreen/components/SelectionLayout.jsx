import { Box, Flex, Heading, SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

import { Footer, NavBar } from "/src/common/layout";

const SelectionLayout = ({ children }) => {
	const color = useColorModeValue("gray.50", "gray.700");

	return (
		<Box>
			<NavBar />
			<Flex
				as={"main"}
				bg={color}
				w="100%"
				h={{ base: "calc(100vh - 164px)", md: "calc(100vh - 124px)" }}
				direction="column"
				justifyContent={"center"}
				overflowY={"scroll"}
				p={5}>
				{children}
			</Flex>
			<Footer />
		</Box>
	);
};

export default SelectionLayout;
