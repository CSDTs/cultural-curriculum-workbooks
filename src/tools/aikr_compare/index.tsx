import {
	ConceptCheckClassify,
	CreatingAnApp,
	DecidingOnAProblem,
	FollowUpClassify,
	JoesLunch,
	RealVsFake,
	RealWorldExamples,
	ValidatingYourModel,
} from "./pages/classification";

import { BeforeYouStartCreative, FollowUpCreative, NeuralStyleTransfer, TraditionAndTech } from "./pages/creativity";
import {
	ConceptCheckLabor,
	ExamplesOfReplacement,
	ExperimentingWithSolutions,
	IntroductionLabor,
	LaborShareOfProfits,
} from "./pages/labor";

const aikrSlides = [
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

export default aikrSlides;
