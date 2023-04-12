import { Paragraph, ResponseHeading } from "@/components/common";
import { TextareaResponse } from "@/features/Responses";

import ValidationImg from "@/assets/aikr/validate_model.png";

const ValidatingYourModel = () => {
	const question = "What do you think the spurious correlation might be in this case? ";

	return (
		<TextareaResponse
			points={1}
			placeholder={"I think the spurious correlation in this case could be..."}
			question={question}>
			<Paragraph>
				With a dataset of “fakes” and “reals” we can use AI to help tell the difference between each category. To
				validate an AI model we see how it does on examples it has never seen before. We measure this with its
				confidence level or “sureness”.
			</Paragraph>
			<Paragraph>
				Sometimes AI will pick up on unexpected similarities within a category to tell the difference and it won't work
				as well on real life examples. These are called “spurious correlations”. Suppose every fake is photographed on a
				store shelf, and all the reals are in baskets. Now when it comes across a fake in a basket, it might categorize
				it as real.
			</Paragraph>

			<ResponseHeading modifiers={"text-xl"}>Validate your model</ResponseHeading>
			<div className="flex flex-col lg:flex-row items-center my-5">
				<div className="aspect-[4/3] w-full max-w-sm">
					<img src={ValidationImg} alt={"Validation gui showing probability"} />
				</div>

				<div className="flex flex-col p-5">
					<Paragraph>
						Provide an image it has never seen before, and test to find out if it classifies it correctly. Do that a few
						times with different target images, and you can gain more evidence that your AI app is a success.
					</Paragraph>
					<Paragraph>If validation shows poor performance, check for spurious correlations</Paragraph>
				</div>
			</div>
			<Paragraph>
				{question} A study of jail sentence algorithms showed longer sentences for African American citizens convicted
				of the same crime as white citizens. The information it collected includes: neighborhood, job history,
				incarceration history of family and associates, education level.
			</Paragraph>

			<ResponseHeading> Write your answer here:</ResponseHeading>
		</TextareaResponse>
	);
};
export default ValidatingYourModel;
