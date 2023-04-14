import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { setCurrentLessonData } from "../setup/slices/workbookSlice";

import { Lesson } from "@/types";
import { RootState } from "../setup/store";

type CurrentLesson = Lesson & { id: number };
/**
 * React hook that is responsible for lessons
 * @returns The current lesson information, what lessons are currently available, and a function to set the current lesson.
 */
const useLesson = () => {
	const dispatch = useDispatch();
	const [param, setParam] = useSearchParams();

	const { current_lesson_id, current_lesson, available_lessons } = useSelector(
		(state: RootState) => state.workbookState.workbook
	);

	const wb = param.get("wb") as string;

	const selectLesson = (id: number) => {
		if (id !== current_lesson_id) {
			if (import.meta.env.DEV) setParam({ wb: wb, lesson: id.toString() });
			else setParam({ lesson: id.toString() });
			dispatch(setCurrentLessonData({ lessonID: id, ...(available_lessons[id] as Object) }));
			window.scrollTo(0, 0);
		}
	};

	return {
		current: { id: current_lesson_id, ...current_lesson } as CurrentLesson,
		total: available_lessons.length,
		selectLesson,
	};
};

export default useLesson;
