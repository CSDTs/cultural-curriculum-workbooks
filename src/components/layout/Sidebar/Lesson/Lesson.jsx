import React from "react";

import { useSelector, useDispatch } from "react-redux";

import {
	goToPreviousLesson,
	goToNextLesson,
	setCurrentLessonData,
	setSaveDataId,
	updateSaveStatus,
	updateIsSavingStatus,
} from "/src/slices/workbookSlice.js";
import { serializeResponses } from "#utils/save";
import { triggerSaveUpdate, triggerNewSave } from "#utils/triggerSave";

import styles from "./Lesson.module.scss";

export default function Lesson(props) {
	const dispatch = useDispatch();
	const currentLesson = useSelector((state) => state.workbookState.workbook.current_lesson_id);
	const currentResponse = useSelector((state) => state.workbookState.data.responses)[props.lessonID];

	let isCurrentLesson = currentLesson == props.lessonID;

	const numOfLessons = useSelector((state) => state.workbookState.workbook.available_lessons).length;

	const workbookState = useSelector((state) => state.workbookState);
	const saveData = workbookState.data;
	const currentUser = workbookState.user;
	const saveStatus = useSelector((state) => state.workbookState.save_status);
	const isUserLoggedIn = useSelector((state) => state.workbookState.user.id) != null;

	const autoSaveStatus = window.localStorage.getItem("autoSave") === "true";
	const saveID = currentUser.save_id;

	const saveWorkbook = () => {
		dispatch(updateIsSavingStatus(true));

		const newSaveResponse = (response) => {
			dispatch(setSaveDataId(response.data.id));
			dispatch(updateSaveStatus(true));
			updateURL(response.data.id);
			dispatch(updateIsSavingStatus(false));
		};

		const updateSaveResponse = () => {
			dispatch(updateSaveStatus(true));
			dispatch(updateIsSavingStatus(false));
		};

		const newSaveData = serializeResponses(currentUser, saveData);
		if (!saveID) triggerNewSave(newSaveData, newSaveResponse);
		if (saveID) triggerSaveUpdate(saveID, newSaveData, updateSaveResponse);
	};

	const lessonSet = (lesson) => {
		console.log(props);
		if (autoSaveStatus && isUserLoggedIn && !saveStatus) saveWorkbook();

		dispatch(setCurrentLessonData(lesson));
	};

	return (
		<div className={styles.lesson} onClick={() => lessonSet(props)}>
			<p className={isCurrentLesson ? styles.active : styles.inactive}>
				{currentResponse ? <s>{props.title}</s> : <>{props.title}</>}
			</p>
		</div>
	);
}
