import { Heading, Text } from "@chakra-ui/react";
import TextareaResponse from "/src/common/features/Response/TextareaResponse";
export default function RealVsFake() {
	const question = "But how do you think real vs fake could be applied to help low-income communities?";
	return (
		<>
			<Text>
				Because we are looking at real vs fake, you want an example where that difference actually matters. We will
				train the AI to decide if a given image is in the "real" category or "fake" category.
			</Text>

			<TextareaResponse
				points={1}
				placeholder={"Real vs fake could be applied to help low-income communities by..."}
				question={question}>
				<Text my={5}>
					AI already helps billionaires tell real art from fake art, or real diamonds from fake diamonds. {question}
				</Text>
				<Heading fontSize={"lg"}> Write your answer here:</Heading>
			</TextareaResponse>
		</>
	);
}
