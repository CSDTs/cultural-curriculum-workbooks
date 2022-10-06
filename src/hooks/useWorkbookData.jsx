import { useDispatch, useSelector } from "react-redux";
const useWorkbookData = () => {
	const lessons = useSelector((state) => state.workbookState.workbook.available_lessons);
	const classroom = useSelector((state) => state.workbookState.user.selected_classroom);
	const pointsEarned = useSelector((state) => state.workbookState.data.points_earned);
	return {
		lessons,
		classroom,
		pointsEarned,
	};
};

export default useWorkbookData;
