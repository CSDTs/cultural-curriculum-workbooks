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

					<p>{createMoreInfo(explainerText["malaria"], "images")}</p>
					<p>{createMoreInfo(explainerText["game"], "images")}</p>
					<p>{createMoreInfo(explainerText["lunch"], "images")}</p>

					<h4 className="mt-5">
						{currentOptional && <FaCheck className={styles.correct} />}Using a problem from the last screen please list,
						real and fake categories:
					</h4>
					<textarea
						placeholder="*optional"
						className="form-control"
						onChange={(e) => checkOptional(e)}
						defaultValue={currentOptional}
					/>
				</div>
				<div className="col-md-4">
					<h4>Concept Check</h4>
					<p>
						From the list below check binary classification problems. Leave blank problems that are not described as
						binary classification problems.
					</p>
					<CreateConceptCheck data={conceptQuestions} currentAnswers={currentResponse} callback={checkConcepts} />
				</div>
			</section>
		</React.Fragment>
	);
}
