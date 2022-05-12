import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentLesson } from "../counter/counterSlice.js";
import { ProgressBar } from "react-bootstrap";
import styles from "./Sidebar.module.css";
export default function ProgressHeader(props) {
	let finished = document.querySelectorAll(`s`).length;

	let total = useSelector((state) => state.counter.lessons);

	return (
		<section className={styles.lessonHeader}>
			<h5 id="application-title" className="mb-3">
				{props.title}
			</h5>

			<div className="mx-auto">
				<div className="row justify-content-between px-3">
					<p className="text-lesson">
						<strong className="wb-lesson">{finished}</strong> /
						<strong className="wb-lesson-total">{props.lessons}</strong>
						&nbsp;COMPLETED
					</p>
					<i className="fas fa-trophy align-self-center"></i>
				</div>
				<ProgressBar now={(finished / total) * 100} />
			</div>
		</section>
	);
}
