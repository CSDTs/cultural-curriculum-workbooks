import { User } from "@/types";

const serializeResponses = (user: any, data: any, workbookId: number) => {
	return {
		owner: user.id,
		classroom: user.selected_classroom.id || null,
		workbook: workbookId,
		data: JSON.stringify(data),
		progression: data.completion || 0,
	};
};

export default serializeResponses;
