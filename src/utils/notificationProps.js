const status = {
	GET: {
		msg: "Fetching your workbook save. Please wait...",
		state: "loading",
	},
	POST: {
		msg: "Saving your workbook save for the first time. Please wait...",
		state: "loading",
	},
	PUT: {
		msg: "Saving your progress. Please wait...",
		state: "loading",
	},
	ERROR: {
		msg: "There was an error saving your progress. Please try again",
		state: "error",
	},
	SUCCESS: {
		msg: "Workbook progress saved!",
		state: "success",
	},
	ERROR_GET: {
		msg: "There was an error fetching your progress. Please try again",
		state: "error",
	},
	SUCCESS_GET: {
		msg: "Workbook progress loaded!",
		state: "success",
	},
};

const loadProps = {
	dismissible: false,
	showDismissButton: false,
	dismissAfter: false,
	id: "saveProgress",
};
const fetchedProps = {
	dismissible: false,
	showDismissButton: false,
	dismissAfter: 5000,
};

const commonProps = {
	dismissible: true,
	showDismissButton: true,
	dismissAfter: 5000,
};

export { status, loadProps, fetchedProps, commonProps };
