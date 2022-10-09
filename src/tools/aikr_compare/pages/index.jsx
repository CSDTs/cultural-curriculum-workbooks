import { Box } from "@chakra-ui/react";
import {
	ConceptCheckClassify,
	CreatingAnApp,
	DecidingOnAProblem,
	FollowUpClassify,
	JoesLunch,
	RealVsFake,
	RealWorldExamples,
	ValidatingYourModel,
} from "./classification";

import { BeforeYouStartCreative, FollowUpCreative, NeuralStyleTransfer, TraditionAndTech } from "./creativity";
import {
	ConceptCheckLabor,
	ExamplesOfReplacement,
	ExperimentingWithSolutions,
	IntroductionLabor,
	LaborShareOfProfits,
} from "./labor";

export const STATIC_URL = "./img/aikr_compare/";

export const CreateWriteUpBasic = ({ title, callback, next, data, show, rows }) => {
	return (
		<div className="col-md-3 align-self-center">
			<p className="mb-0">
				<strong>{title}</strong>
			</p>
			{/* <p className="mt-0">Word Count: {data.response.split(" ").length - 1}</p> */}
			<textarea
				className="form-control"
				rows={rows}
				onChange={(e) => {
					callback(e.target.value, data);
				}}
				placeholder={data.statement}
				value={data.response || data.statement}
			/>

			{/* {data.verified && <p>Good Job!</p>} */}
		</div>
	);
};

const SLIDE_ARRAY = [
	<IntroductionLabor />,
	<ExamplesOfReplacement />,
	<LaborShareOfProfits />,
	<ConceptCheckLabor />,
	<ExperimentingWithSolutions />,

	<RealVsFake />,
	<DecidingOnAProblem />,
	<ValidatingYourModel />,
	<JoesLunch />,
	<ConceptCheckClassify />,
	<RealWorldExamples />,
	<CreatingAnApp />,
	<FollowUpClassify />,

	<TraditionAndTech />,
	<BeforeYouStartCreative />,
	<NeuralStyleTransfer />,
	<FollowUpCreative />,
];

export default function Slides({ slideID }) {
	return (
		<Box py={5} maxW={"6xl"}>
			{SLIDE_ARRAY[slideID]}
		</Box>
	);
}
