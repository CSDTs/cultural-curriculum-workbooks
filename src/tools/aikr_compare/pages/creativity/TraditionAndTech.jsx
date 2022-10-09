import { AspectRatio, Box, Flex, Heading, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { Ratio, Table } from "react-bootstrap";

import useResponse from "/src/common/hooks/useResponse";

import AdireCloth from "/src/assets/aikr/create-1.png";
import KenteCloth from "/src/assets/aikr/create-2.png";
import MudCloth from "/src/assets/aikr/create-3.png";
import AdinkraCloth from "/src/assets/aikr/create-4.jpeg";
import KubaCloth from "/src/assets/aikr/create-5.jpeg";

import Frederick from "/src/assets/aikr/base/frederick_douglass.jpg";
import Jemison from "/src/assets/aikr/base/Jemison.png";
import Mona from "/src/assets/aikr/base/mona_lisa.jpg";
import Rhianna from "/src/assets/aikr/base/rhianna.jpg";
import Statue from "/src/assets/aikr/base/statue_of_liberty.jpg";

export default function TraditionAndTech() {
	const { updateNormal } = useResponse();
	useEffect(() => {
		updateNormal();
	}, []);
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
	return (
		<>
			<Text {...textStyle}>
				Any artist will have a particular style, sometimes inspired by someone else. For example, during the American
				occupation of Japan after WWII, the style of Disney's big eyed cartoon animals (think “Bambi”) were adopted by
				Japanese artists to modify their own cartoon “base”. That is how the modern form of manga comics emerged. AI can
				also copy a style, and transfer it to a different base. You can train AI, for example, on van Gough's painting
				style, and apply it to a picture of your grandmother. Since this process works like the neurons in your brain,
				it is called “Neural Style Transfer” (NST).
			</Text>

			<Text {...textStyle}>
				In the case of African textile artists, new styles can be a difficult sell. Their buyers are usually focused on
				tradition. You can go to Europe for the hot new fashion, but international buyers tend to want kente weavers to
				keep making kente. Could NST offer a way to create new markets for traditional African fabricators?
			</Text>

			<Text {...textStyle}>
				In the software that follows, you will be able to experiment with AI that takes African fabric styles and merges
				them with a base using an NST. The African textile makers we work with have OK'ed this activity for educational
				purposes, and in turn we helped them set up an online store: africanfuturist.org. That's the “keep it real” part
				of this activity: making sure the value gets returned to the communities who did the original work. Ready to
				help out?
			</Text>

			<Text {...textStyle}>
				Experiment with this a bit. Was the African cloth the base or the style? What happens when you switch it up?
			</Text>

			<SimpleGrid columns={{ base: 1, md: 3, lg: 5 }} spacing={10} my={5}>
				<Box>
					<AspectRatio ratio={4 / 3} my={5}>
						<Image src={AdireCloth} alt={"Adire Cloth"} />
					</AspectRatio>

					<Heading fontSize={"lg"} textAlign={"center"}>
						Adire Cloth
					</Heading>
				</Box>

				<Box>
					<AspectRatio ratio={4 / 3} my={5}>
						<Image src={KenteCloth} alt={"Kente Cloth"} />
					</AspectRatio>
					<Heading fontSize={"lg"} textAlign={"center"} mt={3}>
						Kente Cloth
					</Heading>
				</Box>

				<Box>
					<AspectRatio ratio={4 / 3} my={5}>
						<Image src={MudCloth} alt={"Mud Cloth"} />
					</AspectRatio>
					<Heading fontSize={"lg"} textAlign={"center"} mt={3}>
						Mud Cloth
					</Heading>
				</Box>
				<Box>
					<AspectRatio ratio={4 / 3} my={5}>
						<Image src={AdinkraCloth} alt={"Adinkra Cloth"} />
					</AspectRatio>
					<Heading fontSize={"lg"} textAlign={"center"} mt={3}>
						Adinkra Cloth
					</Heading>
				</Box>
				<Box>
					<AspectRatio ratio={4 / 3} my={5}>
						<Image src={KubaCloth} alt={"Kuba Cloth"} />
					</AspectRatio>
					<Heading fontSize={"lg"} textAlign={"center"} mt={3}>
						Kuba Cloth
					</Heading>
				</Box>
			</SimpleGrid>

			<Text {...textStyle}>Here are some base image samples. You can also upload an image of your own choosing.</Text>
			<SimpleGrid columns={{ base: 1, md: 3, lg: 5 }} spacing={10} my={5}>
				<Box>
					<AspectRatio ratio={1} my={5}>
						<Image src={Statue} alt={"Adire Cloth"} />
					</AspectRatio>

					<Heading fontSize={"lg"} textAlign={"center"}>
						The Statue of Liberty
					</Heading>
				</Box>

				<Box>
					<AspectRatio ratio={1} my={5}>
						<Image src={Frederick} alt={"Kente Cloth"} />
					</AspectRatio>
					<Heading fontSize={"lg"} textAlign={"center"} mt={3}>
						Frederick Douglass
					</Heading>
				</Box>

				<Box>
					<AspectRatio ratio={1} my={5}>
						<Image src={Rhianna} alt={"Mud Cloth"} />
					</AspectRatio>
					<Heading fontSize={"lg"} textAlign={"center"} mt={3}>
						Rhianna
					</Heading>
				</Box>
				<Box>
					<AspectRatio ratio={1} my={5}>
						<Image src={Mona} alt={"Adinkra Cloth"} />
					</AspectRatio>
					<Heading fontSize={"lg"} textAlign={"center"} mt={3}>
						The Mona Lisa
					</Heading>
				</Box>
				<Box>
					<AspectRatio ratio={1} my={5}>
						<Image src={Jemison} alt={"Kuba Cloth"} />
					</AspectRatio>
					<Heading fontSize={"lg"} textAlign={"center"} mt={3}>
						Mae Jemison
					</Heading>
				</Box>
			</SimpleGrid>

			<Text {...textStyle}>
				So how does this work? What we are doing is called style transfer in which the style and coloring of one image
				is transferred to the presentation of another image to create a unique rendition of the two images together.
			</Text>
		</>
	);
}
