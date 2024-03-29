import React from "react";
import { useSelector } from "react-redux";
import { ProgressBar } from "react-bootstrap";
import { FaTrophy } from "react-icons/fa";
import styles from "./PointsProgress.module.scss";

export default function PointsProgress(props) {
	const earnedPoints = useSelector((state) => state.workbookState.data.points_earned);
	return (
		<>
			<div className={`mb-1 ${styles.completed}`}>
				<p>
					<strong>
						{earnedPoints} /{props.points}{" "}
					</strong>{" "}
					POINTS EARNED
				</p>
				<i>
					<FaTrophy />
				</i>
			</div>
			<ProgressBar now={(earnedPoints / props.points) * 100} />
		</>
	);
}
