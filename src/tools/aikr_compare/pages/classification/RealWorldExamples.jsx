import { Heading, Text } from "@chakra-ui/react";
import { Fragment, useEffect } from "react";

import { worldExamples } from "./data";
import useResponse from "/src/common/hooks/useResponse";

import { P } from "/src/common/core";
import { NoResponse } from "/src/common/features/responses";

export default function RealWorldExamples() {
	return (
		<NoResponse>
			<P> Now lets look at some other applications for real vs fake that matter for ordinary people.</P>

			{worldExamples.map((opt, idx) => (
				<Fragment key={idx}>
					<Heading fontSize={"2xl"} mt={5}>
						{opt.title}
					</Heading>
					<P>{opt.prompt}</P>
				</Fragment>
			))}
		</NoResponse>
	);
}
