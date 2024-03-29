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
		statementLength: 120,
		lengthGoal: 20,
		lessWords: true,
		keywords: ["West Africans", "malaria", "drugs"],
		verified: currentMisc?.statementRevision?.verified || false,
		response: currentMisc?.statementRevision?.response || "",
	};

	let categoryARevision = {
		slug: "categoryARevision",
		statement: "Real malaria drugs",
		statementLength: 15,
		lengthGoal: 20,
		lessWords: false,
		keywords: ["real", "malaria", "drugs"],
		verified: currentMisc?.categoryARevision?.verified || false,
		response: currentMisc?.categoryARevision?.response || "",
	};

	let categoryBRevision = {
		slug: "categoryBRevision",
		statement: "Fake malaria drugs",
		statementLength: 15,
		lengthGoal: 20,
		lessWords: false,
		keywords: ["fake", "malaria", "drugs"],
		verified: currentMisc?.categoryBRevision?.verified || false,
		response: currentMisc?.categoryBRevision?.response || "",
	};
	let rationaleRevision = {
		slug: "rationaleRevision",
		statement: "Small difference between fake and real malaria drugs",
		statementLength: 120,
		lengthGoal: 20,
		lessWords: false,
		keywords: ["fake", "malaria", "drugs", "environment"],
		verified: currentMisc?.rationaleRevision?.verified || false,
		response: currentMisc?.rationaleRevision?.response || "",
	};

	const spinCheck = (a, revisionSet) => {
		let sameCheck = a != revisionSet.statement;

		let lengthMode = revisionSet.lessWords
			? a.length < revisionSet.statementLength
			: a.length > revisionSet.statementLength;
		let lengthCheck = a.length != 0 && lengthMode;
		let keywordCheck = revisionSet.keywords.reduce((result, current) => {
			return result && a.includes(current);
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
						Rewrite to about <strong>{props.set.lengthGoal}</strong> {props.set.lessWords ? "fewer" : "more"} letters
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
			<p>
				Great job! Now that we helped Joe let's use our new AI superpowers to help others. We'll help others by writing
				about how AI applications can solve problems in other communities.
			</p>
			<p>
				Since this is likely your first time doing this we'll help you along by asking you to revise a complete example.
				Then you'll get a chance to write your own!
			</p>

			<div className="d-inline-flex w-100">
				<Breadcrumb className="mx-auto">
					<Breadcrumb.Item
						className={num >= 0 || isWorkbookFinished ? styles.active : styles.disabled}
						onClick={() => goToWriteUp(0, "statementRevision")}>
						Problem
					</Breadcrumb.Item>
					<Breadcrumb.Item
						className={num >= 1 || isWorkbookFinished ? styles.active : styles.disabled}
						onClick={() => goToWriteUp(1, "categoryARevision")}>
						Category A
					</Breadcrumb.Item>
					<Breadcrumb.Item
						className={num >= 2 || isWorkbookFinished ? styles.active : styles.disabled}
						onClick={() => goToWriteUp(2, "categoryBRevision")}>
						Category B
					</Breadcrumb.Item>
					<Breadcrumb.Item
						className={num >= 3 || isWorkbookFinished ? styles.active : styles.disabled}
						onClick={() => goToWriteUp(3, "rationaleRevision")}>
						Rationale
					</Breadcrumb.Item>
					<Breadcrumb.Item
						className={num >= 4 || isWorkbookFinished ? styles.active : styles.disabled}
						onClick={() => goToWriteUp(4, "all")}>
						Summary
					</Breadcrumb.Item>
				</Breadcrumb>
			</div>

			<section className="row mt-3 justify-content-center">
				{(show.first || show.all) && (
					<>
						<CreateWriteUp
							title={"Problem Statement"}
							callback={spinCheck}
							next={incNum}
							data={statementRevision}
							current={currentMisc?.statementRevision?.response}
							show={show}
							rows={8}
						/>

						{!show.all && <RevisionGoals set={statementRevision} />}
					</>
				)}

				{(show.second || show.all) && (
					<>
						<CreateWriteUp
							title={"Train AI on samples of this for first category"}
							callback={spinCheck}
							next={incNum}
							data={categoryARevision}
							show={show}
							rows={8}
						/>

						{!show.all && <RevisionGoals set={categoryARevision} />}
					</>
				)}
				{(show.third || show.all) && (
					<>
						<CreateWriteUp
							title={"Train AI on samples of this for second category"}
							callback={spinCheck}
							next={incNum}
							data={categoryBRevision}
							show={show}
							rows={8}
						/>
						{!show.all && <RevisionGoals set={categoryBRevision} />}
					</>
				)}
				{(show.fourth || show.all) && (
					<>
						<CreateWriteUp
							title={"Rationale"}
							callback={spinCheck}
							next={incNum}
							data={rationaleRevision}
							show={show}
							rows={8}
						/>

						{!show.all && <RevisionGoals set={rationaleRevision} />}
					</>
				)}
			</section>
		</React.Fragment>
	);
}
