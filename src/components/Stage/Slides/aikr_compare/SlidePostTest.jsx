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
import Alert from "react-bootstrap/Alert";
export default function SlidePostTest() {
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
				Before you were asked: For community issues what concepts are crucial for designing AI? You wrote the following:
			</p>
			<Alert key="secondary" variant="secondary">
				{data.optional[0]}
			</Alert>
			<section className="row mt-1">
				<div className="col-md-8">
					<OptionalText
						title={"Is there anything new that you would add to this?"}
						callback={checkOptional}
						currentValue={currentOptional}
					/>
				</div>
			</section>
		</>
	);
}
