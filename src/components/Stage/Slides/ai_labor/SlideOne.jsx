import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	updateResponse,
	updateOptionalResponse,
	updateEarnedPoints,
	updateSaveStatus,
} from "/src/slices/workbookSlice.js";
import { FaQuestionCircle, FaCheck, FaExclamation } from "react-icons/fa";
import { STATIC_URL, createMoreInfo, CreateConceptCheck } from "./index";
import { Container, Row, Col } from "react-bootstrap";

import styles from "./Slides.module.scss";

export default function SlideOne() {
	const dispatch = useDispatch();

	const data = useSelector((state) => state.workbookState.data);
	const index = useSelector((state) => state.workbookState.workbook.current_lesson_id);

	let currentResponse = data.responses[index] || "";
	let currentOptional = data.optional[index] || "";

	const explainerText = {
		malaria: {
			title: "Counterfeit malaria medicine",
			body:
				"Malaria is a life threatening disease transmitted by mosquitoes carrying parasites. " +
				"Beyond threatening millions, particularly in Nigeria, recovery is hampered by fake anti-malarial medicine. In 2011, a World Health Organization (WHO) survey revealed that 64% of the malaria medicine imported in Nigeria were fake. " +
				"Want to learn more about this problem of counterfeit drugs and how it has changed over time? You can read more about this",
			slug: "malaria",
			readMoreLink: "https://theconversation.com/fake-drugs-are-one-reason-malaria-still-kills-so-many-92712",
			readMoreText: "in this article from the Conversation.",
		},
		game: {
			title: "Stealing in video games as form of “griefing”",
			body:
				"Have you played a multiplayer game where a teammate played the games in unintended ways to upset you and others?" +
				"Upsetting other players without any in-game rewards is called griefing and makes games less fun for others." +
				"Games such as Minecraft, where griefers can destroy other player creations with fire or steal from others, can have entire game modifications" +
				" dedicated to the detection and prevention of griefing. If you want to learn more about the problem of griefing, check out",
			slug: "game",
			readMoreLink: "https://www.kidas.net/post/toxic-gaming-behavior-griefing",
			readMoreText: "this Kidas article on Griefing. ",
		},
		lunch: {
			title: "Lunches that are homemade or factory made",
			body:
				"We all know that eating meals that are homemade can often be healthier than heavily processed meals, such as those made in factories." +
				"But sometimes it can be difficult to tell the difference. Would you like to know a few ways to tell just from the ingredients? Read more in",
			slug: "lunch",
			readMoreLink: "https://www.healthline.com/nutrition/junk-food-vs-healthy-food#what-are-highly-processed-foods",
			readMoreText: "this Healthline article. ",
		},
	};

	const conceptQuestions = {
		energy: {
			label: "Excessive energy use in a home",
			isCorrect: true,
			hint: "Energy could be.",
			afterthought: "Yes! Using more than acceptable amounts of energy is an excessive category of use",
		},
		weight: {
			label: "Deciding if a meal is homemade or factory made",
			isCorrect: true,
			hint: "Food could be.",
			afterthought:
				"Yes! A meal is either made at home or can be made in many other places. One place is in a food processing plant.",
		},
		noise: {
			label: "Neighbors being too noisy",
			isCorrect: true,
			hint: "Noise could be.",
			afterthought:
				"Yes! For example, if neighbors were louder than, say a vacuum cleaner in your home, then many would say they were being noisy.",
		},
		tomato: {
			label: "If a tomato plant has received enough water for a given week",
			isCorrect: true,
			hint: "Watering tomatoes could be.",
			afterthought: "Yes! Yellowing of leaves indicates lack of water for tomato plants.",
		},
	};

	const checkConcepts = (event) => {
		event.preventDefault();
		let userResponses = Array.from(document.querySelectorAll("form input")).map((item) => {
			return item.checked;
		});
		dispatch(updateResponse(userResponses));
		dispatch(updateEarnedPoints());
		dispatch(updateSaveStatus(false));
	};

	const checkOptional = (event) => {
		event.preventDefault();
		dispatch(updateOptionalResponse(event.target.value));
		dispatch(updateSaveStatus(false));
	};

	React.useEffect(() => {
		Array.from(document.querySelectorAll("form input")).map((item, index) => {
			item.checked = currentResponse[index];
		});
	}, []);

	return (
		<React.Fragment>
			<img className="mb-4" src="./img/ai_labor/intro.png" style={{ marginLeft: "auto", marginRight: "auto" }} />
			<p>
				AI, robotics and other automation are some of the hottest tech in town. But with great power comes great
				responsibility. What kinds of jobs might end up with machines replacing people, or other kinds of changes? What
				sorts of problems should we look for?
			</p>

			<section className="row mt-2">
				<div className="col-md-8">
					<h4 className="mt-2">{currentOptional && <FaCheck className={styles.correct} />} Write your answer here:</h4>
					<textarea
						placeholder="We should look for..."
						className="form-control"
						onChange={(e) => checkOptional(e)}
						value={currentOptional}
					/>
				</div>
			</section>
		</React.Fragment>
	);
}
