import { Box, chakra, Flex, Icon, Image } from "@chakra-ui/react";

function SectionCard({ title, image, question, children }) {
	return (
		<Box role={"group"} h={"100%"}>
			<Box
				w="sm"
				mx="auto"
				bg="white"
				_dark={{
					bg: "gray.800",
				}}
				shadow="lg"
				rounded="lg"
				overflow="hidden"
				cursor="pointer"
				h={"100%"}
				_groupHover={{ borderBottom: "2px solid #1f89dd", transition: "0.1s" }}>
				<Image
					w="full"
					h={72}
					fit="cover"
					objectPosition="center"
					src={image}
					alt="avatar"
					_groupHover={{ borderTop: "2px solid #1f89dd", transition: "0.1s" }}
				/>

				<Flex alignItems="center" px={6} py={3} bg="gray.900">
					<Icon h={6} w={6} color="white" />

					<chakra.h1 mx={3} color="white" fontWeight="bold" fontSize="lg">
						{question}
					</chakra.h1>
				</Flex>

				<Box py={4} px={6}>
					<chakra.h1
						fontSize="xl"
						fontWeight="bold"
						color="gray.800"
						_dark={{
							color: "white",
						}}>
						{title}
					</chakra.h1>
					{children}
				</Box>
			</Box>
		</Box>
	);
}

export default SectionCard;
