import { useEffect } from "react";

import useResponse from "/src/common/hooks/useResponse";

import { AspectRatio, Flex, Heading, Image, SimpleGrid, Text } from "@chakra-ui/react";
import FakeImg from "/src/assets/aikr/fake_grapes.png";
import ImageSelect from "/src/assets/aikr/image_select.png";
import RealImg from "/src/assets/aikr/real_grapes.png";

import { NoResponse } from "/src/common/features/responses";

import { P } from "/src/common/core";
export default function DecidingOnAProblem() {
	return (
		<NoResponse>
			<P>
				In order to use AI to help folks to keep it real, we have to train it to know the difference between real and
				fake. In AI, this is known as a classification problem, and they would say our case has two categories or
				"binary classification".
			</P>
			<P>Let's start learning about the first step: deciding on a problem.</P>
			<P>
				A problem that can be divided into two kinds of categories is called a “binary classification” problem. Once we
				have two categories we can start collecting data.
			</P>

			<Flex justifyContent={"space-between"}>
				<Flex w={"50%"} direction={"column"} pr={5}>
					<Heading
						fontSize="xl"
						fontWeight="medium"
						lineHeight="6"
						_light={{
							color: "gray.900",
						}}>
						Decide on a problem
					</Heading>

					<P my={5}>
						First you need a case where “real” vs “fake” actually matters. Then we will train the AI to decide if a
						given image is in the "real" category or "fake" category. In AI, this is known as a classification problem,
						and they would say our case has two categories or "binary classification".
					</P>

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
					<Heading
						fontSize="xl"
						fontWeight="medium"
						lineHeight="6"
						_light={{
							color: "gray.900",
						}}>
						Find examples of images in both categories.
					</Heading>
					<P my={5}>
						The next step is finding examples of images in both categories. The more examples, the better it will be
						able to generalize and find the common features across all examples in one category. But we set aside some
						images to use in validation, so we can see if it recognizes an image it never saw before.
					</P>
					<AspectRatio ratio={16 / 8}>
						<Image src={ImageSelect} alt={"Image selection for Joe's Lunch"} />
					</AspectRatio>
				</Flex>
			</Flex>
		</NoResponse>
	);
}
