import { goToNextLesson, goToPreviousLesson, setCurrentLessonData } from "/src/setup/slices/workbookSlice.js";

import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
const useLesson = (lesson = {}) => {
	const currentLesson = useSelector((state) => state.workbookState.workbook.current_lesson_id);

	const lessonData = useSelector((state) => state.workbookState.workbook.current_lesson);
	const availableLessons = useSelector((state) => state.workbookState.workbook.available_lessons);
	const slug = useSelector((state) => state.workbookState.workbook.slug);
	const dispatch = useDispatch();
	const [param, setParam] = useSearchParams();
	const wb = param.get("wb");

	const nextLesson = () => {
		dispatch(goToNextLesson());
	};

	const previousLesson = () => {
		dispatch(goToPreviousLesson());
	};

	return {
		current: { id: currentLesson, ...lessonData },
		available: availableLessons,
		nextLesson,
		previousLesson,
		updateCurrentLesson: () => {
			if (lesson.lessonID !== currentLesson) {
				if (import.meta.env.DEV) setParam({ wb: wb, lesson: lesson.lessonID });
				else setParam({ lesson: lesson.lessonID });

				dispatch(setCurrentLessonData(lesson));
			}
		},
		selectLesson: (id) => {
			if (id !== currentLesson) {
				if (import.meta.env.DEV) setParam({ wb: wb, lesson: id });
				else setParam({ lesson: id });
				dispatch(setCurrentLessonData({ lessonID: id, ...availableLessons[id] }));
			}
		},
	};
};

export default useLesson;
