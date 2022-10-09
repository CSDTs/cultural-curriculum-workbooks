import { useSelector } from "react-redux";

const serializeResponses = () => {
	const user = useSelector((state) => state.workbookState.user);
	const data = useSelector((state) => state.workbookState.data);

	return [
		data,
		{
			owner: user.id,
			classroom: user.selected_classroom.id || null,
			workbook: 1,
			data: JSON.stringify(data),
			progression: data.completion,
		},
	];
};

export default serializeResponses;
