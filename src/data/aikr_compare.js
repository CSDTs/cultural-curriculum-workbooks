const validateSlide = (data) => {
	console.log(data);
};

const SECTION_0_AI_LABOR = [
	{
		title: "Introduction",
		tags: "slide",
		points: 1,
		section: "",
	},
	{
		title: "Examples of Replacement",
		tags: "slide",
		points: 0,
	},
	{
		title: "Labor Share of Profits",
		tags: "slide",
		points: 1,
	},
	{
		title: "Concept Check",
		tags: "slide",
		points: 1,
	},
	{
		title: "Experimenting with Solutions",
		tags: "slide",
		points: 0,
	},
];

const SECTION_1_AIKR = [
	{
		title: "Real vs Fake",
		tags: "slide",
		points: 1,
	},
	{
		title: "Deciding on a Problem",
		tags: "slide",
		points: 0,
	},

	{
		title: "Validating your Model",
		tags: "slide",
		points: 1,
	},
	// {
	// 	title: "Concept Check",
	// 	tags: "slide",
	// 	points: 6,
	// },

	{
		title: "Joe's Lunch",
		tags: "slide",
		points: 0,
	},
	{
		title: "Concept Check",
		tags: "slide",
		points: 1,
	},
	{
		title: "Real World Examples",
		tags: "slide",
		points: 0,
	},
	{
		title: "Creating an AI App",
		tags: "slide",
		points: 4,
	},

	{
		title: "Follow Up",
		tags: "slide",
		points: 1,
	},
];

const SECTION_2_AI_CREATE = [
	{
		title: "Tradition & Tech",
		tags: "slide",
		points: 0,
	},
	{
		title: "Before You Start",
		tags: "slide",
		points: 0,
	},
	{
		title: "Neural Style Transfer Tool",
		tags: "slide",
		points: 0,
	},
	{
		title: "Follow Up",
		tags: "slide",
		points: 1,
	},
];

const WORKBOOK_AIKR_COMPARE = [
	{
		title: "How Could AI Replace Labor?",
		lessons: SECTION_0_AI_LABOR,
	},
	{
		title: "How Does AI Work to Classify Things?",
		lessons: SECTION_1_AIKR,
	},
	{
		title: "How Does AI Work as a Creative Tool?",
		lessons: SECTION_2_AI_CREATE,
	},
];

export default WORKBOOK_AIKR_COMPARE;
