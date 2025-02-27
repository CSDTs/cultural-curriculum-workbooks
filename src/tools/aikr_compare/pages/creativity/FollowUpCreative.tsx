import { Paragraph, ResponseHeading } from "@/components/atoms";
import { TextareaResponse } from "@/components/organisms/responses";

const FollowUpCreative = () => {
	const question = "what do you think artisans could do to expand its capabilities?";
	return (
		<TextareaResponse points={1} placeholder={"I think..."} question={question}>
			<Paragraph>
				Now that you have a sense of how these AI blending programs work, {question} How could the software react
				different when given a base and style? Is there a “more human” way of being creative with these materials? Are
				there other kind of images or media that could be included?
			</Paragraph>
			<ResponseHeading> Write your answer here:</ResponseHeading>
		</TextareaResponse>
	);
};
export default FollowUpCreative;
