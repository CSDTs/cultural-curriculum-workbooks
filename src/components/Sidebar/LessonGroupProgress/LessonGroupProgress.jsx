import React from "react";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import styles from "./LessonGroupProgress.module.scss";

export default function LessonGroupProgress(props) {
	let finished = document.querySelectorAll(`#${props.section} s`).length;
	let total = document.querySelectorAll(`#${props.section} div`).length;
	let percentage = parseInt((finished / total) * 100) || 0;

	React.useEffect(() => {
		finished = document.querySelectorAll(`#${props.section} s`).length;
		percentage = parseInt((finished / total) * 100) || 0;
	});

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
