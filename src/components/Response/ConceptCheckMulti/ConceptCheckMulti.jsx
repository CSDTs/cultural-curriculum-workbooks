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
			</Form>
		</>
	);
}
