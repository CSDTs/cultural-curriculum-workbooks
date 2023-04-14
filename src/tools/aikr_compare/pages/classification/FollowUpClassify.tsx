import { Paragraph, ResponseHeading } from "@/components/atoms";
import { TextareaResponse } from "@/components/organisms/responses";
import useResponse from "@/hooks/useResponse";

const FollowUpClassify = () => {
	const { specificResponse } = useResponse();
	const priorResponse = specificResponse(5);
	const question = "Is there anything new that you would add to this?";

	return (
		<TextareaResponse
			points={1}
			placeholder={"In addition to what I stated previously, I would add..."}
			question={question}>
			<Paragraph>
				Before you were asked: AI already helps billionaires tell real art from fake art, or real diamonds from fake
				diamonds. But how do you think real vs fake could be applied to help low-income communities?
			</Paragraph>

			<ResponseHeading modifiers={"mt-5"}>Before, you wrote:</ResponseHeading>
			<div className={`mb-5 p-5  ${priorResponse ? "bg-green-500" : "bg-red-500"} bg-opacity-10 font-bold leading-5`}>
				{priorResponse ? priorResponse.response : "No answer found..."}
			</div>
			<Paragraph>{question}</Paragraph>
			<ResponseHeading> Write your answer here:</ResponseHeading>
		</TextareaResponse>
	);
};
export default FollowUpClassify;
