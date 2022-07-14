import { FaQuestionCircle, FaCheck, FaExclamation } from "react-icons/fa";
import { Popover, OverlayTrigger, Form, Button, Card } from "react-bootstrap";

import styles from "./ConceptCheck.module.scss";
export const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

export const isCorrect = (questions) => {
	let isCorrect = [];
	let isChecked = [];

	Object.keys(questions).map((key) => {
		isCorrect.push(questions[key].isCorrect);
		isChecked.push(questions[key].ref.current.isChecked || false);
	});

	console.log(isCorrect);
	console.log(isChecked);
	return isEqual(isCorrect, isChecked);
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

export default function ConceptCheck({ title, description, data, currentAnswers, callback }) {
	const correctAnswers = Object.keys(data).reduce((total, current) => {
		return total.concat(data[current].isCorrect);
	}, []);

	return (
		<>
			<h4>{title || "Concept Check"}</h4>
			<p>{description}</p>
			<Form onSubmit={callback}>
				{Object.keys(data).map((opt, index) => (
					<div key={`${opt}-checkbox`} className="mb-3">
						<Form.Check
							type="checkbox"
							id={`${opt}-checkbox`}
							label={createLabel(data[opt].label, currentAnswers[index], data[opt].isCorrect)}
							value={opt}
							className="d-inline-block"
						/>{" "}
					</div>
				))}
				<Button variant="primary" type="submit" className=" w-100">
					{currentAnswers ? "Try Again?" : "Check Answers"}
				</Button>

				{currentAnswers && (
					<div className={`mt-3 p-3 ${styles.conceptFeedback}`}>
						<p>
							{Object.keys(data).map((item, index) => (
								<strong key={`${index}-sss`}>
									<p>{currentAnswers[index] && data[item].isCorrect && data[item].afterthought}</p>
									{currentAnswers[index] && !data[item].isCorrect && data[item].hint}
									{currentAnswers[index] && data[item].isCorrect && ""}
									{!currentAnswers[index] && data[item].isCorrect && data[item].hint}{" "}
								</strong>
							))}

							<strong>
								{isEqual(correctAnswers, currentAnswers)
									? "Congrats! Time to move on to the next lesson!"
									: "Try Again."}
							</strong>
						</p>
					</div>
				)}
			</Form>
		</>
	);
}
