import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setCurrentLessonData } from "#slices/workbookSlice";

import { updateResponse, updateEarnedPoints, updateSaveStatus } from "/src/slices/workbookSlice.js";
import Ratio from "react-bootstrap/Ratio";

import styles from "./Slides.module.scss";

import { Button, Card } from "react-bootstrap";
export default function SlideFive() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(updateResponse(" "));
		dispatch(updateEarnedPoints());
		dispatch(updateSaveStatus(false));
	}, []);

	const lunchLesson = { lessonID: 5, title: "Real vs Fake", tags: "slide", points: 1 };
	const traditionLesson = { lessonID: 13, title: "Tradition & Tech", tags: "slide", points: 0 };
	const lessonSet = (lesson) => {
		dispatch(setCurrentLessonData(lesson));
	};

	return (
		<>
			<p>
				Now onto solutions! The data from economists suggest that technology does not have to have these impacts. It
				might be possible to design a different kind of system, one where automation empowers workers and consumers.
				This will be one of the most important challenges for your generation.{" "}
				<strong>Choose one of the two paths below:</strong>
			</p>

			<div className="row justify-content-around">
				<div className="col-md-3">
					<Card onClick={() => lessonSet(lunchLesson)}>
						<Ratio aspectRatio={"1x1"}>
							<img src="./img/ai_labor/food.png" className="w-100" />
						</Ratio>
						<Card.Body>
							<Card.Title>Real vs. Fake</Card.Title>
							<Card.Subtitle>How Does AI Work to Classify Things?</Card.Subtitle>
							<Card.Text>Create an app to help consumers choose between hand made and machine made products</Card.Text>
						</Card.Body>
					</Card>
				</div>
				<div className="col-md-3">
					<Card onClick={() => lessonSet(traditionLesson)}>
						<Ratio aspectRatio={"1x1"}>
							<img src="./img/ai_labor/patterns.png" className="w-100" />
						</Ratio>
						<Card.Body>
							<Card.Title>Tradition + Tech</Card.Title>
							<Card.Subtitle>How Does AI Work as a Creative Tool?</Card.Subtitle>
							<Card.Text>Help old school designers create new hybrid patterns using AI</Card.Text>
						</Card.Body>
					</Card>
				</div>
			</div>
		</>
	);
}
