import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { ProgressBar } from "react-bootstrap";
import { FaTrophy } from "react-icons/fa";
import { setAvailablePoints } from "#slices/workbookSlice";
import styles from "./Progress.module.scss";
export default function Progress() {
	const dispatch = useDispatch();
	const earnedPoints = useSelector((state) => state.workbookState.data.points_earned);
	const allLessons = useSelector((state) => state.workbookState.workbook.available_lessons);
	const saveObjectClassroom = useSelector((state) => state.workbookState.user.selected_classroom);
	const title = useSelector((state) => state.workbookState.workbook.title);
	const totalLessons = useSelector((state) => state.workbookState.workbook.available_lessons).length;
	let finishedLessons = document.querySelectorAll(`s`).length;

	const checkForPoints = allLessons.reduce((acc, obj) => {
		return acc + (obj.points || 0);
	}, 0);

	useEffect(() => {
		dispatch(setAvailablePoints(checkForPoints));
	}, [checkForPoints]);

	return (
		<section className={styles.lessonHeader}>
			<h5>{title}</h5>
			<h6 className="mb-3">{saveObjectClassroom.name || ""}</h6>

			<>
				<div className={`mb-1 ${styles.completed}`}>
					<p>
						<strong>
							{checkForPoints == 0 ? `${finishedLessons} / ${totalLessons}` : `${earnedPoints} / ${checkForPoints}`}
						</strong>{" "}
						{checkForPoints == 0 ? "COMPLETED" : "POINTS EARNED"}
					</p>
					<i>
						<FaTrophy />
					</i>
				</div>

				<ProgressBar
					now={checkForPoints == 0 ? finishedLessons / totalLessons : (earnedPoints / checkForPoints) * 100}
				/>
			</>
		</section>
	);
}
