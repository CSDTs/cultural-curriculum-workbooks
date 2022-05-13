import React from "react";

import ProgressHeader from "./ProgressHeader/ProgressHeader";
import Lesson from "./Lesson/Lesson";
import { useSelector, useDispatch } from "react-redux";
import { Accordion } from "react-bootstrap";
import LessonNav from "./LessonNav/LessonNav";
import Response from "./Response/Response";
import LessonGroupProgress from "./LessonGroupProgress/LessonGroupProgress";
import styles from "./Sidebar.module.scss";

export default function Sidebar() {
	const props = {
		title: useSelector((state) => state.counter.title),
		workbook: useSelector((state) => state.counter.workbook),
		lessons: useSelector((state) => state.counter.lessons),
	};
	const currentLessonIndex = useSelector((state) => state.counter.value);

	let currentLesson = useSelector((state) => state.counter.all_lessons)[currentLessonIndex];
	let lessonCount = 0;

	return (
		<nav className={`${styles.dataContainer} col-3`}>
			<ProgressHeader {...props} />

			{props.workbook != [] && props.workbook != undefined && (
				<React.Fragment>
					<Accordion className={`p-2 ${styles.lessonGroupContainer}`}>
						{props.workbook.map((lesson, index) => (
							<Accordion.Item eventKey={`section-${index}`} key={`section-${index}`} className={styles.accordionItem}>
								<Accordion.Header>
									<LessonGroupProgress completed="100" section={`section-${index}`} />
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
