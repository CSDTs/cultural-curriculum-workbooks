import { setCurrentLessonData } from "#slices/workbookSlice.js";
import { useDispatch, useSelector } from "react-redux";
const useCurrentLesson = (id = 0, lesson = {}) => {
	const currentLesson = useSelector((state) => state.workbookState.workbook.current_lesson_id);
	const currentResponse = useSelector((state) => state.workbookState.data.responses)[id];
	const lessonData = useSelector((state) => state.workbookState.workbook.current_lesson);
	const slug = useSelector((state) => state.workbookState.workbook.slug);
	const dispatch = useDispatch();
	return {
		currentLesson,
		currentResponse,
		lessonData,
		slug,
		updateCurrentLesson: () => {
			dispatch(setCurrentLessonData(lesson));
		},
	};
};

export default useCurrentLesson;
