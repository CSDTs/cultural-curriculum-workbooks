import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	updateResponse,
	updateOptionalResponse,
	updateEarnedPoints,
	updateSaveStatus,
} from "/src/slices/workbookSlice.js";

import { STATIC_URL, createMoreInfo, CreateConceptCheck } from "./index";
import { FaQuestionCircle, FaCheck, FaExclamation } from "react-icons/fa";
import styles from "./Slides.module.scss";
import { Tabs, Tab } from "react-bootstrap";
export default function SlideTwo() {
	const dispatch = useDispatch();

	const data = useSelector((state) => state.workbookState.data);
	const index = useSelector((state) => state.workbookState.workbook.current_lesson_id);

	let currentResponse = data.responses[index] || "";
	let currentOptional = data.optional[index] || "";

	const explainerText = {
		malaria: {
			title: "Counterfeit malaria medicine",
			brief:
				"Malaria medicine bottles can appear differently under UV light. The visual difference can create a binary classification problem for use to study with AI.",
			body: "In the images below both drug bottles appear nearly identical under normal lighting conditions. But under UV light there are stark differences between the two categories of real or fake medicine. Which bottle do you think is real and which one is fake?",
			img_a: "alli_a.png",
			img_b: "alli_b.png",
		},
		game: {
			title: "Stealing in video games as form of “griefing”",
			brief:
				"In the popular multiplayer game MineCraft groups of players can band together to upset other players by doing damage to their structures, an act called griefing. But structural damage can happen naturally too. ",
			body: "The first image contains a griefer that is about to set off boxes of TNT inside another player’s structure to cause a house fire. But the second image contains a naturally occurring house fire. Given a house on fire what might be some ways to tell if it was caused by a griefer?",
			img_a: "game_a.png",
			img_b: "game_b.png",
		},
		lunch: {
			title: "Lunches that are homemade or factory made",
			brief:
				"The texture and colors present in a given meal can often visually indicate whether a meal was homemade or factory made",
			body: "In this example from our own application, we have home made and factory made meals. Which do you think is home made?",
			img_a: "food_a.png",
			img_b: "food_b.png",
		},
	};

	const conceptQuestions = {
		apple: {
			label: "What kind of Apple is this? Apples are divided into Honeycrisp, Golden and Empire",
			isCorrect: false,
			hint: "Apples could be.",
			afterthought: "No! The apple are divided into three, not two categories",
		},
		money: {
			label: "Real or fake money? Dollar bills that are real and counterfeit",
			isCorrect: true,
			hint: "money could be.",
			afterthought: "Yes! Fake and real money are two categories of money.",
		},
		silverware: {
			label: "What is this piece of silverware? Forks, spoons and knives. ",
			isCorrect: false,
			hint: "silverware could be.",
			afterthought: "No! The silverware is divided into three categories.",
		},
		nickel: {
			label: "Is a nickel typical or is it an ultra-rare 1913 one of a kind Liberty nickel?",
			isCorrect: true,
			hint: "",
			afterthought:
				"Yes! Even if one of the two category has only one possible kind it is still a binary classification problem",
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
			<p>
				OK, let's explore the issue of people replacement a bit. Pick one or more of these to see how AI, robots and
				other automation may affect this profession. Select on each of the tabs to see.
			</p>

			<Tabs defaultActiveKey="profile" id="fill-tab-example" className="mb-3" fill>
				<Tab eventKey="home" title="Musician">
					<p>
						We like to think of music as pure human creativity, but AI can now analyze thousands of songs and generate
						new ones based on that data:
					</p>
					<div className="ratio ratio-16x9">
						<video controls>
							<source src="./img/ai_labor/prompt.mp4" type="video/mp4" />
						</video>
					</div>
				</Tab>
				<Tab eventKey="profile" title="Lawyer">
					<p>
						While we may still need lawyers, the numbers will likely be reduced: research shows that automation can do
						much of their work. And even judges are using AI for pre-trial recommendations
					</p>
					<div className="ratio ratio-16x9">
						<video controls>
							<source src="./img/ai_labor/law.mp4" type="video/mp4" />
						</video>
					</div>
				</Tab>
				<Tab eventKey="longer-tab" title="Website Designer">
					<p>
						If you thought going into computing would keep your job safe from automation, think again. This failed
						example from 2014 showed that AI-powered web design will be harder than it looks, but that does not mean
						it's safe forever:
					</p>
					<div className="ratio ratio-16x9">
						<video controls>
							<source src="./img/ai_labor/website.mp4" type="video/mp4" />
						</video>
					</div>
				</Tab>
				<Tab eventKey="contact" title="Driving Services">
					<p>
						Obviously any repetitive manual labor job--assembly line workers for example--will be impacted. But driving
						has over 10 million workers in trucking alone:{" "}
					</p>

					<div className="ratio ratio-16x9">
						<video controls>
							<source src="./img/ai_labor/drive.mp4" type="video/mp4" />
						</video>
					</div>
				</Tab>
			</Tabs>
		</React.Fragment>
	);
}
