import { useEffect } from "react";

import { Box, Collapse, Image, Text, useDisclosure } from "@chakra-ui/react";

import createNSTImg from "/src/assets/aikr/csnap/createNST.png";
import setAttributeImg from "/src/assets/aikr/csnap/setAttribute.png";
import setQualityImg from "/src/assets/aikr/csnap/setQuality.png";
import stampNSTImg from "/src/assets/aikr/csnap/stampNST.png";
import useCostumeImg from "/src/assets/aikr/csnap/usecostume.png";

import useResponse from "/src/common/hooks/useResponse";

const blockInfo = [
	{
		img: useCostumeImg,
		description: `This block allows you to set a base and a style image based on costumes attached to the project. We have a variety of different images for you to experiment with.`,
	},
	{
		img: createNSTImg,
		description: `This block calls the AI model to train and transfer qualities of the style image onto the base image, creating something new. You can enable downloads as well as customize the transfer using advanced options (controlling size, quality, and strength)`,
	},
	{
		img: stampNSTImg,
		description: `This block allows you to stamp your newly created image onto the stage.`,
	},
	{
		img: setAttributeImg,
		description:
			"This block allows you to programmatically set the size and style strength (stylization ratio) of your base and style images. ",
	},
	{
		img: setQualityImg,
		description:
			"This block allows you to programmatically set the quality of your final NST image. High quality images tend to take way longer than fast, but have better quality than fast.",
	},
];
function CollapseEx({ description, children }) {
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

export default function BeforeYouStartCreative() {
	const { updateNormal } = useResponse();
	const textStyle = {
		mb: 5,
		textAlign: {
			base: "center",
			sm: "left",
		},
		color: "gray.600",
		_dark: {
			color: "gray.400",
		},
		fontSize: {
			md: "lg",
		},
	};
	useEffect(() => {
		updateNormal();
	}, []);

	return (
		<>
			<Text {...textStyle}>
				To help you with our Neural Style Transfer tool, we have the blocks that you will be using below. Click to see
				what each block does:
			</Text>

			{blockInfo.map((item, idx) => (
				<CollapseEx description={item.description} key={idx}>
					<Image src={item.img} cursor="pointer" _hover={{}} py={1} />
				</CollapseEx>
			))}
		</>
	);
}
