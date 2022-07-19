export function serializeResponses(user, data) {
	return {
		owner: user.id,
		classroom: user.selected_classroom.id || null,
		workbook: 1,
		data: JSON.stringify(data),
		progression: data.completion,
	};
}
