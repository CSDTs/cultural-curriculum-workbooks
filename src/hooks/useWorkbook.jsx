import { useDispatch, useSelector } from "react-redux";
const useWorkbook = () => {
	const slug = useSelector((state) => state.workbookState.workbook.slug);

	return {
		slug,
	};
};

export default useWorkbook;
