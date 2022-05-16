import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { nextLesson, previousLesson } from "../../counter/counterSlice.js";

import { Button } from "react-bootstrap";

export default function LessonNav() {
	const dispatch = useDispatch();
	const numOfLessons = useSelector((state) => state.counter.lessons);
	const currentLesson = useSelector((state) => state.counter.value);

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
					onClick={() => {
						dispatch(previousLesson());
					}}
					className="mx-2">
					Prev
				</Button>
				<Button
					variant="primary"
					disabled={endOfWorkbook}
					onClick={() => {
						dispatch(nextLesson());
					}}>
					Next
				</Button>
			</span>
		</div>
	);
}
