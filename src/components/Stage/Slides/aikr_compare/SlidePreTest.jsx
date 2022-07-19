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

export default function SlidePreTest() {
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
				Because we are looking at real vs fake, you want an example where that difference actually matters. We will
				train the AI to decide if a given image is in the "real" category or "fake" category.
			</p>

			<section className="row mt-1">
				<div className="col-md-8">
					<OptionalText
						title={"For community issues what concepts do you think are crucial for designing AI?"}
						callback={checkOptional}
						currentValue={currentOptional}
					/>
				</div>
			</section>
		</>
	);
}
