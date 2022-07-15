import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { updateResponse, updateEarnedPoints, updateSaveStatus } from "/src/slices/workbookSlice.js";

import { STATIC_URL } from "./index";

import ConceptCheck from "../../../Response/ConceptCheck";

import { slideThreeConcepts } from "./data";

export default function SlideThree() {
	const dispatch = useDispatch();

	const data = useSelector((state) => state.workbookState.data);
	const index = useSelector((state) => state.workbookState.workbook.current_lesson_id);

	let currentResponse = data.responses[index] || "";

	const checkConcepts = (event) => {
		event.preventDefault();
		let userResponses = Array.from(document.querySelectorAll("form input")).map((item) => {
			return item.checked;
		});
		dispatch(updateResponse(userResponses));
		dispatch(updateEarnedPoints());
		dispatch(updateSaveStatus(false));
	};

	// Init concept check with current responses
	useEffect(() => {
		Array.from(document.querySelectorAll("form input")).map((item, index) => {
			item.checked = currentResponse[index];
		});
	}, []);

	return (
		<>
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
					<ConceptCheck
						description={
							"From the list below, check examples that include poor validation performance or spurious correlation. Leave" +
							"blank examples that include good validation performance."
						}
						data={slideThreeConcepts}
						currentAnswers={currentResponse}
						callback={checkConcepts}
					/>
				</div>
			</section>
		</>
	);
}
