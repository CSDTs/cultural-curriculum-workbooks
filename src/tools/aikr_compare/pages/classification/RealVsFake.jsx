import { Heading } from "@chakra-ui/react";
import { P } from "/src/common/core";
import { TextareaResponse } from "/src/common/features/responses";

export default function RealVsFake() {
	const question = "But how do you think real vs fake could be applied to help low-income communities?";
	return (
		<TextareaResponse
			points={1}
			placeholder={"Real vs fake could be applied to help low-income communities by..."}
			question={question}>
			<P>
				Because we are looking at real vs fake, you want an example where that difference actually matters. We will
				train the AI to decide if a given image is in the "real" category or "fake" category.
			</P>
			<P my={5}>
				AI already helps billionaires tell real art from fake art, or real diamonds from fake diamonds. {question}
			</P>
			<Heading fontSize={"lg"}> Write your answer here:</Heading>
		</TextareaResponse>
	);
}
