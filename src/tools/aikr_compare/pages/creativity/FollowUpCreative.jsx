import { Heading } from "@chakra-ui/react";

import { TextareaResponse } from "/src/common/features/responses";

import { P } from "/src/common/core";
export default function FollowUpCreative() {
	const question = "what do you think artisans could do to expand its capabilities?";
	return (
		<TextareaResponse points={1} placeholder={"I think..."} question={question}>
			<P>
				Now that you have a sense of how these AI blending programs work, {question} How could the software react
				different when given a base and style? Is there a “more human” way of being creative with these materials? Are
				there other kind of images or media that could be included?
			</P>
			<Heading fontSize={"lg"}> Write your answer here:</Heading>
		</TextareaResponse>
	);
}
