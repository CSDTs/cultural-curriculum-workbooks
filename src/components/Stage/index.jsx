import React, { Suspense, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DOMPurify from "dompurify";

//Views for workbooks
import VerifyUser from "./VerifyUser/VerifyUser";
import Homepage from "./Homepage/Homepage";

import CSnap from "./CSnap/CSnap";
import SaveButtons from "./SaveButtons/SaveButtons";

import CurrentSavePrompt from "./CurrentSavePrompt/CurrentSavePrompt";
import AutoSavePrompt from "#components/UI/Prompt/AutoSavePrompt";

import styles from "./Stage.module.scss";

import WorkbookOptions from "#components/Core/WorkbookOptions";

//This is for any workbooks that have specialized functionality
function loadSlides(name) {
	const Component = React.lazy(() => import(`./Slides/${name}/index.jsx`));
	return Component;
}

function LoadSaveState() {
	const saveStatus = useSelector((state) => state.workbookState.save_status);
	const isUserLoggedIn = useSelector((state) => state.workbookState.user.id) == null;
	const lastSaved = useSelector((state) => state.workbookState.data.last_saved);
	return (
		<>
			{isUserLoggedIn ? (
				<strong key="test">
					<p className="mb-0 figure-caption">Login to save your work.</p>
				</strong>
			) : (
				<>
					{saveStatus ? (
						<p className="mb-0 figure-caption" key="test">
							{lastSaved}
						</p>
					) : (
						<strong key="test">
							<p className="mb-0 figure-caption">You have unsaved changes</p>
						</strong>
					)}
				</>
			)}
		</>
	);
}

export default function Stage() {
	const currentLesson = useSelector((state) => state.workbookState.workbook.current_lesson_id);
	const lesson = useSelector((state) => state.workbookState.workbook.current_lesson);
	const slug = useSelector((state) => state.workbookState.workbook.slug);
	const [autoSaveShow, setAutoSaveShow] = useState(true);
	let SlideComponent;
	if (lesson?.tags?.includes("slide")) SlideComponent = loadSlides(slug);

	const dispatch = useDispatch();

	const urlPath = `${import.meta.env.PROD ? "/static/workbooks/" : ""}${lesson?.project}`;

	let loadProjectXML = (urlPath) => {
		if (lesson?.tags?.includes("csnap")) {
			fetch(urlPath)
				.then((response) => response.text())
				.then((data) => {
					let iframe = document.querySelector("iframe");
					let world = iframe.contentWindow.world;

					if (world != undefined) {
						let ide = world.children[0];
						ide.loadWorkbookFile(data);
					} else {
						let checkForWorld = setInterval(function () {
							let iframe = document.querySelector("iframe");
							let world = iframe.contentWindow.world;
							let ide = world.children[0];
							if (ide != undefined) {
								ide.loadWorkbookFile(data);
								clearInterval(checkForWorld);
							}
						}, 1000);
					}
				})
				.catch((err) => {
					console.error(err);
				});
		}
	};

	React.useEffect(() => {
		if (lesson?.tags?.includes("csnap")) {
			loadProjectXML(urlPath);
		}
	}, [urlPath]);

	return (
		<section className="px-3 mt-3">
			<div className="row justify-content-between align-items-center">
				<div className="col-auto">
					<h4>{lesson.title}</h4>
					<LoadSaveState />
				</div>
				{/* <SaveButtons /> */}
				<WorkbookOptions />
				<CurrentSavePrompt />
				<AutoSavePrompt show={autoSaveShow} onHide={() => setAutoSaveShow(false)} />
			</div>

			<hr className={styles.headerDivide} />
			<p
				dangerouslySetInnerHTML={{
					__html: DOMPurify.sanitize(lesson.details),
				}}
			/>

			{lesson?.tags?.includes("csnap") && <CSnap />}

			{lesson?.tags?.includes("login") && <VerifyUser />}

			{lesson?.tags?.includes("homepage") && <Homepage />}

			{lesson?.tags?.includes("slide") && (
				<Suspense fallback={<div>Loading ... </div>}>
					<SlideComponent slideID={currentLesson} />
				</Suspense>
			)}
		</section>
	);
}
