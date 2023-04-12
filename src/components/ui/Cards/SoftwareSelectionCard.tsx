import { AspectRatio, Flex, Image, Text } from "@chakra-ui/react";

const SoftwareSelectionCard = ({ image, title, handleOnClick }) => {
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
			<Text
				p={5}
				textAlign={"center"}
				color={"gray.800"}
				fontWeight="500"
				my="auto"
				_groupHover={{ cursor: "pointer", color: "#1f89dd", fontWeight: 700 }}>
				{title}
			</Text>
		</Flex>
	);
};

export default SoftwareSelectionCard;
