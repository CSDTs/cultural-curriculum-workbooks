import React from "react";
import ProgressBar from "./ProgressBar";
import ProgressHeader from "./ProgressHeader";
import Lesson from "./Lesson";
import { useSelector, useDispatch } from "react-redux";
import { Accordion } from "react-bootstrap";
import LessonNav from "./LessonNav";
import Response from "./Response";
import LessonGroupProgress from "./LessonGroupProgress";
import styles from "./Sidebar.module.css";
function Sidebar() {
	const props = {
		title: useSelector((state) => state.counter.title),
		workbook: useSelector((state) => state.counter.workbook),
		lessons: useSelector((state) => state.counter.lessons),
	};
	const CURRENT_LESSON = useSelector((state) => state.counter.value);
	const ALL_LESSONS = useSelector((state) => state.counter.all_lessons);

	let current = ALL_LESSONS[CURRENT_LESSON];

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

					{current?.tags?.includes("response") && <Response />}

					<LessonNav />
				</React.Fragment>
			)}
		</nav>
	);
}
export default Sidebar;
