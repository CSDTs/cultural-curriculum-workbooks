import React from "react";
import { FaQuestionCircle, FaCheck, FaExclamation } from "react-icons/fa";
import { Popover, OverlayTrigger, Form, Button, Card } from "react-bootstrap";
import SlideOne from "./SlideOne";
import SlideTwo from "./SlideTwo";
import SlideThree from "./SlideThree";
import SlideFour from "./SlideFour";
import SlideFive from "./SlideFive";
import SlideSix from "./SlideSix";
import SlideSeven from "./SlideSeven";
import SlideEight from "./SlideEight";
import SlideNine from "./SlideNine";
import styles from "./Slides.module.scss";

export const STATIC_URL = "./img/aikr_compare/";

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

export const createLabel = (text, a, b) => {
	return (
		<>
			<span>{text} </span>
			{a && b && <FaCheck className={styles.correct} />}
			{a && !b && <FaExclamation className={styles.incorrect} />}
		</>
	);
};

export const createPopover = (data, type) => {
	return (
		<Popover id={`popover-${data.slug}`}>
			<Popover.Header as="h3">{data.title}</Popover.Header>
			{type == "basic" && (
				<Popover.Body>
					{data.body} <a href={data.readMoreLink}>{data.readMoreText}</a>
				</Popover.Body>
			)}
			{type == "images" && (
				<Popover.Body>
					<span className="mb-3 d-block">{data.body}</span>
					<div className="row justify-content-center mb-4">
						<img src={`${STATIC_URL}${data.img_a}`} className="img-fluid col-md-6" />
						<img src={`${STATIC_URL}${data.img_b}`} className="img-fluid col-md-6" />
					</div>
				</Popover.Body>
			)}
		</Popover>
	);
};

export const createMoreInfo = (data, type) => {
	let popover = createPopover(data, type);

	return (
		<OverlayTrigger trigger="click" rootClose placement="right" overlay={popover}>
			<span>
				{data.title}
				<FaQuestionCircle className="mx-2 mb-2" />
			</span>
		</OverlayTrigger>
	);
};

export const CreateConceptCheck = ({ data, currentAnswers, callback }) => {
	const correctAnswers = Object.keys(data).reduce((total, current) => {
		return total.concat(data[current].isCorrect);
	}, []);

	return (
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
								{currentAnswers[index] && !data[item].isCorrect && data[item].hint}
								{currentAnswers[index] && data[item].isCorrect && ""}
								{!currentAnswers[index] && data[item].isCorrect && data[item].hint}{" "}
							</strong>
						))}

						<strong>
							{isEqual(correctAnswers, currentAnswers) ? "Congrats! Time to move on to the next lesson!" : "Try Again."}
						</strong>
					</p>
				</div>
			)}
		</Form>
	);
};

export const CreateConceptForm = ({ data, currentAnswers, offset }) => {
	return (
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
	);
};

export const CreateLunchOptions = ({ data, callback, type }) => {
	let content;

	if (type.includes("Count"))
		content = (
			<>
				<Form.Control
					type="number"
					defaultValue="0"
					className="w-25"
					max="10"
					min="0"
					id={`${type}-input`}
					onChange={(e) => {
						callback(e.target.value, type);
					}}
				/>
			</>
		);
	else if (type.includes("Set"))
		content = (
			<>
				{data.map((opt) => (
					<div key={`${opt.type}-checkbox`} className="mb-3 d-inline">
						<Form.Check
							inline
							type="checkbox"
							id={`${opt.type}-checkbox`}
							label={opt.label}
							value={opt.type}
							onClick={(e) => callback(e.target.value, type)}
						/>
					</div>
				))}
			</>
		);
	else throw new Error("Double check param terms between this and Joe's Lunch");

	return content;
};

export const CreateWriteUp = ({ title, callback, next, data, show, rows }) => {
	return (
		<div className="col-md-3 align-self-center">
			<p>
				<strong>{title}</strong>
			</p>
			<textarea
				className="form-control"
				rows={rows}
				onChange={(e) => {
					callback(e.target.value, data);
				}}
				placeholder={data.statement}
				value={data.response || data.statement}
			/>
			{!show.all && (
				<Button variant="primary" type="submit" className="mt-3 w-100" onClick={() => next()} disabled={!data.verified}>
					Advance
				</Button>
			)}
		</div>
	);
};

export const CreateWriteUpBasic = ({ title, callback, next, data, show, rows }) => {
	return (
		<div className="col-md-3 align-self-center">
			<p>
				<strong>{title}</strong>
			</p>
			<textarea
				className="form-control"
				rows={rows}
				onChange={(e) => {
					callback(e.target.value, data);
				}}
				placeholder={data.statement}
				value={data.response || data.statement}
			/>

			<p>Word Count: {data.response.split(" ").length - 1}</p>
			{data.verified && <p>Good Job!</p>}
		</div>
	);
};

export default function Slides(props) {
	const SLIDE_ARRAY = [
		SlideOne,
		SlideTwo,
		SlideThree,
		SlideFour,
		SlideFive,
		SlideSix,
		SlideSeven,
		SlideEight,
		SlideNine,
	];

	let Content = SLIDE_ARRAY[props.slideID];

	return (
		<section>
			<Content />
		</section>
	);
}
