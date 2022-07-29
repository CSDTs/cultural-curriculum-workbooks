import { useEffect } from "react";
import { useSelector } from "react-redux";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import styles from "./LessonGroupProgress.module.scss";

export default function LessonGroupProgress(props) {
	let finished = document.querySelectorAll(`#${props.section} s`).length;
	let total = document.querySelectorAll(`#${props.section} div`).length;
	let percentage = parseInt((finished / total) * 100) || 0;
	const currentLesson = useSelector((state) => state.workbookState.workbook.current_lesson_id);

	useEffect(() => {
		finished = document.querySelectorAll(`#${props.section} s`).length;
		percentage = parseInt((finished / total) * 100) || 0;
	}, [currentLesson]);

	return (
		<div className={`${styles.sectionProgress}`}>
			<CircularProgressbar
				value={percentage}
				text={`${percentage}%`}
				styles={buildStyles({
					textSize: "2rem",
					textColor: "#0092ed",
					backgroundColor: "#3b3c48",
				})}
			/>
		</div>
	);
}
