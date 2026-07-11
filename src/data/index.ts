import WORKBOOK_AIKR_COMPARE from "./aikr_compare";

//Name of workbook should match slug with workbooks in django admin
const AVAILABLE_WORKBOOKS = {
	aikr_compare: {
		title: "AIKR: AI Keepin' it Real",
		data: WORKBOOK_AIKR_COMPARE,
		slug: "aikr_compare",
	},
};

export default AVAILABLE_WORKBOOKS;
