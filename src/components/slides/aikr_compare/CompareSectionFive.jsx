import MoreInfoExamples from "#features/Response/MoreInfoExamples";
import TextResponse from "#features/Response/TextResponse";
import { slideTwoExamples } from "./data";

export default function CompareSectionFive() {
	return (
		<>
			<p>Now that we helped Joe, let's apply what we discovered:</p>

			<MoreInfoExamples title={"Here are some real-world examples"} data={slideTwoExamples} type={"images"} />
			<h4 style={{ lineHeight: "1.25" }}>
				Can you think of your own example where AI might be used to tell real from fake? If you have trouble coming up
				with one, trying doing a google search for “common scams”, or just think about the last time someone told you “I
				got ripped off”. Describe your example problem. How do you think AI could be designed to help this?
			</h4>
			<TextResponse
				title={"Write your answer here: "}
				placeholder={"I would choose to work on ...."}
				isRequired={true}
			/>
		</>
	);
}
