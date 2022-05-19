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
	apple: "Apples are divided into Honeycrisp, Golden and NY",
	money: "Dollar bills that are real and counterfeit",
	silverware: "Forks, spoons and knives.",
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
					<OverlayTrigger trigger="click" rootClose placement="right" overlay={createPopover("malaria")}>
						<p className="my-2">
							Counterfeit Malaria Medicine <FaQuestionCircle className="mx-2 mb-2" />
						</p>
					</OverlayTrigger>

					<OverlayTrigger trigger="click" rootClose placement="right" overlay={createPopover("game")}>
						<p className="my-2">
							Stealing in Video Games <FaQuestionCircle className="mx-2 mb-2" />
						</p>
					</OverlayTrigger>

					<OverlayTrigger trigger="click" rootClose placement="right" overlay={createPopover("lunch")}>
						<p className="my-2">
							Homemade or Factory Made Lunches <FaQuestionCircle className="mx-2 mb-2" />{" "}
						</p>
					</OverlayTrigger>

					<h4 className="mt-5">Using a problem from the last screen please list, real and fake categories:</h4>
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
					<p>Which are examples of binary classification problems?</p>
					<Form onSubmit={checkConcepts}>
						{[
							{ type: "apple", label: "What kind of apple?" },
							{ type: "money", label: "Real or fake money?" },
							{ type: "silverware", label: "What is this piece of silverware?" },
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
