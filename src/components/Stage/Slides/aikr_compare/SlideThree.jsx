import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	updateResponse,
	updateOptionalResponse,
	updateEarnedPoints,
	updateSaveStatus,
} from "/src/slices/workbookSlice.js";

import { STATIC_URL, CreateConceptCheck } from "./index";

import styles from "./Slides.module.scss";

const conceptHints = {
	bias: "First one explainer text",
	small: "Second one explainer text",
	examples: "Third one explainer text",
};

export default function SlideThree() {
	const dispatch = useDispatch();

	const data = useSelector((state) => state.workbookState.data);
	const index = useSelector((state) => state.workbookState.workbook.current_lesson_id);

	let currentResponse = data.responses[index] || "";
	let currentOptional = data.optional[index] || "";

	const conceptQuestions = {
		license: {
			label: "An AI algorithm trained to read US license plates fails to read license plates from New Mexico.",
			isCorrect: true,
			hint: "bias could be.",
			afterthought:
				"Yes! This is an example of poor validation performance. We can not say if spurious correlation is the cause but perhaps more diverse data would help.",
		},
		speech: {
			label:
				"When listening to speech from people that stutter, a closed captioning AI maintains successful performance even though it had never seen that data before.",
			isCorrect: false,
			hint: "small could be.",
			afterthought: "No! This is an example of good validation performance and is not poor validation performance",
		},
		apples: {
			label:
				"An AI is 100 percent correct in classifying two species of apples that are very similar in appearance. The first apple was photographed on a light grey background and the second apple on a white background. ",
			isCorrect: true,
			hint: "examples could be.",
			afterthought:
				"Yes! This is an example of likely spurious correlation because the AI likely saw the biggest visual difference in the background color and not the apple itself.",
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

	React.useEffect(() => {
		Array.from(document.querySelectorAll("form input")).map((item, index) => {
			item.checked = currentResponse[index];
		});
	}, []);

	return (
		<React.Fragment>
			<p>
				With a fake and real dataset we can use AI to help tell the difference between each category. Sometimes AI will
				pick up on unexpected similarities within a category to tell the difference and it won’t work as well on real
				life examples. To validate an AI model we see how it does on examples it has never seen before. How it does can
				be measured by its “sureness” and whether it was right or not.
			</p>

			<section className="row mt-5">
				<div className="col-md-4">
					<h4>Validate your model</h4>

					<p>
						Provide an image it has never seen before, and test to find out if it classifies it correctly. Do that a few
						times with different target images, and you can gain more evidence that your AI app is a success.
					</p>

					<div className="row">
						<img src={`${STATIC_URL}validate_model.png`} className="img-fluid col-md-12" />
					</div>
				</div>
				<div className="col-md-4">
					<h4>Some examples</h4>

					<p>
						To help you understand the concept of validation please read through these short examples. They will help
						you successfully answer the concept check questions too.
					</p>

					<strong>
						<p className="text-white ">Good Validation Performance</p>
					</strong>

					<p>
						Oftentimes if you know why something happens you can anticipate it happening in the future. For example,
						imagine that after a lot of time outside you notice that clouds must form before rain can fall. Because
						you’ve successfully applied this rule to many outside environments over time the rule demonstrates good
						validation performance. Here you can be “sure” that the rule is right because it is often correct in the
						situations where it actually ended up raining!
					</p>
					<strong>
						<p className="text-white ">Poor Validation Performance</p>
					</strong>

					<p>
						There are many times when a rule can lead to poor validation performance. One possibility is when the rule
						was inspired by something called “spurious correlation.” A popular example is using AI to detect tanks. In
						this retelling an AI was trained to be quite successful at detecting tanks from photos. However, the AI
						catastrophically failed when it was validated against new data, an example of poor validation performance.
						In this case the algorithm was “sure” it was right even though the actual answer was different than what it
						expected.{" "}
						<a href="https://neil.fraser.name/writing/tank/">
							{" "}
							Read this brief article from Neil Fraser, a Google software engineer, to learn more.
						</a>
					</p>
				</div>
				<div className="col-md-4">
					<h4>Concept Check</h4>
					<p>
						From the list below, check examples that include poor validation performance or spurious correlation. Leave
						blank examples that include good validation performance.
					</p>

					<CreateConceptCheck data={conceptQuestions} currentAnswers={currentResponse} callback={checkConcepts} />
				</div>
			</section>
		</React.Fragment>
	);
}
