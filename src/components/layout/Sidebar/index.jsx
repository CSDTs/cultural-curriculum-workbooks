import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Accordion } from "react-bootstrap";

import LessonGroupProgress from "./LessonGroupProgress/LessonGroupProgress";
import Lesson from "./Lesson/Lesson";
import LessonNav from "./LessonNav/LessonNav";
import Response from "../../../features/Response/SideResponse/SideResponse";
import Progress from "#features/Progress";
import styles from "./Sidebar.module.scss";

export default function Sidebar() {
	const props = {
		title: useSelector((state) => state.workbookState.workbook.title),
		workbook: useSelector((state) => state.workbookState.workbook.available_sections),
		lessons: useSelector((state) => state.workbookState.workbook.available_lessons).length,
	};

	let currentLesson = useSelector((state) => state.workbookState.current_lesson);
	let lessonCount = 0;

	return (
		<nav className={`${styles.dataContainer} col-3 ${currentLesson?.tags?.includes("response") && "responseIncluded"}`}>
			<Progress />
			{props.workbook != [] && props.workbook != undefined && (
				<React.Fragment>
					<Accordion className={`p-2 ${styles.lessonGroupContainer}`} defaultActiveKey={`section-0`}>
						{props.workbook.map((lesson, index) => (
							<Accordion.Item eventKey={`section-${index}`} key={`section-${index}`} className={styles.accordionItem}>
								<Accordion.Header>
									<LessonGroupProgress completed="100" section={`section-${index}`} lessons={lesson.lessons.length} />
									{lesson.title}
								</Accordion.Header>
								<Accordion.Body id={`section-${index}`} className={"shadow"}>
									{lesson.lessons.map((item) => (
										<Lesson lessonID={lessonCount++} key={lessonCount} {...item} />
									))}
								</Accordion.Body>
							</Accordion.Item>
						))}
					</Accordion>

					{currentLesson?.tags?.includes("response") && <Response />}

					<LessonNav />
				</React.Fragment>
			)}
		</nav>
	);
}
