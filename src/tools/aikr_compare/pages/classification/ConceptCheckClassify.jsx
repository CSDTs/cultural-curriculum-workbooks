import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	AspectRatio,
	Box,
	Heading,
	Image,
	SimpleGrid,
} from "@chakra-ui/react";

import AlliA from "/src/assets/aikr/alli_a.png";
import AlliB from "/src/assets/aikr/alli_b.png";

import { TextareaResponse } from "/src/common/features/responses";

import GameA from "/src/assets/aikr/game_a.png";
import GameB from "/src/assets/aikr/game_b.png";

import KenteA from "/src/assets/aikr/kente_a.jpg";
import KenteB from "/src/assets/aikr/kente_b.jpg";

import { P } from "/src/common/core";

export const realWorldExamples = [
	{
		title: "Counterfeit malaria medicine",
		body: "Malaria is a life threatening disease transmitted by mosquitoes carrying parasites. Beyond threatening millions, particularly in Nigeria, recovery is hampered by fake anti-malarial medicine. In 2011, a World Health Organization (WHO) survey revealed that 64% of the malaria medicine imported in Nigeria were fake.  In the images below both drug bottles appear nearly identical under normal lighting conditions. But under UV light there are stark differences between the two categories of real or fake medicine. Which bottle do you think is real and which one is fake?",
		compare: [AlliA, AlliB],
	},
	{
		title: "Stealing in video games as form of “griefing”",
		body: "Have you played a multiplayer game where a teammate played the games in unintended ways to upset you and others?Upsetting other players without any in-game rewards is called griefing and makes games less fun for others.Games such as Minecraft, where griefers can destroy other player creations with fire or steal from others, can have entire game modifications dedicated to the detection and prevention of griefing.",
		compare: [GameA, GameB],
	},
	{
		title: "Factory-made fakes of hand-made traditions in clothing, jewelry, etc.",
		body: "In 1992 the Smithsonian was caught selling factory-made fakes of the famous African American Gee’s Bend quilts. Weavers from all over the nation protested, and they were forced to eliminate them from their store. Less well know are cases like the lawsuit from the Navajo Nation against Urban Outfitters. In the west African nation of Ghana it is common to see tourists who think they are buying the local weaving, kente cloth, only to find it is a factory fake. University of Michigan student Kwame Robinson has developed AI that can tell the difference. Which of the below is the real kente, and which is the factory fake?",
		compare: [KenteA, KenteB],
	},
];

export default function ConceptCheckClassify() {
	const question = "Can you think of your own example where AI might be used to tell real from fake?";

	return (
		<>
			<TextareaResponse points={1} placeholder={"I would choose to work on ...."} question={question}>
				<P>Now that we helped Joe, let's apply what we discovered through examples:</P>

				<Accordion allowToggle my={5}>
					{realWorldExamples.map((example, idx) => (
						<AccordionItem key={example.title}>
							<h2>
								<AccordionButton>
									<Box flex="1" textAlign="left" fontWeight={"600"}>
										{example.title}
									</Box>
									<AccordionIcon />
								</AccordionButton>
							</h2>
							<AccordionPanel pb={4}>
								{example.body}

								<SimpleGrid columns={example.compare.length} spacing={10} mt={5}>
									{example.compare.map((img, imgIdx) => (
										<AspectRatio ratio={1.618} key={`img_${idx}_${imgIdx}`}>
											<Image src={img} alt={example.title + "_img_" + idx} />
										</AspectRatio>
									))}
								</SimpleGrid>
							</AccordionPanel>
						</AccordionItem>
					))}
				</Accordion>

				<P>
					{question} If you have trouble coming up with one, trying doing a google search for “common scams”, or just
					think about the last time someone told you “I got ripped off”. Describe your example problem. How do you think
					AI could be designed to help this?
				</P>
				<Heading fontSize={"lg"}> Write your answer here:</Heading>
			</TextareaResponse>
		</>
	);
}
