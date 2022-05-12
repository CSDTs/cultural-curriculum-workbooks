import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { setCurrentLesson } from "../counter/counterSlice.js";

import styles from "./Sidebar.module.css";

export default function Lesson(props) {
	const currentLesson = useSelector((state) => state.counter.value);
	const responses = useSelector((state) => state.counter.responses);
	let currentResponse = responses[props.lessonID];

	let isCurrentLesson = currentLesson == props.lessonID;

	const dispatch = useDispatch();
	return (
		<div onClick={() => dispatch(setCurrentLesson(props))}>
			{currentResponse == undefined || currentResponse == "" ? (
				<p className={`${isCurrentLesson ? styles.active : ""} `}>{props.title}</p>
			) : (
				<s className={`${isCurrentLesson ? styles.active : ""} `}>{props.title}</s>
			)}
		</div>
	);
}
