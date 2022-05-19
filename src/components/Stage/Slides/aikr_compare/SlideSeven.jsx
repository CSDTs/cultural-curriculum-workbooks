import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { updateMiscResponse, goToNextLesson } from "../../../../slices/workbookSlice.js";
import { Form, Button } from "react-bootstrap";
import { FaQuestionCircle, FaCheck, FaExclamation } from "react-icons/fa";
import TextWriteUp from "./TextWriteUp";
import styles from "./Slides.module.scss";
import { notify, dismissNotification } from "reapop";
import { status, fetchedProps, loadProps } from "../../../../utils/notificationProps";

export default function SlideSeven() {
	const dispatch = useDispatch();

	const currentMisc = useSelector((state) => state.workbookState.data.misc);

	let [num, setNum] = useState(0);
	const [isOpen, setIsOpen] = useState(false);
	let statementRevision = {
		slug: "statementRevision",
		statement:
			"Fake medicine is a worldwide problem. West Africans are often sold fake medicine, fake anti-malaria drugs alone kill an estimated 250,00 per year.",
		statementLength: 120,
		lengthGoal: 20,
		lessWords: true,
		keywords: ["West Africans", "malaria", "drugs"],
		verified: currentMisc.statementRevision?.verified || false,
		response: currentMisc.statementRevision?.response || "",
	};

	let categoryARevision = {
		slug: "categoryARevision",
		statement: "Real malaria drugs",
		statementLength: 15,
		lengthGoal: 20,
		lessWords: false,
		keywords: ["real", "malaria", "drugs"],
		verified: currentMisc.categoryARevision?.verified || false,
		response: currentMisc.categoryARevision?.response || "",
	};

	let categoryBRevision = {
		slug: "categoryBRevision",
		statement: "Fake malaria drugs",
		statementLength: 15,
		lengthGoal: 20,
		lessWords: false,
		keywords: ["fake", "malaria", "drugs"],
		verified: currentMisc.categoryBRevision?.verified || false,
		response: currentMisc.categoryBRevision?.response || "",
	};
	let rationaleRevision = {
		slug: "rationaleRevision",
		statement: "Small difference between fake and real malaria drugs",
		statementLength: 120,
		lengthGoal: 20,
		lessWords: false,
		keywords: ["fake", "malaria", "drugs", "environment"],
		verified: currentMisc.rationaleRevision?.verified || false,
		response: currentMisc.rationaleRevision?.response || "",
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

		console.log(revisionSet);
		dispatch(
			updateMiscResponse({
				[revisionSet.slug]: {
					response: a,
					verified: sameCheck && lengthCheck && keywordCheck,
				},
			})
		);
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
		console.log(props.set.keywords);

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

	React.useEffect(() => {
		// document.querySelector("textarea").value =
		// 	currentMisc.problemResponse && currentMisc.problemResponse != ""
		// 		? currentMisc.problemResponse
		// 		: statementRevision.statement;
	}, []);

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

			{/* <button className={styles.primaryBtn} onClick={() => setIsOpen(true)}>
				Open Modal
			</button>
			{isOpen && <TextWriteUp setIsOpen={setIsOpen} />} */}

			<section className="row mt-3 justify-content-center">
				{(show.first || show.all) && (
					<>
						<div className="col-md-3 align-self-center">
							<p>
								<strong>Problem Statement</strong>
							</p>
							<textarea
								className="form-control"
								rows="8"
								onChange={(e) => {
									spinCheck(e.target.value, statementRevision);
								}}
								defaultValue={statementRevision.statement}
								placeholder={statementRevision.statement}
							/>
							{!show.all && (
								<Button
									variant="primary"
									type="submit"
									className="mt-3 w-100"
									onClick={() => incNum()}
									disabled={!statementRevision.verified}>
									Advance
								</Button>
							)}
							<p>Does it pass the vibe check? {`${statementRevision.verified}`}</p>
						</div>

						{!show.all && <RevisionGoals set={statementRevision} />}
					</>
				)}

				{(show.second || show.all) && (
					<>
						<div className="col-md-3 align-self-center">
							<p>
								<strong>Train AI on samples of this for first category</strong>
							</p>
							<textarea
								className="form-control"
								rows="4"
								onChange={(e) => {
									spinCheck(e.target.value, categoryARevision);
								}}
								defaultValue={categoryARevision.statement}
								placeholder={categoryARevision.statement}
							/>
							{!show.all && (
								<Button
									variant="primary"
									type="submit"
									className="mt-3 w-100"
									onClick={() => incNum()}
									disabled={!categoryARevision.verified}>
									Advance
								</Button>
							)}
							<p>Does it pass the vibe check? {`${categoryARevision.verified}`}</p>
						</div>
						{!show.all && <RevisionGoals set={categoryARevision} />}
					</>
				)}
				{(show.third || show.all) && (
					<>
						<div className="col-md-3">
							<p>
								<strong>Train AI on samples of this for second category</strong>
							</p>
							<textarea
								className="form-control"
								rows="7"
								onChange={(e) => {
									spinCheck(e.target.value, categoryBRevision);
								}}
								defaultValue={categoryBRevision.statement}
								placeholder={categoryBRevision.statement}
							/>
							{!show.all && (
								<Button
									variant="primary"
									type="submit"
									className="mt-3 w-100"
									onClick={() => incNum()}
									disabled={!categoryBRevision.verified}>
									Advance
								</Button>
							)}
							<p>Does it pass the vibe check? {`${categoryBRevision.verified}`}</p>
						</div>
						{!show.all && <RevisionGoals set={categoryBRevision} />}
					</>
				)}
				{(show.fourth || show.all) && (
					<>
						<div className="col-md-3 align-self-center">
							<p>
								<strong>Rationale</strong>
							</p>
							<textarea
								className="form-control"
								rows="7"
								onChange={(e) => {
									spinCheck(e.target.value, rationaleRevision);
								}}
								defaultValue={rationaleRevision.statement}
								placeholder={rationaleRevision.statement}
							/>
							{!show.all && (
								<Button
									variant="primary"
									type="submit"
									className="mt-3 w-100"
									onClick={() => {
										incNum();
										dispatch(notify(`Congrats! You have completed the workbook`, "success", fetchedProps));
									}}
									disabled={!rationaleRevision.verified}>
									Advance
								</Button>
							)}
							<p>Does it pass the vibe check? {`${rationaleRevision.verified}`}</p>
						</div>

						{!show.all && <RevisionGoals set={rationaleRevision} />}
					</>
				)}
			</section>
		</React.Fragment>
	);
}
