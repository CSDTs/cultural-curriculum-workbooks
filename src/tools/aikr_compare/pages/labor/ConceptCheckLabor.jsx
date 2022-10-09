import { Alert, Heading, Text } from "@chakra-ui/react";
import { TextareaResponse } from "/src/common/features/Response";

import useResponse from "/src/common/hooks/useResponse";

export default function ConceptCheckLabor() {
	const { specificResponse } = useResponse();
	const priorResponse = specificResponse(0);
	const question =
		"what else can you say about the jobs that might be impacted, or what challenges we should look for?";
	return (
		<>
			<Text>Knowing what you know now, how does this change the answer you gave before?</Text>
			<Heading fontSize={"lg"} mt={5}>
				Before, you wrote:
			</Heading>
			<Alert mb={5} fontSize={"lg"} fontWeight={"600"} colorScheme={priorResponse ? "green" : "red"}>
				{priorResponse ? priorResponse.response : "No answer found..."}
			</Alert>

			<TextareaResponse points={1} placeholder={"We should look for..."} question={question}>
				<Text my={5}>Now that you had time to think about it more, &nbsp;{question}</Text>
				<Heading fontSize={"lg"}> Write your answer here:</Heading>
			</TextareaResponse>
		</>
	);
}
