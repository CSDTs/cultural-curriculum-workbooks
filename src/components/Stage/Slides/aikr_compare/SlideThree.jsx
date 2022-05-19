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

const conceptHints = {
	bias: "First one explainer text",
	small: "Second one explainer text",
	examples: "Third one explainer text",
};

const correctAnswers = [true, true, true];

const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

const createPopover = (key) => {
	let data = explainerText[key];
	return (
		<Popover id={`popover-${key}`}>
			<Popover.Header as="h3">{data.title}</Popover.Header>
			<Popover.Body>
				<span className="mb-3 d-block">{data.body}</span>
				<div className="row justify-content-center mb-4">
					<img src={`${STATIC_URL}${data.img_a}`} className="img-fluid col-md-6" />
					<img src={`${STATIC_URL}${data.img_b}`} className="img-fluid col-md-6" />
				</div>
			</Popover.Body>
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

export default function SlideTwo() {
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
					<Form onSubmit={checkConcepts}>
						{[
							{
								type: "bias",
								label: "Classifying silverware as spoons or forks when only photos of the spoons have shadows in them.",
							},
							{ type: "small", label: "We only had 1 example of each category?" },
							{ type: "examples", label: "We had all possible examples of each category?" },
						].map((opt, index) => (
							<div key={`${opt.type}-checkbox`} className="mb-3">
								<Form.Check
									type="checkbox"
									id={`${opt.type}-checkbox`}
									label={createLabel(opt.label, currentResponse, currentResponse[index])}
									value={opt.type}
									className="d-inline-block"
								/>
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
