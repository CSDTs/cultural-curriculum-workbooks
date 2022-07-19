import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateResponse, updateEarnedPoints, updateSaveStatus } from "/src/slices/workbookSlice.js";
import { Button } from "react-bootstrap";
import { isEqual } from "./index";
import ConceptCheckMulti from "../../../Response/ConceptCheckMulti";
import { slideFourConceptsA, slideFourConceptsB, slideFourConceptsC } from "./data";
import styles from "./Slides.module.scss";

export default function SlideFour() {
	const dispatch = useDispatch();

	const data = useSelector((state) => state.workbookState.data);
	const index = useSelector((state) => state.workbookState.workbook.current_lesson_id);

	let currentResponse = data.responses[index] || "";

	const allCorrectAnswers = new Array().concat(
		Object.keys(slideFourConceptsA).map((opt) => {
			return slideFourConceptsA[opt].isCorrect;
		}),
		Object.keys(slideFourConceptsB).map((opt) => {
			return slideFourConceptsB[opt].isCorrect;
		}),
		Object.keys(slideFourConceptsC).map((opt) => {
			return slideFourConceptsC[opt].isCorrect;
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

	// Init concept check with current responses
	useEffect(() => {
		Array.from(document.querySelectorAll("form input")).map((item, index) => {
			item.checked = currentResponse[index];
		});
	}, []);

	return (
		<>
			<p>
				Before we continue let's double check your understanding so far. You can go back, re-read and click for more
				detail while answering these questions.
			</p>

			<section className="row mt-5 justify-content-center">
				{/* <div className="col-md-4">
					<ConceptCheckMulti
						title="Problem Concept Check"
						description="Which kinds of problems can be treated as classification problems? A classification problem can have two or
						more categories of outcomes. Please check all that apply."
						data={slideFourConceptsA}
						currentAnswers={currentResponse}
						offset={0}
					/>
				</div> */}
				<div className="col-md-5">
					<ConceptCheckMulti
						title="2 Category Concept Check"
						description="From the list below check binary classification problems. Leave blank problems that are not described as
						binary classification problems."
						data={slideFourConceptsB}
						currentAnswers={currentResponse}
						offset={0}
					/>
				</div>
				<div className="col-md-5">
					<ConceptCheckMulti
						title="Validation Concept Check"
						description="From the list below, check examples that include poor validation performance or spurious correlation. Leave
						blank examples that include good validation performance."
						data={slideFourConceptsC}
						currentAnswers={currentResponse}
						offset={3}
					/>
				</div>
			</section>

			<div className="row justify-content-center mt-4">
				<div className="col-md-4 ">
					<Button
						variant="primary"
						type="button"
						onClick={checkConcepts}
						className="w-100"
						disabled={isEqual(allCorrectAnswers, currentResponse)}>
						Check your answers
					</Button>
					{currentResponse && isEqual(allCorrectAnswers, currentResponse) && (
						<div className={`mt-3 p-3 ${styles.conceptFeedback}`}>
							<p>
								<strong>Congrats! Now you can move on to the next section!</strong>
							</p>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
