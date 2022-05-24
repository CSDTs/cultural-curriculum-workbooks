import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { goToPreviousLesson, goToNextLesson } from "/src/slices/workbookSlice.js";
import { Button } from "react-bootstrap";

export default function LessonNav() {
	const dispatch = useDispatch();
	const numOfLessons = useSelector((state) => state.workbookState.workbook.available_lessons).length;
	const currentLesson = useSelector((state) => state.workbookState.workbook.current_lesson_id);

	let endOfWorkbook = currentLesson == numOfLessons - 1;
	let startOfWorkbook = currentLesson == 0;

	return (
		<div className="p-4 mt-auto d-inline-flex justify-content-between">
			<label className="col-4">
				Lesson <br />
				{currentLesson + 1} / {numOfLessons}
			</label>

			<span>
				<Button
					variant="primary"
					disabled={startOfWorkbook}
					onClick={() => dispatch(goToPreviousLesson())}
					className="mx-2">
					Prev
				</Button>
				<Button variant="primary" disabled={endOfWorkbook} onClick={() => dispatch(goToNextLesson())}>
					Next
				</Button>
			</span>
		</div>
	);
}
