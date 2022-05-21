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

export default function SlideTwo() {
	const dispatch = useDispatch();

	const data = useSelector((state) => state.workbookState.data);
	const index = useSelector((state) => state.workbookState.workbook.current_lesson_id);

	let currentResponse = data.responses[index] || "";
	let currentOptional = data.optional[index] || "";

	const explainerText = {
		malaria: {
			title: "Counterfeit malaria medicine",
			body: "Insert explanation here",
			img_a: "real_grapes.png",
			img_b: "fake_grapes.png",
		},
		game: {
			title: "Stealing in video games as form of “griefing”",
			body: "Insert explanation here",
			img_a: "real_grapes.png",
			img_b: "fake_grapes.png",
		},
		lunch: {
			title: "Lunches that are homemade or factory made",
			body: "Insert explanation here",
			img_a: "real_grapes.png",
			img_b: "fake_grapes.png",
		},
	};

	const conceptQuestions = {
		apple: {
			label: "Apples are divided into Honeycrisp, Golden and NY.",
			isCorrect: true,
			hint: "Apples could be.",
		},
		money: {
			label: "Dollar bills that are real and counterfeit",
			isCorrect: true,
			hint: "money could be.",
		},
		silverware: {
			label: "Forks, spoons and knives.",
			isCorrect: true,
			hint: "silverware could be.",
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
				To make a problem a “binary classification” one we have to think about ways the problem can be divided into two
				categories. Once we have two categories we can start collecting data for each category.
			</p>

			<section className="row mt-5">
				<div className="col-md-4">
					<h4>Find examples of images in both categories.</h4>

					<p>
						The more examples, the better it will be able to generalize and find the common features across all examples
						in one category. But we set aside some images to use in validation, so we can see if it recognizes an image
						it never saw before.
					</p>

					<div className="row">
						<img src={`${STATIC_URL}image_select.png`} className="img-fluid col-12" />
					</div>
				</div>
				<div className="col-md-4">
					<h4 className="mb-4">Some examples of real vs fake</h4>

					<p>{createMoreInfo(explainerText["malaria"], "images")}</p>
					<p>{createMoreInfo(explainerText["game"], "images")}</p>
					<p>{createMoreInfo(explainerText["lunch"], "images")}</p>

					<h4 className="mt-5">Using a problem from the last screen please list, real and fake categories:</h4>
					<textarea
						placeholder="*optional"
						className="form-control"
						onChange={(e) => checkOptional(e)}
						defaultValue={currentOptional}
					/>
				</div>
				<div className="col-md-4">
					<h4>Concept Check</h4>
					<p>Which are examples of binary classification problems?</p>
					<CreateConceptCheck data={conceptQuestions} currentAnswers={currentResponse} callback={checkConcepts} />
				</div>
			</section>
		</React.Fragment>
	);
}
