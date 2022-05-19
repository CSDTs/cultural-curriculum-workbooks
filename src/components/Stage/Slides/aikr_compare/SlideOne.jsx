import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { updateResponse, updateOptionalResponse, updateEarnedPoints } from "../../../../slices/workbookSlice.js";
import { Form, Button, Popover, OverlayTrigger } from "react-bootstrap";
import { FaQuestionCircle, FaCheck, FaExclamation } from "react-icons/fa";

import styles from "./Slides.module.scss";

const STATIC_URL = "./img/aikr_compare/";

const explainerText = {
	malaria: {
		title: "Counterfeit malaria medicine",
		body: "Insert explanation here",
	},
	game: {
		title: "Stealing in video games as form of “griefing”",
		body: "Insert explanation here",
	},
	lunch: {
		title: "Lunches that are homemade or factory made",
		body: "Insert explanation here",
	},
};

const conceptHints = {
	energy: "Energy could be considered.",
	weight: "Weight could be considered.",
	noise: "Noise could be considered.",
};

const correctAnswers = [true, true, true];

const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

const createPopover = (key) => {
	let data = explainerText[key];
	return (
		<Popover id={`popover-${key}`}>
			<Popover.Header as="h3">{data.title}</Popover.Header>
			<Popover.Body>{data.body}</Popover.Body>
		</Popover>
	);
};

const createLabel = (text, a, b) => {
	return (
		<>
			<span>{text} </span>
			{a && b && <FaCheck className={styles.correct} />}
			{a && !b && <FaExclamation className={styles.incorrect} />}
		</>
	);
};
export default function SlideOne() {
	const dispatch = useDispatch();

	const data = useSelector((state) => state.workbookState.data);
	const index = useSelector((state) => state.workbookState.workbook.current_lesson_id);

	let currentResponse = data.responses[index] || "";
	let currentOptional = data.optional[index] || "";

	const checkConcepts = (event) => {
		event.preventDefault();

		dispatch(
			updateResponse(
				Array.from(document.querySelectorAll("form input")).map((item) => {
					return item.checked;
				})
			)
		);

		dispatch(updateEarnedPoints());
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
						<li>
							<OverlayTrigger trigger="click" rootClose placement="right" overlay={createPopover("malaria")}>
								<span>
									Counterfeit Malaria Medicine
									<FaQuestionCircle className="mx-2 mb-2" />
								</span>
							</OverlayTrigger>
						</li>
						<li>
							<OverlayTrigger trigger="click" rootClose placement="right" overlay={createPopover("game")}>
								<span>
									Stealing in Video Games <FaQuestionCircle className="mx-2 mb-2" />
								</span>
							</OverlayTrigger>
						</li>
						<li>
							<OverlayTrigger trigger="click" rootClose placement="right" overlay={createPopover("lunch")}>
								<span>
									Lunches that are Homemade or Factory Made <FaQuestionCircle className="mx-2 mb-2" />
								</span>
							</OverlayTrigger>
						</li>
					</ul>

					<h4 className="mt-5">What is a problem where visual difference is important?</h4>
					<textarea
						placeholder="*optional"
						className="form-control"
						onChange={(e) => {
							dispatch(updateOptionalResponse(e.target.value));
						}}
						value={currentOptional}
					/>
				</div>
				<div className="col-md-4">
					<h4>Concept Check</h4>
					<p>Which kinds of problems can be treated as classification problems?</p>
					<Form onSubmit={checkConcepts}>
						{[
							{ type: "energy", label: "Excessive energy use" },
							{ type: "weight", label: "The range of baby weights" },
							{ type: "noise", label: "Noisy neighbors" },
						].map((opt, index) => (
							<div key={`${opt.type}-checkbox`} className="mb-3">
								<Form.Check
									type="checkbox"
									id={`${opt.type}-checkbox`}
									label={createLabel(opt.label, currentResponse, currentResponse[index])}
									value={opt.type}
									className="d-inline-block"
								/>{" "}
							</div>
						))}
						<Button variant="primary" type="submit" className=" w-100">
							{currentResponse ? "Try Again" : "Check Answers"}
						</Button>

						{currentResponse && (
							<div className={`mt-3 p-3 ${styles.conceptFeedback}`}>
								<p>
									{Object.keys(conceptHints).map((item, index) => (
										<strong key={`${index}-hint`}>{!currentResponse[index] && conceptHints[item]} </strong>
									))}
									{!isEqual(correctAnswers, currentResponse) && <strong>Try again?</strong>}
									{isEqual(correctAnswers, currentResponse) && (
										<strong>Congrats! Now you can move on to the next section!</strong>
									)}
								</p>
							</div>
						)}
					</Form>
				</div>
			</section>
		</React.Fragment>
	);
}
