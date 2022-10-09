import { useEffect } from "react";
import { updateEarnedPoints, updateResponse, updateSaveStatus } from "/src/setup/slices/workbookSlice.js";

import { useDispatch } from "react-redux";
import { STATIC_URL } from "../index";
import useResponse from "/src/common/hooks/useResponse";

import { AspectRatio, Box, Button, chakra, Flex, Heading, Image, SimpleGrid, Text } from "@chakra-ui/react";
import FakeImg from "/src/assets/aikr/fake_grapes.png";
import ImageSelect from "/src/assets/aikr/image_select.png";
import RealImg from "/src/assets/aikr/real_grapes.png";
export default function DecidingOnAProblem() {
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
				In order to use AI to help folks to keep it real, we have to train it to know the difference between real and
				fake. In AI, this is known as a classification problem, and they would say our case has two categories or
				"binary classification".
			</Text>
			<Text {...textStyle}>Let's start learning about the first step: deciding on a problem.</Text>
			<Text {...textStyle}>
				A problem that can be divided into two kinds of categories is called a “binary classification” problem. Once we
				have two categories we can start collecting data.
			</Text>

			<Flex justifyContent={"space-between"}>
				<Flex w={"50%"} direction={"column"} pr={5}>
					<Heading fontSize={"2xl"}>Decide on a problem</Heading>

					<Text {...textStyle}>
						First you need a case where “real” vs “fake” actually matters. Then we will train the AI to decide if a
						given image is in the "real" category or "fake" category. In AI, this is known as a classification problem,
						and they would say our case has two categories or "binary classification".
					</Text>

					<SimpleGrid columns={2}>
						<AspectRatio ratio={1}>
							<Image src={RealImg} alt={"Basket of real looking grapes"} />
						</AspectRatio>
						<AspectRatio ratio={1}>
							<Image src={FakeImg} alt={"Package of grape gummies"} />
						</AspectRatio>
					</SimpleGrid>
				</Flex>
				<Flex w={"50%"} direction={"column"} pl={5}>
					<Heading fontSize={"2xl"}>Find examples of images in both categories.</Heading>
					<Text {...textStyle}>
						The next step is finding examples of images in both categories. The more examples, the better it will be
						able to generalize and find the common features across all examples in one category. But we set aside some
						images to use in validation, so we can see if it recognizes an image it never saw before.
					</Text>
					<AspectRatio ratio={16 / 8}>
						<Image src={ImageSelect} alt={"Image selection for Joe's Lunch"} />
					</AspectRatio>
				</Flex>
			</Flex>
		</>
	);
}
