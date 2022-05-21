import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	updateResponse,
	updateOptionalResponse,
	updateEarnedPoints,
	updateSaveStatus,
} from "/src/slices/workbookSlice.js";

import { STATIC_URL, createMoreInfo, CreateConceptCheck } from "./index";

import styles from "./Slides.module.scss";

export default function SlideOne() {
	const dispatch = useDispatch();

	const data = useSelector((state) => state.workbookState.data);
	const index = useSelector((state) => state.workbookState.workbook.current_lesson_id);

	let currentResponse = data.responses[index] || "";
	let currentOptional = data.optional[index] || "";

	const explainerText = {
		malaria: {
			title: "Counterfeit malaria medicine",
			body: "Insert explanation here",
			slug: "malaria",
		},
		game: {
			title: "Stealing in video games as form of “griefing”",
			body: "Insert explanation here",
			slug: "game",
		},
		lunch: {
			title: "Lunches that are homemade or factory made",
			body: "Insert explanation here",
			slug: "lunch",
		},
	};

	const conceptQuestions = {
		energy: {
			label: "Excessive energy use",
			isCorrect: true,
			hint: "Energy could be.",
		},
		weight: {
			label: "The range of baby weights",
			isCorrect: true,
			hint: "Weight could be.",
		},
		noise: {
			label: "Noisy neighbors",
			isCorrect: true,
			hint: "Noise could be.",
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

	const checkOptional = (event) => {
		event.preventDefault();
		dispatch(updateOptionalResponse(event.target.value));
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
				In order to use AI to help folks to keep it real, we have to train it to know the difference between real and
				fake. In AI, this is known as a classification problem, and they would say our case has two categories or
				"binary classification".
			</p>

			<p>
				Let's start learning about the first step: deciding on a problem. Deciding on a problem starts your
				classification journey that will end in making your own AI project.
			</p>

			<section className="row mt-5">
				<div className="col-md-4">
					<h4>Decide on a problem</h4>

					<p>
						Because we are looking at real vs fake, you want an example where that difference actually matters. We will
						train the AI to decide if a given image is in the "real" category or "fake" category.
					</p>

					<div className="row">
						<img src={`${STATIC_URL}real_grapes.png`} className="img-fluid col-md-6" />
						<img src={`${STATIC_URL}fake_grapes.png`} className="img-fluid col-md-6" />
					</div>
				</div>
				<div className="col-md-4">
					<h4>Some examples</h4>

					<ul>
						<li>{createMoreInfo(explainerText["malaria"], "basic")}</li>
						<li>{createMoreInfo(explainerText["game"], "basic")}</li>
						<li>{createMoreInfo(explainerText["lunch"], "basic")}</li>
					</ul>

					<h4 className="mt-5">What is a problem where visual difference is important?</h4>
					<textarea
						placeholder="*optional"
						className="form-control"
						onChange={(e) => checkOptional(e)}
						value={currentOptional}
					/>
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
