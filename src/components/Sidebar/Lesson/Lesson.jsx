import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { setCurrentLesson } from "../../counter/counterSlice.js";

import styles from "./Lesson.module.scss";

export default function Lesson(props) {
	const dispatch = useDispatch();
	const currentLesson = useSelector((state) => state.counter.value);
	const currentResponse = useSelector((state) => state.counter.responses)[props.lessonID];

	let isCurrentLesson = currentLesson == props.lessonID;

	return (
		<div className={styles.lesson} onClick={() => dispatch(setCurrentLesson(props))}>
			<p className={isCurrentLesson ? styles.active : styles.inactive}>
				{currentResponse ? <s>{props.title}</s> : <>{props.title}</>}
			</p>
		</div>
	);
}
