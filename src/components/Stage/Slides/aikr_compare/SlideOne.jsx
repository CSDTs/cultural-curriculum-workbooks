import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	updateResponse,
	updateOptionalResponse,
	updateEarnedPoints,
	updateSaveStatus,
} from "/src/slices/workbookSlice.js";

import { STATIC_URL } from "./index";

import OptionalText from "../../../Response/OptionalText";
import MoreInfoExamples from "../../../Response/MoreInfoExamples";
import ConceptCheck from "../../../Response/ConceptCheck";

import { slideOneExamples, slideOneConcepts } from "./data";

export default function SlideOne() {
	const dispatch = useDispatch();

	const data = useSelector((state) => state.workbookState.data);
	const index = useSelector((state) => state.workbookState.workbook.current_lesson_id);

	let currentResponse = data.responses[index] || "";
	let currentOptional = data.optional[index] || "";

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

	// Init concept check with current responses
	useEffect(() => {
		Array.from(document.querySelectorAll("form input")).map((item, index) => {
			item.checked = currentResponse[index];
		});
	}, []);

	return (
		<>
			<p>
				In order to use AI to help folks to keep it real, we have to train it to know the difference between real and
				fake. In AI, this is known as a classification problem, and they would say our case has two categories or
				"binary classification".
			</p>

			<p>
				Let's start learning about the first step: deciding on a problem. Deciding on a problem starts your
				classification journey that will end in making your own AI project.
			</p>

			<section className="row mt-5">
				<div className="col-md-4">
					<h4>Decide on a problem</h4>

					<p>
						Because we are looking at real vs fake, you want an example where that difference actually matters. We will
						train the AI to decide if a given image is in the "real" category or "fake" category.
					</p>

					<div className="row">
						<img src={`${STATIC_URL}real_grapes.png`} className="img-fluid col-md-6" />
						<img src={`${STATIC_URL}fake_grapes.png`} className="img-fluid col-md-6" />
					</div>
				</div>
				<div className="col-md-8">
					<MoreInfoExamples data={slideOneExamples} type={"basic"} />

					<OptionalText
						title={"Which problem would you work on and why?"}
						callback={checkOptional}
						currentValue={currentOptional}
					/>
				</div>
			</section>
		</>
	);
}
