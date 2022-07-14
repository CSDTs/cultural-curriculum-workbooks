const validateSlide = (data) => {
	console.log(data);
};

const SECTION_1_AI_LABOR = [
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

const WORKBOOK_AI_LABOR = [
	{
		title: "How Could AI Replace Labor?",
		lessons: SECTION_1_AI_LABOR,
	},
];

export default WORKBOOK_AI_LABOR;
