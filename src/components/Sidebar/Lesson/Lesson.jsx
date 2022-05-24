import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { setCurrentLessonData } from "../../../slices/workbookSlice";

import styles from "./Lesson.module.scss";

export default function Lesson(props) {
	const dispatch = useDispatch();
	const currentLesson = useSelector((state) => state.workbookState.workbook.current_lesson_id);
	const currentResponse = useSelector((state) => state.workbookState.data.responses)[props.lessonID];

	let isCurrentLesson = currentLesson == props.lessonID;

	const lessonSet = (lesson) => {
		dispatch(setCurrentLessonData(lesson));
	};

	return (
		<div className={styles.lesson} onClick={() => lessonSet(props)}>
			<p className={isCurrentLesson ? styles.active : styles.inactive}>
				{currentResponse ? <s>{props.title}</s> : <>{props.title}</>}
			</p>
		</div>
	);
}
