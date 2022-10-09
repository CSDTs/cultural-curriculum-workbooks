import { Alert, Heading } from "@chakra-ui/react";
import { P } from "/src/common/core";
import { TextareaResponse } from "/src/common/features/responses";
import useResponse from "/src/common/hooks/useResponse";

export default function FollowUpClassify() {
	const { specificResponse } = useResponse();
	const priorResponse = specificResponse(5);
	const question = "Is there anything new that you would add to this?";

	return (
		<TextareaResponse
			points={1}
			placeholder={"In addition to what I stated previously, I would add..."}
			question={question}>
			<P>
				Before you were asked: AI already helps billionaires tell real art from fake art, or real diamonds from fake
				diamonds. But how do you think real vs fake could be applied to help low-income communities?
			</P>

			<Heading fontSize={"lg"} mt={5}>
				Before, you wrote:
			</Heading>
			<Alert mb={5} fontSize={"lg"} fontWeight={"600"} colorScheme={priorResponse ? "green" : "red"}>
				{priorResponse ? priorResponse.response : "No answer found..."}
			</Alert>
			<P>{question}</P>
			<Heading fontSize={"lg"}> Write your answer here:</Heading>
		</TextareaResponse>
	);
}
