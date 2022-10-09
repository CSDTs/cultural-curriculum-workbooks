import { AspectRatio, Heading, Image, Text } from "@chakra-ui/react";
import { TextareaResponse } from "/src/common/features/Response";

import Graph from "/src/assets/aikr/graph.png";

export default function LaborShareOfProfits() {
	const question = `What would you say this graph is trying to show?`;

	return (
		<>
			<AspectRatio ratio={1.618} maxW={{ base: "100%", md: "75%", lg: "50%" }}>
				<Image src={Graph} className="mb-4" alt={"Graph showing the labor share of profits"} />
			</AspectRatio>

			<Text my={5}>
				Studies by economists like Sylvain Leduc show that even when there are replacement jobs -- more people in
				“personal touch” industries like hosting or customer service--automation causes the percentage of profits going
				to labor to decline. This means more wealth inequality. As of October 2021, the richest 10% of the US own almost
				90% of the wealth.
			</Text>

			<Text my={5}>
				Economists Epp and Borghett compared wealth inequality effects in different countries. They found that high
				inequality correlates with fewer programs for health care, unemployment, pensions, workforce development, labour
				unions, and public housing. They suggest this is not by accident: “economic elites constrain the scope of
				decision-making by crowding out certain policies from the agendas of policymakers.” In other words, the rich get
				richer, not because that's how technology has to work, but only because we allow it to do that.
			</Text>

			<TextareaResponse points={1} placeholder={"This graph shows that.."} question={question}>
				<Text my={5}>{question}</Text>

				<Heading fontSize={"lg"}> Write your answer here:</Heading>
			</TextareaResponse>
		</>
	);
}
