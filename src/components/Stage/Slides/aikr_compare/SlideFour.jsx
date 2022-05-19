import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { updateResponse, updateOptionalResponse, updateEarnedPoints } from "../../../../slices/workbookSlice.js";
import { Form, Button, Popover, OverlayTrigger } from "react-bootstrap";
import { FaQuestionCircle, FaCheck, FaExclamation } from "react-icons/fa";

import styles from "./Slides.module.scss";

const correctAnswers = {
	problem: [false, true, false],
	category: [true, false, false],
	validation: [true, false, false],
};

const allCorrectAnswers = new Array().concat(
	correctAnswers.problem,
	correctAnswers.category,
	correctAnswers.validation
);

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

const createLabel = (text, responsesExist, response, correctAnswer) => {
	return (
		<>
			<span>{`${text}`}</span>
			{responsesExist && response && correctAnswer && <FaCheck className={styles.correct} />}
			{responsesExist && !(response && correctAnswer) && <FaExclamation className={styles.incorrect} />}
		</>
	);
};

export default function SlideFour() {
	const dispatch = useDispatch();

	const data = useSelector((state) => state.workbookState.data);
	const index = useSelector((state) => state.workbookState.workbook.current_lesson_id);

	let currentResponse = data.responses[index] || "";
	let currentOptional = data.optional[index] || "";

	const checkConcepts = (event) => {
		event.preventDefault();

		dispatch(
			updateResponse(
				Array.from(document.querySelectorAll("form input")).map((item, index) => {
					return item.checked && allCorrectAnswers[index];
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
				Before we continue let's double check your understanding so far. You can go back, re-read and click for more
				detail while answering these questions.
			</p>

			<section className="row mt-5">
				<div className="col-md-4">
					<h4>Problem Concept Check</h4>
					<p>Which kinds of problems can be treated as classification problems?</p>
					<Form>
						{[
							{ type: "energy", label: "Excessive energy use" },
							{ type: "weight", label: "The range of baby weights" },
							{ type: "noise", label: "Noisy neighbors" },
						].map((opt, index) => (
							<div key={`${opt.type}-checkbox`} className="mb-3">
								<Form.Check
									type="checkbox"
									id={`${opt.type}-checkbox`}
									label={createLabel(opt.label, currentResponse, currentResponse[index], correctAnswers.problem[index])}
									value={opt.type}
									className="d-inline-block"
								/>
							</div>
						))}
					</Form>
				</div>
				<div className="col-md-4">
					<h4>2 Category Concept Check</h4>
					<p>Which are examples of binary classification problems?</p>
					<Form>
						{[
							{ type: "apple", label: "What kind of apple?" },
							{ type: "money", label: "Real or fake money?" },
							{ type: "silverware", label: "What is this piece of silverware?" },
						].map((opt, index) => (
							<div key={`${opt.type}-checkbox`} className="mb-3">
								<Form.Check
									type="checkbox"
									id={`${opt.type}-checkbox`}
									label={createLabel(
										opt.label,
										currentResponse,
										currentResponse[index + 3],
										correctAnswers.category[index]
									)}
									value={opt.type}
									className="d-inline-block"
								/>
							</div>
						))}
					</Form>
				</div>
				<div className="col-md-4">
					<h4>Validation Concept Check</h4>
					<p>Which kinds of problems can be treated as classification problems?</p>
					<Form>
						{[
							{ type: "bias", label: "Only photos of the spoons have shadows in them." },
							{ type: "small", label: "Only 1 example of each category." },
							{ type: "examples", label: "All possible examples of each category." },
						].map((opt, index) => (
							<div key={`${opt.type}-checkbox`} className="mb-3">
								<Form.Check
									type="checkbox"
									id={`${opt.type}-checkbox`}
									label={createLabel(
										opt.label,
										currentResponse,
										currentResponse[index + 6],
										correctAnswers.validation[index]
									)}
									value={opt.type}
									className="d-inline-block"
								/>
							</div>
						))}
					</Form>
				</div>
			</section>

			<div className="row justify-content-center mt-5">
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
