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

import { slideTwoExamples, slideTwoConcepts } from "./data";

export default function SlideTwo() {
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
					<MoreInfoExamples title={"Some examples of real vs fake"} data={slideTwoExamples} type={"images"} />

					<OptionalText
						title={"Using a problem from the last screen please list, real and fake categories:"}
						callback={checkOptional}
						currentValue={currentOptional}
					/>
				</div>
				<div className="col-md-4">
					<ConceptCheck
						description={
							"From the list below check binary classification problems. Leave blank problems that are not described as" +
							"binary classification problems. "
						}
						data={slideTwoConcepts}
						currentAnswers={currentResponse}
						callback={checkConcepts}
					/>
				</div>
			</section>
		</>
	);
}
