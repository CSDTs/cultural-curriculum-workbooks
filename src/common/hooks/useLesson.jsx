import { setCurrentLessonData } from "/src/setup/slices/workbookSlice.js";

import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
const useLesson = (lesson = {}) => {
	const dispatch = useDispatch();
	const [param, setParam] = useSearchParams();

	const currentIdx = useSelector((state) => state.workbookState.workbook.current_lesson_id);
	const currentData = useSelector((state) => state.workbookState.workbook.current_lesson);
	const availableLessons = useSelector((state) => state.workbookState.workbook.available_lessons);

	const wb = param.get("wb");

	const updateCurrentLesson = () => {
		if (lesson.lessonID !== currentIdx) {
			if (import.meta.env.DEV) setParam({ wb: wb, lesson: lesson.lessonID });
			else setParam({ lesson: lesson.lessonID });

			dispatch(setCurrentLessonData(lesson));
		}
	};
	const selectLesson = (id) => {
		if (id !== currentIdx) {
			if (import.meta.env.DEV) setParam({ wb: wb, lesson: id });
			else setParam({ lesson: id });
			dispatch(setCurrentLessonData({ lessonID: id, ...availableLessons[id] }));
		}
	};
	return {
		current: { id: currentIdx, ...currentData },
		available: availableLessons,
		updateCurrentLesson,
		selectLesson,
	};
};

export default useLesson;
