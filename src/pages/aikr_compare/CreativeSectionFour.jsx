import MoreInfoExamples from "#features/Response/MoreInfoExamples";
import TextResponse from "#features/Response/TextResponse";

import { slideOneExamples } from "./data";
import { STATIC_URL } from "./index";

export default function SectionFourC() {
	return (
		<>
			<p>
				<strong>
					{" "}
					Now that you have a sense of how these AI blending programs work, what do you think artisans could do to
					expand its capabilities? How could the software react different when given a base and style? Is there a “more
					human” way of being creative with these materials? Are there other kind of images or media that could be
					included?
				</strong>
			</p>
			<TextResponse title={"Write your answer here: "} placeholder={"I think..."} isRequired={true} />
		</>
	);
}
