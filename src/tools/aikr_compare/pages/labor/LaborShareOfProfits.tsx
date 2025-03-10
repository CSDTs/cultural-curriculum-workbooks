import Graph from "@/assets/aikr/graph.png";
import { Paragraph, ResponseHeading } from "@/components/atoms";
import { TextareaResponse } from "@/components/organisms/responses";

const LaborShareOfProfits = () => {
	const question = `What would you say this graph is trying to show?`;

	return (
		<TextareaResponse points={1} placeholder={"This graph shows that.."} question={question}>
			<div className="max-w-full md:max-w-[75%] lg:max-w-[50%] aspect-[1.618]">
				<img src={Graph} className="mb-4 w-full" alt={"Graph showing the labor share of profits"} />
			</div>

			<Paragraph modifiers={"my-5"}>
				Studies by economists like Sylvain Leduc show that even when there are replacement jobs -- more people in
				“personal touch” industries like hosting or customer service--automation causes the percentage of profits going
				to labor to decline. This means more wealth inequality. As of October 2021, the richest 10% of the US own almost
				90% of the wealth.
			</Paragraph>

			<Paragraph modifiers={"my-5"}>
				Economists Epp and Borghett compared wealth inequality effects in different countries. They found that high
				inequality correlates with fewer programs for health care, unemployment, pensions, workforce development, labour
				unions, and public housing. They suggest this is not by accident: “economic elites constrain the scope of
				decision-making by crowding out certain policies from the agendas of policymakers.” In other words, the rich get
				richer, not because that's how technology has to work, but only because we allow it to do that.
			</Paragraph>

			<Paragraph modifiers={"my-5"}>{question}</Paragraph>

			<ResponseHeading> Write your answer here:</ResponseHeading>
		</TextareaResponse>
	);
};
export default LaborShareOfProfits;
