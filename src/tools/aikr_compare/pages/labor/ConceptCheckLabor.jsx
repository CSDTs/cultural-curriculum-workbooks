import { Alert, Heading } from "@chakra-ui/react";
import { P } from "/src/common/core";
import { TextareaResponse } from "/src/common/features/responses";
import useResponse from "/src/common/hooks/useResponse";

export default function ConceptCheckLabor() {
	const { specificResponse } = useResponse();
	const priorResponse = specificResponse(0);
	const question =
		"what else can you say about the jobs that might be impacted, or what challenges we should look for?";
	return (
		<TextareaResponse points={1} placeholder={"We should look for..."} question={question}>
			<P>Knowing what you know now, how does this change the answer you gave before?</P>
			<Heading fontSize={"lg"} mt={5}>
				Before, you wrote:
			</Heading>
			<Alert mb={5} fontSize={"lg"} fontWeight={"600"} colorScheme={priorResponse ? "green" : "red"}>
				{priorResponse ? priorResponse.response : "No answer found..."}
			</Alert>
			<P my={5}>Now that you had time to think about it more, &nbsp;{question}</P>
			<Heading fontSize={"lg"}> Write your answer here:</Heading>
		</TextareaResponse>
	);
}
