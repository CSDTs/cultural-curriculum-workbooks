import { Heading, Image, Text } from "@chakra-ui/react";
import { TextareaResponse } from "/src/common/features/Response";

import HomerImg from "/src/assets/aikr/intro.png";

export default function IntroductionLabor() {
	const question = `What kinds of jobs might end up with machines replacing people, or other kinds of changes? What sorts of problems should we look for?`;
	return (
		<>
			<Image alt={"Homer Simpson looking puzzled at a robot"} className="mb-4" src={HomerImg} loading={"lazy"} />

			<TextareaResponse points={1} placeholder={"We should look for..."} question={question}>
				<Text my={5}>
					AI, robotics and other automation are some of the hottest tech in town. But with great power comes great
					responsibility. {question}
				</Text>

				<Heading fontSize={"lg"}> Write your answer here:</Heading>
			</TextareaResponse>
		</>
	);
}
