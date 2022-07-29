import { useSelector, useDispatch } from "react-redux";
import {
	updateResponse,
	updateEarnedPoints,
	updateOptionalResponse,
	updateSaveStatus,
	setCurrentLessonData,
	setSaveDataId,
	updateIsSavingStatus,
} from "/src/slices/workbookSlice.js";
import { FaCheck } from "react-icons/fa";
import styles from "./TextResponse.module.scss";

import { serializeResponses } from "#utils/save";
import { triggerSaveUpdate, triggerNewSave } from "#utils/triggerSave";

import { useEffect, useState } from "react";
import { DebounceInput } from "react-debounce-input";
import LastSaved from "../../LastSaved";
export default function TextResponse({ title, placeholder, rows, isRequired, className }) {
	const dispatch = useDispatch();
	const [checkmark, setCheckmark] = useState(false);
	const [saveDate, setSaveDate] = useState(new Date());

	const data = useSelector((state) => state.workbookState.data);
	const index = useSelector((state) => state.workbookState.workbook.current_lesson_id);

	let currentResponse = data.responses[index] || "";
	let currentOptional = data.optional[index] || "";

	const workbookState = useSelector((state) => state.workbookState);
	const saveData = workbookState.data;
	const currentUser = workbookState.user;
	const saveStatus = useSelector((state) => state.workbookState.save_status);
	const isUserLoggedIn = useSelector((state) => state.workbookState.user.id) != null;
	const autoSaveStatus = window.localStorage.getItem("autoSave") === "true";
	const saveID = currentUser.save_id;

	const checkRequired = (event) => {
		event.preventDefault();
		setCheckmark(false);
		dispatch(updateResponse(event.target.value));
		dispatch(updateSaveStatus(false));
		dispatch(updateEarnedPoints());
	};

	const checkOptional = (event) => {
		event.preventDefault();
		setCheckmark(false);
		dispatch(updateOptionalResponse(event.target.value));
		dispatch(updateSaveStatus(false));
	};

	const saveWorkbook = () => {
		dispatch(updateIsSavingStatus(true));

		const newSaveResponse = (response) => {
			dispatch(setSaveDataId(response.data.id));
			dispatch(updateSaveStatus(true));
			updateURL(response.data.id);
			dispatch(updateIsSavingStatus(false));
			setCheckmark(true);
			setSaveDate(new Date());
		};

		const updateSaveResponse = () => {
			dispatch(updateSaveStatus(true));
			dispatch(updateIsSavingStatus(false));
			setCheckmark(true);
			setSaveDate(new Date());
		};

		const newSaveData = serializeResponses(currentUser, saveData);
		if (!saveID) triggerNewSave(newSaveData, newSaveResponse);
		if (saveID) triggerSaveUpdate(saveID, newSaveData, updateSaveResponse);
	};

	useEffect(() => {
		if (autoSaveStatus && isUserLoggedIn && !saveStatus) saveWorkbook();
	}, [currentResponse, currentOptional]);

	return (
		<section className={className}>
			<h4>
				{checkmark && (isRequired ? currentResponse : currentOptional) && <FaCheck className={styles.correct} />}{" "}
				{title}
			</h4>

			{/* {(isRequired ? currentResponse : currentOptional) && <FaCheck className={styles.correct} />} */}

			<DebounceInput
				placeholder={placeholder || "*optional"}
				className="form-control"
				element="textarea"
				minLength={2}
				rows={rows || 3}
				debounceTimeout={500}
				value={isRequired ? currentResponse : currentOptional}
				onChange={isRequired ? (event) => checkRequired(event) : (event) => checkOptional(event)}
			/>
			<LastSaved date={saveDate} />
		</section>
	);
}
