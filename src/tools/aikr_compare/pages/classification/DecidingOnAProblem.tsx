import { SimpleGrid } from "@chakra-ui/react";

import { NoResponse } from "@/features/Responses";

import { Paragraph } from "@/components/common";

import FakeImg from "@/assets/aikr/fake_grapes.png";
import ImageSelect from "@/assets/aikr/image_select.png";
import RealImg from "@/assets/aikr/real_grapes.png";
const DecidingOnAProblem = () => {
	return (
		<NoResponse>
			<Paragraph>
				In order to use AI to help folks to keep it real, we have to train it to know the difference between real and
				fake. In AI, this is known as a classification problem, and they would say our case has two categories or
				"binary classification".
			</Paragraph>
			<Paragraph>Let's start learning about the first step: deciding on a problem.</Paragraph>
			<Paragraph>
				A problem that can be divided into two kinds of categories is called a “binary classification” problem. Once we
				have two categories we can start collecting data.
			</Paragraph>

			<div className="flex justify-between">
				<div className="flex w-6/12 flex-col pr-5">
					<h2 className="text-xl font-medium leading-6 dark:text-white text-gray-900">Decide on a problem</h2>

					<Paragraph modifiers={"my-5"}>
						First you need a case where “real” vs “fake” actually matters. Then we will train the AI to decide if a
						given image is in the "real" category or "fake" category. In AI, this is known as a classification problem,
						and they would say our case has two categories or "binary classification".
					</Paragraph>

					<SimpleGrid columns={2}>
						<div className="aspect-square">
							<img src={RealImg} alt={"Basket of real looking grapes"} />
						</div>
						<div className="aspect-square">
							<img src={FakeImg} alt={"Package of grape gummies"} />
						</div>
					</SimpleGrid>
				</div>
				<div className="flex w-6/12 flex-col pl-5">
					<h2 className="text-xl font-medium leading-6 dark:text-white text-gray-900">
						Find examples of images in both categories.
					</h2>
					<Paragraph modifiers={"my-5"}>
						The next step is finding examples of images in both categories. The more examples, the better it will be
						able to generalize and find the common features across all examples in one category. But we set aside some
						images to use in validation, so we can see if it recognizes an image it never saw before.
					</Paragraph>
					<div className="aspect-video">
						<img src={ImageSelect} alt={"Image selection for Joe's Lunch"} />
					</div>
				</div>
			</div>
		</NoResponse>
	);
};
export default DecidingOnAProblem;
