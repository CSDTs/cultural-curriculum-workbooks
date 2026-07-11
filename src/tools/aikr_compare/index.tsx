import { lazy } from "react";

const IntroductionLabor = lazy(() => import("./pages/labor/IntroductionLabor"));
const ExamplesOfReplacement = lazy(() => import("./pages/labor/ExamplesOfReplacement"));
const LaborShareOfProfits = lazy(() => import("./pages/labor/LaborShareOfProfits"));
const ConceptCheckLabor = lazy(() => import("./pages/labor/ConceptCheckLabor"));
const ExperimentingWithSolutions = lazy(() => import("./pages/labor/ExperimentingWithSolutions"));

const RealVsFake = lazy(() => import("./pages/classification/RealVsFake"));
const DecidingOnAProblem = lazy(() => import("./pages/classification/DecidingOnAProblem"));
const ValidatingYourModel = lazy(() => import("./pages/classification/ValidatingYourModel"));
const JoesLunch = lazy(() => import("./pages/classification/JoesLunch"));
const ConceptCheckClassify = lazy(() => import("./pages/classification/ConceptCheckClassify"));
const RealWorldExamples = lazy(() => import("./pages/classification/RealWorldExamples"));
const CreatingAnApp = lazy(() => import("./pages/classification/CreatingAnApp"));
const FollowUpClassify = lazy(() => import("./pages/classification/FollowUpClassify"));

const TraditionAndTech = lazy(() => import("./pages/creativity/TraditionAndTech"));
const BeforeYouStartCreative = lazy(() => import("./pages/creativity/BeforeYouStartCreative"));
const NeuralStyleTransfer = lazy(() => import("./pages/creativity/NeuralStyleTransfer"));
const FollowUpCreative = lazy(() => import("./pages/creativity/FollowUpCreative"));

const aikrSlides = [
	IntroductionLabor,
	ExamplesOfReplacement,
	LaborShareOfProfits,
	ConceptCheckLabor,
	ExperimentingWithSolutions,

	RealVsFake,
	DecidingOnAProblem,
	ValidatingYourModel,
	JoesLunch,
	ConceptCheckClassify,
	RealWorldExamples,
	CreatingAnApp,
	FollowUpClassify,

	TraditionAndTech,
	BeforeYouStartCreative,
	NeuralStyleTransfer,
	FollowUpCreative,
];

export default aikrSlides;
