import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	updateResponse,
	updateOptionalResponse,
	updateEarnedPoints,
	updateSaveStatus,
} from "/src/slices/workbookSlice.js";

import { STATIC_URL, CreateConceptCheck } from "./index";

import styles from "./Slides.module.scss";

const conceptHints = {
	bias: "First one explainer text",
	small: "Second one explainer text",
	examples: "Third one explainer text",
};

export default function SlideThree() {
	const dispatch = useDispatch();

	const data = useSelector((state) => state.workbookState.data);
	const index = useSelector((state) => state.workbookState.workbook.current_lesson_id);

	let currentResponse = data.responses[index] || "";
	let currentOptional = data.optional[index] || "";

	const conceptQuestions = {
		bias: {
			label: "Classifying silverware as spoons or forks when only photos of the spoons have shadows in them.",
			isCorrect: true,
			hint: "bias could be.",
		},
		small: {
			label: "We only had 1 example of each category?",
			isCorrect: true,
			hint: "small could be.",
		},
		examples: {
			label: "We had all possible examples of each category?",
			isCorrect: true,
			hint: "examples could be.",
		},
	};

	const checkConcepts = (event) => {
		event.preventDefault();
		let userResponses = Array.from(document.querySelectorAll("form input")).map((item) => {
			return item.checked;
		});
		dispatch(updateResponse(userResponses));
		dispatch(updateEarnedPoints());
		dispatch(updateSaveStatus(false));
	};

	React.useEffect(() => {
		Array.from(document.querySelectorAll("form input")).map((item, index) => {
			item.checked = currentResponse[index];
		});
	}, []);

	return (
		<React.Fragment>
			<p>
				With a fake and real dataset we can use AI to help tell the difference between each category. Sometimes AI will
				pick up on unexpected similarities within a category to tell the difference and it won’t work as well on real
				life examples. To validate an AI model we see how it does on examples it has never seen before. How it does can
				be measured by its “sureness” and whether it was right or not.
			</p>

			<section className="row mt-5">
				<div className="col-md-4">
					<h4>Validate your model</h4>

					<p>
						Provide an image it has never seen before, and test to find out if it classifies it correctly. Do that a few
						times with different target images, and you can gain more evidence that your AI app is a success.
					</p>

					<div className="row">
						<img src={`${STATIC_URL}validate_model.png`} className="img-fluid col-md-12" />
					</div>
				</div>
				<div className="col-md-4">
					<h4>Some examples</h4>

					<p>
						Take for example, Joe's Lunch. Briefly describe validation against hold out data. Have pictorial example of
						red, green results. Talk about importance of avoid spurious correlations.
					</p>
				</div>
				<div className="col-md-4">
					<h4>Concept Check</h4>
					<p>Which kinds of problems can be treated as classification problems?</p>

					<CreateConceptCheck data={conceptQuestions} currentAnswers={currentResponse} callback={checkConcepts} />
				</div>
			</section>
		</React.Fragment>
	);
}
