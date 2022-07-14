import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	updateResponse,
	updateOptionalResponse,
	updateEarnedPoints,
	updateSaveStatus,
} from "/src/slices/workbookSlice.js";

import { STATIC_URL, CreateConceptCheck } from "./index";
import { Container, Row, Col } from "react-bootstrap";

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
				Studies by economists like Sylvain Leduc show that even when there are replacement jobs -- more people in
				“personal touch” industries like hosting or customer service--automation causes the percentage of profits going
				to labor to decline. This means more wealth inequality. As of October 2021, the richest 10% of the US own almost
				90% of the wealth.
			</p>
			<Container>
				<Row className="justify-content-md-center">
					<Col md="auto">
						<img src="./img/ai_labor/graph.png" />
					</Col>
				</Row>
			</Container>
			<p>
				Economists Derek Epp and Enrico Borghett found that wealth inequality tends to correlate with fewer programs for
				health care, unemployment, pension plans, workforce development, labour unions, and public housing. They suggest
				this is not by accident: “economic elites constrain the scope of decision-making by crowding out certain
				policies from the agendas of policymakers.” In other words, the rich get richer, not because that's how
				technology has to work, but only because we allow it to do that.
			</p>
		</React.Fragment>
	);
}
