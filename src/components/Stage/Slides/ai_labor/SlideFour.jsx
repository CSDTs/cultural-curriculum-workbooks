import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	updateResponse,
	updateOptionalResponse,
	updateEarnedPoints,
	updateSaveStatus,
} from "/src/slices/workbookSlice.js";

import { Form, Button, Popover, OverlayTrigger } from "react-bootstrap";
import { FaQuestionCircle, FaCheck, FaExclamation } from "react-icons/fa";
import { STATIC_URL, createMoreInfo, CreateConceptCheck, createLabel, isEqual, CreateConceptForm } from "./index";
import styles from "./Slides.module.scss";

export default function SlideFour() {
	const dispatch = useDispatch();

	const data = useSelector((state) => state.workbookState.data);
	const index = useSelector((state) => state.workbookState.workbook.current_lesson_id);

	let currentResponse = data.responses[index] || "";
	let currentOptional = data.optional[index] || "";

	const conceptQuestionsA = {
		temperature: {
			label: "Developing a temperature sensor that reports ambient heat",
			isCorrect: false,
			hint: "Energy could be.",
			afterthought: "No! Ambient heat is measured and reported as a real number here, not as one or a few categories",
		},
		volunteer: {
			label: "Whether a person is eligible to volunteer for a soup kitchen",
			isCorrect: true,
			hint: "Weight could be.",
			afterthought: "Yes! Eligibility can described as a set of categories a person must meet",
		},
		artwork: {
			label: "Determining if artwork has been plagiarized",
			isCorrect: true,
			hint: "Noise could be.",
			afterthought:
				"Yes! Plagiarism, includes authentic and fake categories to help decide if something has been copied improperly",
		},
		friend: {
			label: "Asking a busy friend if they can provide transportation for you",
			isCorrect: true,
			hint: "Noise could be.",
			afterthought:
				"Yes! In talking to your friend they will say yes or no. Their answer determines if you can get a ride or not",
		},
	};

	const conceptQuestionsB = {
		coins: {
			label: "The denominations of all US coins?",
			isCorrect: false,
			hint: "Apples could be.",
			afterthought: "No! Pennies, nickels, and dimes make up three categories and there still are other coins.",
		},
		dialysis: {
			label: "Whether someone needs kidney dialysis or not?",
			isCorrect: true,
			hint: "money could be.",
			afterthought:
				"Yes! There are specific Western medical criteria that can be checked and used to tell someone they need to be put on dialysis, or that they do not need it.",
		},
		medicine: {
			label: " Is heart medicine counterfeit or not?",
			isCorrect: true,
			hint: "silverware could be.",
			afterthought:
				"Yes! By learning and modeling the difference between counterfeit and authentic medicine you can decide which category it belongs to",
		},
		friends: {
			label: "In a group of friends, is anyone yourself?",
			isCorrect: false,
			hint: "silverware could be.",
			afterthought:
				"No! Although this is a strange question, there is only one category of answer: no one else in your friend group is yourself.",
		},
	};

	const conceptQuestionsC = {
		cloudy: {
			label: "An AI is found to reliably detect tanks only on cloudy days",
			isCorrect: true,
			hint: "bias could be.",
			afterthought:
				"Yes! This is an example of poor validation performance and spurious correlation. When tested against new data, such as sunny days, the AI starts performing poorly. An AI engineer would say it has not “generalized” well",
		},
		lunches: {
			label:
				"Lunches that sit on square trays are always classified as factory made by an AI even if they were made at home.",
			isCorrect: true,
			hint: "small could be.",
			afterthought:
				"Yes! This is an example of spurious classification. Taking a diversity of other photos is important to avoid spurious classification",
		},
		environmental: {
			label: "When shown an entirely new product an AI is able to correctly estimate its environmental impact",
			isCorrect: true,
			hint: "examples could be.",
			afterthought: "No! This is an example of good validation performance",
		},
	};

	const allCorrectAnswers = new Array().concat(
		Object.keys(conceptQuestionsA).map((opt) => {
			return conceptQuestionsA[opt].isCorrect;
		}),
		Object.keys(conceptQuestionsB).map((opt) => {
			return conceptQuestionsB[opt].isCorrect;
		}),
		Object.keys(conceptQuestionsC).map((opt) => {
			return conceptQuestionsC[opt].isCorrect;
		})
	);

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
			<p>Knowing what you know now, how does this change the answer you gave before?</p>
			<p>Before, you wrote:</p>

			<p className="display-6 mt-3 mb-4">{data.optional[0]}</p>
			<p>
				Now that you had time to think about it more, what else can you say about the jobs that might be impacted, or
				what challenges we should look for?
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
