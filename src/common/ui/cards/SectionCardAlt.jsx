import { AspectRatio, Flex, Heading, Image, Text } from "@chakra-ui/react";

const SectionCard = ({ image, title, handleOnClick, children }) => {
	return (
		// This video will have equal sides
		<Flex direction={"column"} bg={"gray.50"} shadow={"base"} onClick={handleOnClick} role={"group"}>
			<AspectRatio
				maxW="560px"
				ratio={1}
				_groupHover={{
					cursor: "pointer",
					shadow: "base",
				}}>
				<Image src={image} alt={title} />
			</AspectRatio>
			<Text p={4} textAlign={"left"} my="auto" _groupHover={{ cursor: "pointer" }}>
				<Heading color={"gray.600"} fontSize={"2xl"}>
					{title}
				</Heading>
				{children}
			</Text>
		</Flex>
	);
};

export default SectionCard;
