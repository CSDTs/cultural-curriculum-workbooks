import { useSelector } from "react-redux";

import { Alert, Heading, Text } from "@chakra-ui/react";
import TextareaResponse from "/src/common/features/Response/TextareaResponse";
import useResponse from "/src/common/hooks/useResponse";

export default function FollowUpClassify() {
	const { specificResponse } = useResponse();
	const priorResponse = specificResponse(5);
	const question = "Is there anything new that you would add to this?";
	const textStyle = {
		mb: 5,
		textAlign: {
			base: "center",
			sm: "left",
		},
		color: "gray.600",
		_dark: {
			color: "gray.400",
		},
		fontSize: {
			md: "lg",
		},
	};
	return (
		<>
			<Text {...textStyle}>
				Before you were asked: AI already helps billionaires tell real art from fake art, or real diamonds from fake
				diamonds. But how do you think real vs fake could be applied to help low-income communities?
			</Text>

			<Heading fontSize={"lg"} mt={5}>
				Before, you wrote:
			</Heading>
			<Alert mb={5} fontSize={"lg"} fontWeight={"600"} colorScheme={priorResponse ? "green" : "red"}>
				{priorResponse ? priorResponse.response : "No answer found..."}
			</Alert>

			<TextareaResponse
				points={1}
				placeholder={"In addition to what I stated previously, I would add..."}
				question={question}>
				<Text my={5} {...textStyle}>
					{question}
				</Text>
				<Heading fontSize={"lg"}> Write your answer here:</Heading>
			</TextareaResponse>
		</>
	);
}
