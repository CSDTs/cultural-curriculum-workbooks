import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import useConfig from "./useConfig";

const useWorkbook = () => {
	const slug = useSelector((state) => state.workbookState.workbook.slug);
	const title = useSelector((state) => state.workbookState.workbook.title);
	const chosenClassroom = useSelector((state) => state.workbookState.user.selected_classroom);
	const sections = useSelector((state) => state.workbookState.workbook.available_sections);

	return {
		slug,
		title,
		chosenClassroom,
		sections,
	};
};

export default useWorkbook;
