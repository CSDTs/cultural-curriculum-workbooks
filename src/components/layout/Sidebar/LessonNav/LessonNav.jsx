import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { goToPreviousLesson, goToNextLesson } from "/src/slices/workbookSlice.js";
import { Button } from "react-bootstrap";
import { serializeResponses } from "#utils/save";

import { triggerSaveUpdate, triggerNewSave } from "#utils/triggerSave";

import { setSaveDataId, updateSaveStatus, updateIsSavingStatus } from "#slices/workbookSlice";

export default function LessonNav() {
	const dispatch = useDispatch();
	const numOfLessons = useSelector((state) => state.workbookState.workbook.available_lessons).length;
	const currentLesson = useSelector((state) => state.workbookState.workbook.current_lesson_id);
	const workbookState = useSelector((state) => state.workbookState);
	const saveData = workbookState.data;
	const currentUser = workbookState.user;

	const saveID = currentUser.save_id;

	let endOfWorkbook = currentLesson == numOfLessons - 1;
	let startOfWorkbook = currentLesson == 0;

	const saveStatus = useSelector((state) => state.workbookState.save_status);
	const isUserLoggedIn = useSelector((state) => state.workbookState.user.id) != null;

	const autoSaveStatus = window.localStorage.getItem("autoSave") === "true";

	const nextLesson = () => {
		if (autoSaveStatus && isUserLoggedIn && !saveStatus) saveWorkbook();

		dispatch(goToNextLesson());
	};

	const previousLesson = () => {
		if (autoSaveStatus && isUserLoggedIn && !saveStatus) saveWorkbook();

		dispatch(goToPreviousLesson());
	};

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

	return (
		<div className="p-4 mt-auto d-inline-flex justify-content-between">
			<label className="col-4">
				Lesson <br />
				{currentLesson + 1} / {numOfLessons}
			</label>

			<span>
				<Button variant="primary" disabled={startOfWorkbook} onClick={() => previousLesson()} className="mx-2">
					Prev
				</Button>
				<Button variant="primary" disabled={endOfWorkbook} onClick={() => nextLesson()}>
					Next
				</Button>
			</span>
		</div>
	);
}
