import { FaQuestionCircle, FaCheck, FaExclamation } from "react-icons/fa";
import { Popover, OverlayTrigger, Form, Button, Card } from "react-bootstrap";

import styles from "./ConceptCheckMulti.module.scss";
const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

const isCorrect = (questions) => {
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
export default function ConceptCheckMulti({ title, description, data, currentAnswers, offset }) {
	const correctAnswers = Object.keys(data).reduce((total, current) => {
		return total.concat(data[current].isCorrect);
	}, []);

	return (
		<>
			<h4>{title}</h4>
			<p>{description}</p>
			<Form>
				{Object.keys(data).map((opt, index) => (
					<div key={`${opt}-checkbox`} className="mb-3">
						<Form.Check
							type="checkbox"
							id={`${opt}-checkbox`}
							label={createLabel(data[opt].label, currentAnswers[index + offset], data[opt].isCorrect)}
							value={opt}
							className="d-inline-block"
						/>
					</div>
				))}

				{currentAnswers && (
					<div className={`mt-3 p-3 ${styles.conceptFeedback}`}>
						<p>
							{Object.keys(data).map((item, index) => (
								<strong key={`${index}-sss`}>
									<p>{currentAnswers[index + offset] && data[item].isCorrect && data[item].afterthought}</p>
									{currentAnswers[index + offset] && !data[item].isCorrect && data[item].hint}
									{currentAnswers[index + offset] && data[item].isCorrect && ""}
									{!currentAnswers[index + offset] && data[item].isCorrect && data[item].hint}{" "}
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
