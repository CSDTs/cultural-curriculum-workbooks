import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { compareTwoStrings, findBestMatch } from "string-similarity";

import {
	updateMiscResponse,
	goToNextLesson,
	updateResponse,
	updateEarnedPoints,
	updateWorkbookFinished,
	updateSaveStatus,
	updateObjectResponse,
} from "../../../../slices/workbookSlice.js";

import { Form, Button, Breadcrumb, Alert } from "react-bootstrap";
import { FaQuestionCircle, FaCheck, FaExclamation } from "react-icons/fa";
import TextWriteUp from "./TextWriteUp";
import styles from "./Slides.module.scss";
import { notify, dismissNotification } from "reapop";
import { status, fetchedProps, commonProps } from "/src/utils/notificationProps";

import { STATIC_URL, createMoreInfo, CreateConceptCheck, CreateWriteUp, CreateWriteUpBasic } from "./index";
export default function SlideSeven() {
	const dispatch = useDispatch();
	const currentIndex = useSelector((state) => state.workbookState.workbook.current_lesson_id);
	const currentMisc = useSelector((state) => state.workbookState.data.responses)[currentIndex];
	const responses = useSelector((state) => state.workbookState.data.responses);
	const gData = useSelector((state) => state.workbookState.data);
	const isWorkbookFinished = useSelector((state) => state.workbookState.workbook.is_finished);
	// const currentIndex = useSelector((state) => state.workbookState.workbook.current_lesson_id);

	let currentResponse = responses[currentIndex];
	// console.log(useSelector((state) => state.workbookState.workbook.current_lesson));
	// dispatch(updateResponse([{}]));

	// var similarity = compareTwoStrings("healed", "sealed");

	// var matches = findBestMatch("healed", ["edward", "sealed", "theatre"]);

	// console.log(similarity);
	let [num, setNum] = useState(0);
	const [fireOnce, setFireOnce] = useState(true);
	const [isOpen, setIsOpen] = useState(false);

	const [problemPrompt, setProblemPrompt] = useState("");
	const [categoryAPrompt, setCategoryAPrompt] = useState("");
	const [categoryBPrompt, setCategoryBPrompt] = useState("");
	const [rationalePrompt, setRationalePrompt] = useState("");

	React.useEffect(() => {
		// console.log(compareTwoStrings(problemPrompt, categoryAPrompt));
	}, [problemPrompt, categoryAPrompt, categoryBPrompt, rationalePrompt]);

	let classificationGuidelines = {
		wordCount: 200,
	};

	let statementRevision = {
		slug: "statementRevision",
		statement: "",
		statementLength: 199,
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
		statementLength: 199,
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
		statementLength: 199,
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
		statementLength: 199,
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

	const checkForSimilarity = () => {
		let ab = compareTwoStrings(
			currentMisc?.statementRevision?.response || "",
			currentMisc?.categoryARevision?.response || ""
		);
		let ac = compareTwoStrings(
			currentMisc?.statementRevision?.response || "",
			currentMisc?.categoryBRevision?.response || ""
		);
		let ad = compareTwoStrings(
			currentMisc?.statementRevision?.response || "",
			currentMisc?.rationaleRevision?.response || ""
		);

		let bc = compareTwoStrings(
			currentMisc?.categoryARevision?.response || "",
			currentMisc?.categoryBRevision?.response || ""
		);
		let bd = compareTwoStrings(
			currentMisc?.categoryARevision?.response || "",
			currentMisc?.rationaleRevision?.response || ""
		);

		let cd = compareTwoStrings(
			currentMisc?.categoryBRevision?.response || "",
			currentMisc?.rationaleRevision?.response || ""
		);
		return !(ab >= 0.98 || ac >= 0.98 || ad >= 0.98 || bc >= 0.98 || bd >= 0.98 || cd >= 0.98);
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

			console.log(ab >= 0.98 || ac >= 0.98 || ad >= 0.98 || bc >= 0.98 || bd >= 0.98 || cd >= 0.98);
			console.log(ab, ac, ad, bc, bd, cd);
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

	let incNum = () => {
		if (num < 5) {
			setNum(Number(num) + 1);
		}
	};

	let show = {
		first: num == 0,
		second: statementRevision.verified && num == 1,
		third: statementRevision.verified && categoryARevision.verified && num == 2,
		fourth: statementRevision.verified && categoryARevision.verified && categoryBRevision.verified && num == 3,
		all: num == 4,
	};

	const RevisionGoals = (props) => {
		// console.log(props.set.keywords);

		return (
			<div className="col-md-3 align-self-center">
				<p>
					<strong>Revision Goals</strong>
				</p>

				<ol className={styles.revisionGoals}>
					<li>
						Rewrite to about <strong>{props.set.lengthGoal}</strong> {props.set.lessWords ? "fewer" : "more"} words
					</li>
					<li>
						Include the following keywords: <strong>{props.set.keywords.join(", ")}</strong>
					</li>
					<li>Put your own spin on it</li>
				</ol>
			</div>
		);
	};

	const checkForWriteUpComplete = (key) => {
		if (key == "all")
			return (
				(currentMisc?.statementRevision?.verified || false) &&
				(currentMisc?.categoryARevision?.verified || false) &&
				(currentMisc?.categoryBRevision?.verified || false) &&
				(currentMisc?.rationaleRevision?.verified || false)
			);

		return currentMisc?.[key]?.verified || false;
	};

	const checkForFinishedPrompt = () => {
		return (
			(currentMisc?.statementRevision?.verified || false) &&
			(currentMisc?.categoryARevision?.verified || false) &&
			(currentMisc?.categoryBRevision?.verified || false) &&
			(currentMisc?.rationaleRevision?.verified || false)
		);
	};

	const goToWriteUp = (num, key) => {
		if (checkForWriteUpComplete(key)) setNum(num);
	};

	const checkInitState = () => {
		if (!checkForWriteUpComplete("statementRevision")) {
			setNum(0);
			return "statementRevision";
		}
		if (!checkForWriteUpComplete("categoryARevision")) {
			setNum(1);
			return "categoryARevision";
		}
		if (!checkForWriteUpComplete("categoryBRevision")) {
			setNum(2);
			return "categoryBRevision";
		}
		if (!checkForWriteUpComplete("rationaleRevision")) {
			setNum(3);
			return "rationaleRevision";
		}

		setNum(4);
		return "all";
	};

	// React.useEffect(() => {
	// 	// console.log(gData);
	// 	if (!currentMisc) dispatch(updateResponse({}));
	// }, [currentMisc]);

	React.useEffect(() => {
		checkInitState();
	}, []);

	React.useEffect(() => {
		if (!isWorkbookFinished && num == 4) {
			dispatch(notify(`Congrats! You completed the workbook`, "success", commonProps));
			dispatch(updateWorkbookFinished(true));
		}
	}, [num]);

	return (
		<React.Fragment>
			<p>
				Great job! Finally, it is now your turn to write your very own AI application that helps solve a community
				problem! Instead of revising you'll be creating.
			</p>
			<p>
				Using what you've learned so far about deciding on a problem, turning it into a binary classification problem,
				validating an AI binary classification model and correlation, please fill in each box in order.{" "}
				<strong>Each box should be at least 200 words</strong>. When all boxes are filled in you can advance to the next
				screen.
			</p>

			<Alert key={"warning"} variant={"warning"} hidden={checkForSimilarity()}>
				There seems to be at least two prompts that are pretty similar. Please make sure to write unique responses for
				your AI application.
			</Alert>
			<section className="row mt-3 justify-content-center">
				<CreateWriteUpBasic
					title={"Problem Statement"}
					callback={spinCheck}
					next={incNum}
					data={statementRevision}
					current={currentMisc?.statementRevision?.response}
					show={show}
					rows={9}
				/>

				<CreateWriteUpBasic
					title={"Train AI on samples of this for first category"}
					callback={spinCheck}
					next={incNum}
					data={categoryARevision}
					show={show}
					rows={8}
				/>

				<CreateWriteUpBasic
					title={"Train AI on samples of this for second category"}
					callback={spinCheck}
					next={incNum}
					data={categoryBRevision}
					show={show}
					rows={8}
				/>

				<CreateWriteUpBasic
					title={"Rationale"}
					callback={spinCheck}
					next={incNum}
					data={rationaleRevision}
					show={show}
					rows={9}
				/>
			</section>

			<Button
				variant="primary"
				type="submit"
				className="mt-3 w-100"
				disabled={!(checkForFinishedPrompt() && checkForSimilarity())}>
				Next Lesson
			</Button>

			<p>Every box at least 200 words: {checkForFinishedPrompt().toString()}</p>
			<p>Every box at least somewhat different (98%): {checkForSimilarity().toString()}</p>
		</React.Fragment>
	);
}
