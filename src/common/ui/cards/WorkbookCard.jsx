import { Badge, Button, Center, Flex, Heading, Image, Link, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import PropTypes from "prop-types";

WorkbookCard.propTypes = {
	name: PropTypes.string,
	description: PropTypes.string,
	tags: PropTypes.array,
	slug: PropTypes.string,
};
const createWorkbookLink = (slug) => {
	if (import.meta.env.PROD) return `/workbooks/start_${slug}`;
	return `?wb=${slug}`;
};
export default function WorkbookCard({ name, tags, description, slug }) {
	return (
		<Stack
			borderWidth="1px"
			borderRadius="lg"
			w={"100%"}
			maxW={{ base: "100%", md: "400px" }}
			mx={"auto"}
			height={{ sm: "auto", md: "25rem" }}
			direction={{ base: "column", md: "row" }}
			bg={useColorModeValue("white", "gray.900")}
			boxShadow={"2xl"}
			padding={4}>
			<Stack flex={1} flexDirection="column" justifyContent="center" alignItems="center" p={1} pt={2} w="100%">
				<Heading fontSize={{ base: "xl", md: "2xl" }} fontFamily={"body"} textAlign={"center"}>
					{name}
				</Heading>

				<Text
					textAlign={"center"}
					color={useColorModeValue("gray.700", "gray.400")}
					px={3}
					py={2}
					fontWeight={"400"}
					fontSize={"0.95rem"}>
					{description}
				</Text>
				<Flex align={"center"} justify={"center"} direction={"row"} mt={6} flexWrap={"wrap"}>
					{tags &&
						tags.map((tag) => (
							<Badge px={2} py={1} mx={2} bg={useColorModeValue("gray.50", "gray.800")} fontWeight={"400"} key={tag}>
								{tag}
							</Badge>
						))}
				</Flex>

				<Stack
					width={"100%"}
					mt={"auto"}
					direction={"row"}
					padding={2}
					justifyContent={"space-between"}
					alignItems={"center"}>
					<Button
						as={"a"}
						href={`${createWorkbookLink(slug)}`}
						flex={1}
						w={"100%"}
						fontSize={"sm"}
						rounded={"full"}
						bg={"blue.400"}
						color={"white"}
						boxShadow={"0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"}
						_hover={{
							bg: "blue.500",
						}}
						_focus={{
							bg: "blue.500",
						}}>
						Start Workbook
					</Button>
				</Stack>
			</Stack>
		</Stack>
	);
}
