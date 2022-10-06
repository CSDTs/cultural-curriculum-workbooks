import TextResponse from "#features/Response/TextResponse";
import { Heading, Image, Text } from "@chakra-ui/react";
import TextareaResponse from "../../features/Response/TextareaResponse";

export default function SlideOne() {
	const question = `What kinds of jobs might end up with machines replacing people, or other kinds of changes? What sorts of problems should we look for?`;
	return (
		<>
			<Image alt={"Homer Simpson looking puzzled at a robot"} className="mb-4" src="./img/ai_labor/intro.png" />

			{/* 
			<section className="row mt-4">
				<div className="col-md-8">
					<TextResponse title={" Write your answer here:"} placeholder={"We should look for..."} isRequired={true} />
				</div>
			</section> */}
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
