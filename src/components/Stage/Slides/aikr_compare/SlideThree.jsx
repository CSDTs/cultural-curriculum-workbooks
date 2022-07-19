import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { updateResponse, updateEarnedPoints, updateSaveStatus } from "/src/slices/workbookSlice.js";

import { STATIC_URL } from "./index";

import ConceptCheck from "../../../Response/ConceptCheck";

import { slideThreeConcepts } from "./data";
import Accordion from "react-bootstrap/Accordion";
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
					<Accordion flush>
						<Accordion.Item eventKey="0">
							<Accordion.Header>Good Validation Performance</Accordion.Header>
							<Accordion.Body>
								Oftentimes if you know why something happens you can anticipate it happening in the future. For example,
								imagine that after a lot of time outside you notice that clouds must form before rain can fall. Because
								you've successfully applied this rule to many outside environments over time the rule demonstrates good
								validation performance. Here you can be “sure” that the rule is right because it is often correct in the
								situations where it actually ended up raining!
							</Accordion.Body>
						</Accordion.Item>
						<Accordion.Item eventKey="1">
							<Accordion.Header>Spurious correlation</Accordion.Header>
							<Accordion.Body>
								Detecting real or fake African kente cloth is a problem of great economic significance for the country
								of Ghana. This is because counterfeit kente cloth exists in large numbers and tourists often can not
								tell the difference. The government has tried RFID chips, badges of authentication and other approaches.
								In our own work we've designed an Kente authentication AI algorithm that learns from examples of real
								and fake cloth. Being aware of spurious correlation, we had to be sure to take carefully controlled
								photos of each kind of kente cloth. In fact, we took both sets of photos within the same hour so that
								differences sunlight and local atmospheric conditions would not introduce unrelated, or spurious,
								differences between real and fake kente cloth. This way the AI algorithm could focus on actual
								differences between the two kinds of kente cloth.
							</Accordion.Body>
						</Accordion.Item>
					</Accordion>
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
