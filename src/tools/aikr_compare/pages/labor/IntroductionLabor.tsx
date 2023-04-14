import HomerImg from "@/assets/aikr/intro.png";
import { Paragraph, ResponseHeading } from "@/components/atoms";
import { TextareaResponse } from "@/components/organisms/responses";

const IntroductionLabor = () => {
	const question = `What kinds of jobs might end up with machines replacing people, or other kinds of changes? What sorts of problems should we look for?`;
	return (
		<TextareaResponse points={1} placeholder={"We should look for..."} question={question}>
			<img src={HomerImg} alt={"Homer Simpson looking puzzled at a robot"} className="mb-4" />
			<Paragraph modifiers={"my-5"}>
				AI, robotics and other automation are some of the hottest tech in town. But with great power comes great
				responsibility. {question}
			</Paragraph>
			<ResponseHeading> Write your answer here:</ResponseHeading>
		</TextareaResponse>
	);
};

export default IntroductionLabor;
