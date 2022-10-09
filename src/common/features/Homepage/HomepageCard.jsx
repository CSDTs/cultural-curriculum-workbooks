import { AspectRatio, Flex, Image, Text } from "@chakra-ui/react";

const HomepageCard = ({ thumbnail, link, title }) => {
	return (
		// This video will have equal sides
		<Flex direction={"column"} bg={"gray.50"} shadow={"base"}>
			<AspectRatio maxW="560px" ratio={1}>
				<Image src={thumbnail} alt={title} />
			</AspectRatio>
			<Text p={5} textAlign={"center"} color={"gray.800"} fontWeight="500" my="auto">
				{title}
			</Text>
		</Flex>
	);
};

export default HomepageCard;
