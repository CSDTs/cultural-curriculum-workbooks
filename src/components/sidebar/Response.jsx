import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateResponse } from "../counter/counterSlice.js";

import styles from "./Sidebar.module.css";
export default function Response() {
	const responses = useSelector((state) => state.counter.responses);

	const currentLesson = useSelector((state) => state.counter.value);
	let current = responses[currentLesson];
	const dispatch = useDispatch();

	return (
		<form className={`${styles.response_div}`}>
			<h5>Response</h5>
			<label id="standard-prompt" className="wb-response-label">
				Write a description of what you did to get credit for this step:
			</label>

			<label id="interactive-homepage-prompt" className="wb-response-label">
				You can add your notes or online presentation URL here:
			</label>
			<div className="form-group">
				<textarea
					className="form-control"
					id="user-response"
					rows="3"
					placeholder="With this step, I did..."
					value={current || ""}
					onChange={(e) => dispatch(updateResponse(e.target.value))}
				/>
			</div>
		</form>
	);
}
