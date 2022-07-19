const validateSlide = (data) => {
	console.log(data);
};

const SECTION_0_AI_LABOR = [
	{
		title: "Introduction",
		tags: "slide",
		points: 1,
	},
	{
		title: "Examples of Replacement",
		tags: "slide",
		points: 0,
	},
	{
		title: "Replacement Study",
		tags: "slide",
		points: 0,
	},
	{
		title: "Concept Check",
		tags: "slide",
		points: 1,
	},
	{
		title: "Next Steps",
		tags: "slide",
		points: 0,
	},
];

const SECTION_1_AIKR = [
	{
		title: "Introduction",
		tags: "slide",
		points: 0,
	},
	{
		title: "Deciding on a Problem",
		tags: "slide",
		points: 0,
	},
	{
		title: "Finding Examples for Both Categories",
		tags: "slide",
		points: 3,
	},
	{
		title: "Validating your Model",
		tags: "slide",
		points: 3,
	},
	{
		title: "Concept Check",
		tags: "slide",
		points: 9,
	},

	{
		title: "Joe's Lunch",
		tags: "slide",
		points: 0,
	},

	{
		title: "Creating an AI App",
		tags: "slide",
		points: 4,
	},
	{
		title: "Next Steps",
		tags: "slide",
		points: 0,
	},
	{
		title: "Post Test",
		tags: "slide",
		points: 0,
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
];

export default WORKBOOK_AIKR_COMPARE;
