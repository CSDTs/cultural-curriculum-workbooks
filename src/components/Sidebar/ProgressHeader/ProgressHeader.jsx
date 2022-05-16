import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentLesson } from "../../counter/counterSlice.js";
import { ProgressBar } from "react-bootstrap";
import styles from "./ProgressHeader.module.scss";

import { FaTrophy } from "react-icons/fa";

export default function ProgressHeader(props) {
	let finished = document.querySelectorAll(`s`).length;

	let total = useSelector((state) => state.counter.lessons);

	return (
		<section className={styles.lessonHeader}>
			<h5 className="mb-3">{props.title}</h5>

			<div className="mb-1">
				<p>
					<strong>
						{finished} /{props.lessons}{" "}
					</strong>
					COMPLETED
				</p>
				<i>
					<FaTrophy />
				</i>
			</div>
			<ProgressBar now={(finished / total) * 100} />
		</section>
	);
}
