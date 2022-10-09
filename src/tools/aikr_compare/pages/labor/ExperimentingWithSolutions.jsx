import { Box, chakra, Flex, Text } from "@chakra-ui/react";
import { useEffect } from "react";

import FoodImg from "/src/assets/aikr/food.png";
import PatternsImg from "/src/assets/aikr/patterns.png";

import useLesson from "/src/common/hooks/useLesson";
import useResponse from "/src/common/hooks/useResponse";
import SectionCard from "/src/tools/aikr_compare/components/SectionCard";

export default function ExperimentingWithSolutions() {
	const { selectLesson } = useLesson();
	const { updateNormal } = useResponse();

	const setToClassify = () => selectLesson(5);
	const setToCreative = () => selectLesson(13);

	useEffect(() => {
		updateNormal();
	}, []);

	return (
		<>
			<Text>
				Now onto solutions! The data from economists suggest that technology does not have to have these impacts. It
				might be possible to design a different kind of system, one where automation empowers workers and consumers.
				This will be one of the most important challenges for your generation.{" "}
				<chakra.strong color={"gray.200"}>Choose one of the two paths below:</chakra.strong>
			</Text>

			<Flex justifyContent={"space-around"} mt={5}>
				<Box maxW={"250px"}>
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
			</Flex>
		</>
	);
}
