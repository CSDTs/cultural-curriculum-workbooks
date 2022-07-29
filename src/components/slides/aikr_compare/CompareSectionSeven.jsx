import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { compareTwoStrings } from "string-similarity";

import { updateEarnedPoints, updateSaveStatus, updateObjectResponse } from "#slices/workbookSlice.js";

import { Form, Alert } from "react-bootstrap";

import { CreateWriteUpBasic } from "./index";
import { prompts } from "./data";
export default function CompareSectionSeven() {
	const dispatch = useDispatch();
	const currentIndex = useSelector((state) => state.workbookState.workbook.current_lesson_id);
	const currentMisc = useSelector((state) => state.workbookState.data.responses)[currentIndex];

	const [prompt, setPrompt] = useState("");

	let statementRevision = {
		slug: "statementRevision",
		statement: "",
		statementLength: 1,
		lengthGoal: 3,
		lessWords: true,
		keywords: ["West Africans", "malaria", "drugs"],
		verified: currentMisc?.statementRevision?.verified || false,
		response: currentMisc?.statementRevision?.response || "",
		promptCheck: false,
	};

	let categoryARevision = {
		slug: "categoryARevision",
		statement: "",
		statementLength: 1,
		lengthGoal: 4,
		lessWords: false,
		keywords: ["real", "malaria", "drugs"],
		verified: currentMisc?.categoryARevision?.verified || false,
		response: currentMisc?.categoryARevision?.response || "",
		promptCheck: false,
	};

	let categoryBRevision = {
		slug: "categoryBRevision",
		statement: "",
		statementLength: 1,
		lengthGoal: 5,
		lessWords: false,
		keywords: ["fake", "malaria", "drugs"],
		verified: currentMisc?.categoryBRevision?.verified || false,
		response: currentMisc?.categoryBRevision?.response || "",
		promptCheck: false,
	};
	let rationaleRevision = {
		slug: "rationaleRevision",
		statement: "",
		statementLength: 1,
		lengthGoal: 5,
		lessWords: false,
		keywords: ["fake", "malaria", "drugs", "environment"],
		verified: currentMisc?.rationaleRevision?.verified || false,
		response: currentMisc?.rationaleRevision?.response || "",
		promptCheck: false,
	};
	const wordCount = (str) => {
		return str.split(" ").length;
	};

	let ab,
		ac,
		ad,
		bc,
		bd,
		cd = 0;

	const spinCheck = (a, revisionSet) => {
		// let sameCheck = a != revisionSet.statement;
		let lengthCheck = wordCount(a) > revisionSet.statementLength;

		let textPrompts = document.querySelectorAll("textarea");

		if (textPrompts) {
			ab = compareTwoStrings(textPrompts[0].value, textPrompts[1].value);
			ac = compareTwoStrings(textPrompts[0].value, textPrompts[2].value);
			ad = compareTwoStrings(textPrompts[0].value, textPrompts[3].value);

			bc = compareTwoStrings(textPrompts[1].value, textPrompts[2].value);
			bd = compareTwoStrings(textPrompts[1].value, textPrompts[3].value);

			cd = compareTwoStrings(textPrompts[2].value, textPrompts[3].value);

			// console.log(ab >= 0.98 || ac >= 0.98 || ad >= 0.98 || bc >= 0.98 || bd >= 0.98 || cd >= 0.98);
			// console.log(ab, ac, ad, bc, bd, cd);
			revisionSet.promptCheck = lengthCheck;
		}

		let currentSpin = {
			[revisionSet.slug]: {
				response: a,
				verified: lengthCheck,
			},
		};

		dispatch(updateObjectResponse(currentSpin));
		dispatch(updateEarnedPoints());
		dispatch(updateSaveStatus(false));
	};

	const handleOnChange = (e) => {
		if (e != "") setPrompt(prompts[e].prompt);
		else setPrompt("");
	};

	return (
		<>
			<p>
				Finally, it is now your turn to write your very own AI application that helps solve a community problem! Instead
				of revising you'll be creating.
			</p>
			<p>
				Using what you've learned so far about deciding on a problem, turning it into a binary classification problem,
				validating an AI binary classification model and correlation, please fill in each box in order. When all boxes
				are filled in you can advance to the next screen.
			</p>
			<Form>
				<fieldset>
					<Form.Group className="mb-3">
						<Form.Label htmlFor="disabledSelect">Select a scenario: </Form.Label>
						<Form.Select id="disabledSelect" onChange={(e) => handleOnChange(e.target.value)}>
							<option value="">Choose...</option>
							<option value="kente">Kente Cloth</option>
							<option value="malaria">Malaria</option>
							<option value="water">Flint Water Crisis</option>
							<option value="web">Artisan Crafters</option>
						</Form.Select>
						<Alert key={"info"} variant={"info"} hidden={prompt === ""}>
							{prompt}
						</Alert>
						<p></p>
					</Form.Group>
				</fieldset>
			</Form>

			<section className="row mt-3 justify-content-center">
				<CreateWriteUpBasic
					title={"Problem Statement"}
					callback={spinCheck}
					data={statementRevision}
					current={currentMisc?.statementRevision?.response}
					rows={9}
				/>

				<CreateWriteUpBasic
					title={"Train AI on samples of this for first category"}
					callback={spinCheck}
					data={categoryARevision}
					rows={8}
				/>

				<CreateWriteUpBasic
					title={"Train AI on samples of this for second category"}
					callback={spinCheck}
					data={categoryBRevision}
					rows={8}
				/>

				<CreateWriteUpBasic title={"Rationale"} callback={spinCheck} data={rationaleRevision} rows={9} />
			</section>
		</>
	);
}
