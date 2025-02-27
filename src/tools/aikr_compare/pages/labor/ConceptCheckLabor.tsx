import { Paragraph, ResponseHeading } from "@/components/atoms";
import { TextareaResponse } from "@/components/organisms/responses";
import useResponse from "@/hooks/useResponse";

const ConceptCheckLabor = () => {
	const { specificResponse } = useResponse();
	const priorResponse = specificResponse(0);
	const question =
		"what else can you say about the jobs that might be impacted, or what challenges we should look for?";
	return (
		<TextareaResponse points={1} placeholder={"We should look for..."} question={question}>
			<Paragraph>Knowing what you know now, how does this change the answer you gave before?</Paragraph>
			<ResponseHeading modifiers="mt-5">Before, you wrote:</ResponseHeading>

			<div className={`mb-5 p-5  ${priorResponse ? "bg-green-500" : "bg-red-500"} bg-opacity-10 font-bold leading-5`}>
				{priorResponse ? priorResponse.response : "No answer found..."}
			</div>

			<Paragraph modifiers={"my-5"}>Now that you had time to think about it more, &nbsp;{question}</Paragraph>
			<ResponseHeading> Write your answer here:</ResponseHeading>
		</TextareaResponse>
	);
};

export default ConceptCheckLabor;
