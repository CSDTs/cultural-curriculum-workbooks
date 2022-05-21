import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { ProgressBar } from "react-bootstrap";
import styles from "./ProgressHeader.module.scss";

import { FaTrophy } from "react-icons/fa";
import { setAvailablePoints } from "/src/slices/workbookSlice";
import PointsProgress from "../PointsProgress/PointsProgress";

export default function ProgressHeader(props) {
	let finished = document.querySelectorAll(`s`).length;
	const dispatch = useDispatch();
	const allLessons = useSelector((state) => state.workbookState.workbook.available_lessons);
	const availablePoints = useSelector((state) => state.workbookState.workbook.available_points);
	let total = allLessons.length;

	const saveObjectClassroom = useSelector((state) => state.workbookState.user.selected_classroom);

	const checkForPoints = allLessons.reduce((acc, obj) => {
		return acc + (obj.points || 0);
	}, 0);

	React.useEffect(() => {
		dispatch(setAvailablePoints(checkForPoints));
	}, [checkForPoints]);

	return (
		<section className={styles.lessonHeader}>
			<h5>{props.title}</h5>
			<h6 className="mb-3">{saveObjectClassroom.name || "Personal"}</h6>
			{checkForPoints == 0 && (
				<>
					<div className={`mb-1 ${styles.completed}`}>
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
				</>
			)}

			{checkForPoints != 0 && <PointsProgress points={checkForPoints} />}
		</section>
	);
}
