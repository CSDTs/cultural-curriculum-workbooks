import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	updateResponse,
	updateOptionalResponse,
	updateEarnedPoints,
	updateSaveStatus,
} from "/src/slices/workbookSlice.js";

import { Form, Button, Popover, OverlayTrigger } from "react-bootstrap";
import { FaQuestionCircle, FaCheck, FaExclamation } from "react-icons/fa";
import { STATIC_URL, createMoreInfo, CreateConceptCheck, createLabel, isEqual, CreateConceptForm } from "./index";
import styles from "./Slides.module.scss";

export default function SlideFour() {
	const dispatch = useDispatch();

	const data = useSelector((state) => state.workbookState.data);
	const index = useSelector((state) => state.workbookState.workbook.current_lesson_id);

	let currentResponse = data.responses[index] || "";
	let currentOptional = data.optional[index] || "";

	const conceptQuestionsA = {
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

	const conceptQuestionsB = {
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

	const conceptQuestionsC = {
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

	const allCorrectAnswers = new Array().concat(
		Object.keys(conceptQuestionsA).map((opt) => {
			return conceptQuestionsA[opt].isCorrect;
		}),
		Object.keys(conceptQuestionsB).map((opt) => {
			return conceptQuestionsB[opt].isCorrect;
		}),
		Object.keys(conceptQuestionsC).map((opt) => {
			return conceptQuestionsC[opt].isCorrect;
		})
	);

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
				Before we continue let's double check your understanding so far. You can go back, re-read and click for more
				detail while answering these questions.
			</p>

			<section className="row mt-5">
				<div className="col-md-4">
					<h4>Problem Concept Check</h4>
					<p>Which kinds of problems can be treated as classification problems?</p>
					<CreateConceptForm data={conceptQuestionsA} currentAnswers={currentResponse} offset={0} />
				</div>
				<div className="col-md-4">
					<h4>2 Category Concept Check</h4>
					<p>Which are examples of binary classification problems?</p>
					<CreateConceptForm data={conceptQuestionsB} currentAnswers={currentResponse} offset={3} />
				</div>
				<div className="col-md-4">
					<h4>Validation Concept Check</h4>
					<p>Which kinds of problems can be treated as classification problems?</p>
					<CreateConceptForm data={conceptQuestionsC} currentAnswers={currentResponse} offset={6} />
				</div>
			</section>

			<div className="row justify-content-center mt-4">
				<div className="col-md-4 ">
					<Button
						variant="primary"
						type="button"
						onClick={checkConcepts}
						className="w-100"
						disabled={isEqual(allCorrectAnswers, currentResponse)}>
						Check your answers
					</Button>
					{currentResponse && isEqual(allCorrectAnswers, currentResponse) && (
						<div className={`mt-3 p-3 ${styles.conceptFeedback}`}>
							<p>
								<strong>Congrats! Now you can move on to the next section!</strong>
							</p>
						</div>
					)}
				</div>
			</div>
		</React.Fragment>
	);
}
