import { SimpleGrid } from "@chakra-ui/react";

import { Paragraph } from "@/components/atoms";
import { SectionCard } from "@/components/molecules";

import { NoResponse } from "@/components/organisms/responses";

import useLesson from "@/hooks/useLesson";

import FoodImg from "@/assets/aikr/food.png";
import PatternsImg from "@/assets/aikr/patterns.png";

const ExperimentingWithSolutions = () => {
	const { selectLesson } = useLesson();

	const setToClassify = () => selectLesson(5);
	const setToCreative = () => selectLesson(13);

	return (
		<NoResponse>
			<Paragraph>
				Now onto solutions! The data from economists suggest that technology does not have to have these impacts. It
				might be possible to design a different kind of system, one where automation empowers workers and consumers.
				This will be one of the most important challenges for your generation.{" "}
				<strong className="text-slate-200">Choose one of the two paths below:</strong>
			</Paragraph>

			<SimpleGrid columns={{ base: 1, md: 2 }} mt={5} spacing={10}>
				<div>
					<SectionCard
						image={FoodImg}
						title={"Real vs. Fake"}
						question={"How Does AI Work to Classify Things?"}
						handleOnClick={setToClassify}>
						<Paragraph modifiers=" py-2 text-slate-700 dark:text-slate-400 !text-base">
							Create an app to help consumers choose between hand made and machine made products
						</Paragraph>
					</SectionCard>
				</div>

				<div>
					<SectionCard
						image={PatternsImg}
						title={"Tradition + Tech"}
						question={"How Does AI Work as a Creative Tool?"}
						handleOnClick={setToCreative}>
						<Paragraph modifiers=" py-2 text-slate-700 dark:text-slate-400 !text-base">
							Help old school designers create new hybrid patterns using AI
						</Paragraph>
					</SectionCard>
				</div>
			</SimpleGrid>
		</NoResponse>
	);
};
export default ExperimentingWithSolutions;
