import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { updateResponse } from "../../../slices/workbookSlice.js";
import styles from "./Response.module.scss";

export default function Response() {
	const dispatch = useDispatch();

	const allResponses = useSelector((state) => state.workbookState.data.responses);

	const currentLessonIndex = useSelector((state) => state.workbookState.workbook.current_lesson_id);
	const currentLesson = useSelector((state) => state.workbookState.workbook.current_lesson);

	let currentResponse = allResponses[currentLessonIndex] || "";

	return (
		<form className={styles.response_div}>
			<h5>Response</h5>

			<label>
				{currentLesson.tags?.includes("homepage") ? (
					<>You can add your notes or online presentation URL here:</>
				) : (
					<>Write a description of what you did to get credit for this step:</>
				)}
			</label>

			<div className="form-group">
				<textarea
					className="form-control"
					rows="3"
					placeholder="With this step, I did..."
					value={currentResponse}
					onChange={(e) => {
						dispatch(updateResponse(e.target.value));
					}}
				/>
			</div>
		</form>
	);
}
