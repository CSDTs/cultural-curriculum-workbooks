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
// const saveErrorProps = {
// 	render: "There was an error saving your work. Please try again later.",
// 	type: "error",
// 	isLoading: false,
// 	autoClose: 5000,
// };
const getErrorProps = {
	render: "There was an error fetching your work. Please try again later.",
	type: "error",
	isLoading: false,
	autoClose: 5000,
	pauseOnHover: true,
	closeOnClick: true,
	closeButton: true,
};

const successProps = {
	render: "Your workbook successfully saved.",
	type: "success",
	isLoading: false,
	autoClose: 5000,
	pauseOnHover: true,
	closeOnClick: true,
	closeButton: true,
};

const saveErrorProps = {
	render: "There was an error saving your work. Please try again later.",
	type: "error",
	isLoading: false,
	autoClose: 5000,
	pauseOnHover: true,
	closeOnClick: true,
	closeButton: true,
};

const loadProps = {
	dismissible: true,
	showDismissButton: false,
	dismissAfter: false,
	id: "saveProgress",
	closeOnClick: true,
};
const fetchedProps = {
	dismissible: true,
	showDismissButton: false,
	dismissAfter: 5000,
	closeOnClick: true,
};

const commonProps = {
	dismissible: true,
	showDismissButton: true,
	dismissAfter: 5000,
	closeOnClick: true,
};

export { status, loadProps, fetchedProps, commonProps, getErrorProps, successProps, saveErrorProps };
