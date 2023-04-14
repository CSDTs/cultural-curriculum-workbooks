import { Paragraph, ResponseHeading } from "@/components/atoms";
import { TextareaResponse } from "@/components/organisms/responses";
const RealVsFake = () => {
	const question = "But how do you think real vs fake could be applied to help low-income communities?";
	return (
		<TextareaResponse
			points={1}
			placeholder={"Real vs fake could be applied to help low-income communities by..."}
			question={question}>
			<Paragraph>
				Because we are looking at real vs fake, you want an example where that difference actually matters. We will
				train the AI to decide if a given image is in the "real" category or "fake" category.
			</Paragraph>
			<Paragraph modifiers={"my-5"}>
				AI already helps billionaires tell real art from fake art, or real diamonds from fake diamonds. {question}
			</Paragraph>
			<ResponseHeading> Write your answer here:</ResponseHeading>
		</TextareaResponse>
	);
};
export default RealVsFake;
