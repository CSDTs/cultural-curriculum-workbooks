// @src/components/Modal.jsx

import React from "react";
import styles from "./Slides.module.scss";
import { RiCloseLine } from "react-icons/ri";
import { useSelector } from "react-redux";

const TextWriteUp = ({ setIsOpen }) => {
	const saveData = useSelector((state) => state.workbookState.data);
	const workbookData = useSelector((state) => state.workbookState.workbook);
	const checkForPoints = workbookData.available_lessons.reduce((acc, obj) => {
		return acc + (obj.points || 0);
	}, 0);
	return (
		<>
			<div className={styles.darkBG} onClick={() => setIsOpen(false)} />
			<div className={styles.centered}>
				<div className={styles.modal}>
					<div className={styles.modalHeader}>
						<h5 className={styles.heading}>Congratulations!</h5>
					</div>
					<button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
						<RiCloseLine style={{ marginBottom: "-3px" }} />
					</button>
					<div className={styles.modalContent}>
						<p> You finished the workbook. Here is how you did:</p>
						<p>
							Points:{" "}
							<strong>
								{saveData.points_earned} / {checkForPoints}
							</strong>
						</p>
						<p></p>
						{saveData.points_earned != checkForPoints
							? "You can go back redo any part of the workbook at any time!"
							: "Make sure you save your work before exiting!"}
					</div>
					<div className={styles.modalActions}>
						<div className={styles.actionsContainer}>
							<button className={styles.deleteBtn} onClick={() => setIsOpen(false)}>
								Save and Continue
							</button>
							<button className={styles.cancelBtn} onClick={() => setIsOpen(false)}>
								Go Back
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default TextWriteUp;
