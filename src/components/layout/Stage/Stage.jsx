import React, { Suspense, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DOMPurify from "dompurify";

//Views for workbooks
import VerifyUser from "#features/Response/VerifyUser";
import Homepage from "../../misc/Homepage/Homepage";

import CSnap from "#features/CSnap";

import styles from "./Stage.module.scss";
import SaveStatus from "#features/SaveStatus";
import WorkbookOptions from "#features/WorkbookOptions";

//This is for any workbooks that have specialized functionality
function loadSlides(name) {
	const Component = React.lazy(() => import(`../../slides/${name}/index.jsx`));
	return Component;
}

export default function Stage() {
	const currentLesson = useSelector((state) => state.workbookState.workbook.current_lesson_id);
	const lesson = useSelector((state) => state.workbookState.workbook.current_lesson);
	const slug = useSelector((state) => state.workbookState.workbook.slug);
	const [autoSaveShow, setAutoSaveShow] = useState(true);
	let SlideComponent;
	if (lesson?.tags?.includes("slide")) SlideComponent = loadSlides(slug);

	const dispatch = useDispatch();

	return (
		<section className="px-3 mt-3">
			<div className="row justify-content-between align-items-center">
				<div className="col-auto">
					<h4>{lesson.title}</h4>
					{window.localStorage.getItem("autoSave") !== "true" && <SaveStatus />}
				</div>

				<WorkbookOptions />
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
