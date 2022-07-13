import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	updateMiscResponse,
	goToNextLesson,
	updateResponse,
	updateEarnedPoints,
	updateWorkbookFinished,
	updateSaveStatus,
	updateObjectResponse,
} from "../../../../slices/workbookSlice.js";

import { Form, Button, Breadcrumb } from "react-bootstrap";
import { FaQuestionCircle, FaCheck, FaExclamation } from "react-icons/fa";
import TextWriteUp from "./TextWriteUp";
import styles from "./Slides.module.scss";
import { notify, dismissNotification } from "reapop";
import { status, fetchedProps, commonProps } from "/src/utils/notificationProps";

import { STATIC_URL, createMoreInfo, CreateConceptCheck, CreateWriteUp } from "./index";
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

	let [num, setNum] = useState(0);
	const [fireOnce, setFireOnce] = useState(true);
	const [isOpen, setIsOpen] = useState(false);
	let statementRevision = {
		slug: "statementRevision",
		statement:
			"Fake medicine is a worldwide problem. West Africans are often sold fake medicine, fake anti-malaria drugs alone kill an estimated 250,00 per year.",
		statementLength: 21,
		lengthGoal: 3,
		lessWords: true,
		keywords: ["West Africans", "malaria", "drugs"],
		verified: currentMisc?.statementRevision?.verified || false,
		response: currentMisc?.statementRevision?.response || "",
	};

	let categoryARevision = {
		slug: "categoryARevision",
		statement: "Real malaria drugs",
		statementLength: 7,
		lengthGoal: 4,
		lessWords: false,
		keywords: ["real", "malaria", "drugs"],
		verified: currentMisc?.categoryARevision?.verified || false,
		response: currentMisc?.categoryARevision?.response || "",
	};

	let categoryBRevision = {
		slug: "categoryBRevision",
		statement: "Fake malaria drugs",
		statementLength: 8,
		lengthGoal: 5,
		lessWords: false,
		keywords: ["fake", "malaria", "drugs"],
		verified: currentMisc?.categoryBRevision?.verified || false,
		response: currentMisc?.categoryBRevision?.response || "",
	};
	let rationaleRevision = {
		slug: "rationaleRevision",
		statement: "Small difference between fake and real malaria drugs",
		statementLength: 13,
		lengthGoal: 5,
		lessWords: false,
		keywords: ["fake", "malaria", "drugs", "environment"],
		verified: currentMisc?.rationaleRevision?.verified || false,
		response: currentMisc?.rationaleRevision?.response || "",
	};
	const wordCount = (str) => {
		return str.split(" ").length;
	};
	const spinCheck = (a, revisionSet) => {
		let sameCheck = a != revisionSet.statement;

		let lengthMode = revisionSet.lessWords
			? wordCount(a) < revisionSet.statementLength
			: wordCount(a) > revisionSet.statementLength;
		let lengthCheck = a.length != 0 && lengthMode && wordCount(a) != 0;

		let statementAdjust = a.toLowerCase();
		let keywordCheck = revisionSet.keywords.reduce((result, current) => {
			return result && (a.includes(current) || statementAdjust.includes(current));
		}, true);

		let currentSpin = {
			[revisionSet.slug]: {
				response: a,
				verified: sameCheck && lengthCheck && keywordCheck,
			},
		};

		// Object.assign(temp, currentSpin);
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
			<p>Great job! If you want to learn more, this time by doing, you can explore the Joe's Lunch AI app here</p>
		</React.Fragment>
	);
}
