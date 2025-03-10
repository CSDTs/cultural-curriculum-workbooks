import WORKBOOK_CC_MATH_INTRO from "./cc_math";
import WORKBOOK_AIKR_COMPARE from "./aikr_compare";
import WORKBOOK_AI_LABOR from "./ai_labor";

//Name of workbook should match slug with workbooks in django admin
const AVAILABLE_WORKBOOKS = {
	cc_math: {
		title: "Cornrow Curves Mathematics",
		data: WORKBOOK_CC_MATH_INTRO,
		slug: "cc_math_introduction",
	},
	aikr_compare: {
		title: "AIKR: AI Keepin' it Real",
		data: WORKBOOK_AIKR_COMPARE,
		slug: "aikr_compare",
	},
	ai_labor: {
		title: "AI Labor Displacement",
		data: WORKBOOK_AI_LABOR,
		slug: "ai_labor",
	},
};

export default AVAILABLE_WORKBOOKS;
