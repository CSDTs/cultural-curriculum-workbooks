import { Heading, Text } from "@chakra-ui/react";
import { useEffect } from "react";

import useResponse from "/src/common/hooks/useResponse";
import { worldExamples } from "/src/tools/aikr_compare/data";

export default function RealWorldExamples() {
	const { updateNormal } = useResponse();
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
	useEffect(() => {
		updateNormal();
	}, []);

	return (
		<>
			<Text {...textStyle}>
				{" "}
				Now lets look at some other applications for real vs fake that matter for ordinary people.
			</Text>

			{worldExamples.map((opt, idx) => (
				<>
					<Heading fontSize={"2xl"} mt={5}>
						{opt.title}
					</Heading>
					<Text {...textStyle}>{opt.prompt}</Text>
				</>
			))}
		</>
	);
}
