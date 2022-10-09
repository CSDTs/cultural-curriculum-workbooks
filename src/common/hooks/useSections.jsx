import { useDispatch, useSelector } from "react-redux";
const useSections = () => {
	const sections = useSelector((state) => state.workbookState.workbook.available_sections);

	return {
		sections,
	};
};

export default useSections;
