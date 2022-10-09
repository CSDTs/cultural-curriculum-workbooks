import {
	AspectRatio,
	Box,
	Button,
	chakra,
	Flex,
	Heading,
	Image,
	SimpleGrid,
	Spacer,
	Stack,
	Text,
} from "@chakra-ui/react";

import { TextareaResponse } from "/src/common/features/responses";

import ValidationImg from "/src/assets/aikr/validate_model.png";

import { P } from "/src/common/core";
export default function ValidatingYourModel() {
	const question = "What do you think the spurious correlation might be in this case? ";
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
			<TextareaResponse
				points={1}
				placeholder={"I think the spurious correlation in this case could be..."}
				question={question}>
				<P>
					With a dataset of “fakes” and “reals” we can use AI to help tell the difference between each category. To
					validate an AI model we see how it does on examples it has never seen before. We measure this with its
					confidence level or “sureness”.
				</P>
				<P>
					Sometimes AI will pick up on unexpected similarities within a category to tell the difference and it won't
					work as well on real life examples. These are called “spurious correlations”. Suppose every fake is
					photographed on a store shelf, and all the reals are in baskets. Now when it comes across a fake in a basket,
					it might categorize it as real.
				</P>

				<Heading fontSize={"xl"}>Validate your model</Heading>
				<Flex direction={{ base: "column", lg: "row" }} align={"center"} my={5}>
					<AspectRatio ratio={4 / 3} w={"100%"} maxW={"350px"}>
						<Image src={ValidationImg} alt={"Validation gui showing probability"} />
					</AspectRatio>

					<Flex direction={"column"} p={5}>
						<P>
							Provide an image it has never seen before, and test to find out if it classifies it correctly. Do that a
							few times with different target images, and you can gain more evidence that your AI app is a success.
						</P>
						<P>If validation shows poor performance, check for spurious correlations</P>
					</Flex>
				</Flex>
				<P>
					{question} A study of jail sentence algorithms showed longer sentences for African American citizens convicted
					of the same crime as white citizens. The information it collected includes: neighborhood, job history,
					incarceration history of family and associates, education level.
				</P>

				<Heading fontSize={"lg"}> Write your answer here:</Heading>
			</TextareaResponse>
		</>
	);
}
