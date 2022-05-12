import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { nextLesson, previousLesson } from "../counter/counterSlice.js";

export default function LessonNav() {
	const dispatch = useDispatch();
	const TOTAL_LESSONS = useSelector((state) => state.counter.lessons);
	const CURRENT_LESSON = useSelector((state) => state.counter.value);

	let endOfWorkbook = CURRENT_LESSON == TOTAL_LESSONS - 1;

	let startOfWorkbook = CURRENT_LESSON == 0;
	return (
		<div className="p-4 mt-auto d-inline-flex">
			<label className="col-4">
				Lesson <br />
				{CURRENT_LESSON + 1} / {TOTAL_LESSONS}
			</label>
			<button
				className="btn btn-secondary col-4 aver"
				type="button"
				disabled={startOfWorkbook}
				onClick={() => {
					dispatch(previousLesson());
				}}>
				Prev
			</button>

			<button
				className="btn btn-primary col-4"
				type="button"
				disabled={endOfWorkbook}
				onClick={() => {
					dispatch(nextLesson());
				}}>
				Next
			</button>
		</div>
	);
}
