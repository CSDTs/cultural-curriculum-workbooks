import React from "react";
import { useSelector, useDispatch } from "react-redux";

const getCurrentResponse = () => {
	const index = useSelector((state) => state.workbookState.workbook.current_lesson_id);
	const responses = useSelector((state) => state.workbookState.data.responses);
	return responses[index];
};

export { getCurrentResponse };
