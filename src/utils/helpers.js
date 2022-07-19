import React from "react";
import { useSelector, useDispatch } from "react-redux";

export function getCurrentResponse() {
	const index = useSelector((state) => state.workbookState.workbook.current_lesson_id);
	const responses = useSelector((state) => state.workbookState.data.responses);
	return responses[index];
}

export function updateURL(id) {
	if (window.history !== undefined && window.history.pushState !== undefined) {
		let updatedPathname = window.location.pathname.replace(/\d+$/, `${id}`);
		window.history.pushState({}, "", updatedPathname);
	}
}
