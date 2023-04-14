import { Paragraph } from "@/components/atoms";
import { NoResponse } from "@/components/organisms/responses";

import { worldExamples } from "./data";

const RealWorldExamples = () => {
	return (
		<NoResponse>
			<Paragraph> Now lets look at some other applications for real vs fake that matter for ordinary people.</Paragraph>

			{worldExamples.map((opt, idx) => (
				<section key={idx}>
					<h2 className={"text-2xl font-semibold mt-5"}>{opt.title}</h2>
					<Paragraph>{opt.prompt}</Paragraph>
				</section>
			))}
		</NoResponse>
	);
};
export default RealWorldExamples;
