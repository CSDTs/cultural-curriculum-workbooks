import { Image } from "@chakra-ui/react";

import createNSTImg from "/src/assets/aikr/csnap/createNST.png";
import setAttributeImg from "/src/assets/aikr/csnap/setAttribute.png";
import setQualityImg from "/src/assets/aikr/csnap/setQuality.png";
import stampNSTImg from "/src/assets/aikr/csnap/stampNST.png";
import useCostumeImg from "/src/assets/aikr/csnap/usecostume.png";

import { NoResponse } from "/src/common/features/responses";

import { P } from "/src/common/core";

import { Collapsible } from "/src/common/core";

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

export default function BeforeYouStartCreative() {
	return (
		<NoResponse>
			<P>
				To help you with our Neural Style Transfer tool, we have the blocks that you will be using below. Click to see
				what each block does:
			</P>

			{blockInfo.map((item, idx) => (
				<Collapsible description={item.description} key={idx}>
					<Image src={item.img} cursor="pointer" _hover={{}} py={1} />
				</Collapsible>
			))}
		</NoResponse>
	);
}
