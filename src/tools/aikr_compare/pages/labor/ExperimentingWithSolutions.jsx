import { Box, chakra, Flex, SimpleGrid, Text } from "@chakra-ui/react";

import FoodImg from "/src/assets/aikr/food.png";
import PatternsImg from "/src/assets/aikr/patterns.png";
import { P } from "/src/common/core";
import { NoResponse } from "/src/common/features/responses";
import useLesson from "/src/common/hooks/useLesson";
import { SectionCard } from "/src/common/ui/cards";

export default function ExperimentingWithSolutions() {
	const { selectLesson } = useLesson();

	const setToClassify = () => selectLesson(5);
	const setToCreative = () => selectLesson(13);

	return (
		<NoResponse>
			<P>
				Now onto solutions! The data from economists suggest that technology does not have to have these impacts. It
				might be possible to design a different kind of system, one where automation empowers workers and consumers.
				This will be one of the most important challenges for your generation.{" "}
				<chakra.strong color={"gray.200"}>Choose one of the two paths below:</chakra.strong>
			</P>

			<SimpleGrid columns={{ base: 1, md: 2 }} mt={5} spacing={10}>
				<Box>
					<SectionCard
						image={FoodImg}
						title={"Real vs. Fake"}
						question={"How Does AI Work to Classify Things?"}
						handleOnClick={setToClassify}>
						<Text
							py={2}
							color="gray.700"
							_dark={{
								color: "gray.400",
							}}>
							Create an app to help consumers choose between hand made and machine made products
						</Text>
					</SectionCard>
				</Box>

				<Box>
					<SectionCard
						image={PatternsImg}
						title={"Tradition + Tech"}
						question={"How Does AI Work as a Creative Tool?"}
						handleOnClick={setToCreative}>
						<Text
							py={2}
							color="gray.700"
							_dark={{
								color: "gray.400",
							}}>
							Help old school designers create new hybrid patterns using AI
						</Text>
					</SectionCard>
				</Box>
			</SimpleGrid>
		</NoResponse>
	);
}
