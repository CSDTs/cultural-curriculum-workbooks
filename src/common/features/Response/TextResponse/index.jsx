import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import styles from "./TextResponse.module.scss";
import {
	setSaveDataId,
	updateEarnedPoints,
	updateIsSavingStatus,
	updateOptionalResponse,
	updateResponse,
	updateSaveStatus,
} from "/src/setup/slices/workbookSlice.js";

import { serializeResponses } from "/src/common/utils/save";
import { triggerSave } from "/src/common/utils/triggerSave";

import { Textarea } from "@chakra-ui/react";
import { DebounceInput } from "react-debounce-input";

export default function TextResponse({ title, placeholder, rows, isRequired, className }) {
	const dispatch = useDispatch();
	const [checkmark, setCheckmark] = useState(false);
	const [saveDate, setSaveDate] = useState(new Date());
	const [userChanges, setUserChanges] = useState(false);

	const data = useSelector((state) => state.workbookState.data);
	const index = useSelector((state) => state.workbookState.workbook.current_lesson_id);

	let currentResponse = data.responses[index] || "";
	let currentOptional = data.optional[index] || "";

	const workbookState = useSelector((state) => state.workbookState);
	const currentUser = workbookState.user;
	const saveData = workbookState.data;
	const saveID = currentUser.save_id;
	const saveStatus = useSelector((state) => state.workbookState.save_status);
	const isUserLoggedIn = useSelector((state) => state.workbookState.user.id) != null;
	const autoSaveStatus = window.localStorage.getItem("autoSave") === "true";

	const checkRequired = (event) => {
		event.preventDefault();
		setCheckmark(false);
		dispatch(
			updateResponse({
				question: title,
				response: event.target.value,
			})
		);
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
			setUserChanges(false);
		};

		const updateSaveResponse = () => {
			dispatch(updateSaveStatus(true));
			dispatch(updateIsSavingStatus(false));
			setCheckmark(true);
			setSaveDate(new Date());
			setUserChanges(false);
		};

		const newSaveData = serializeResponses(currentUser, saveData);
		triggerSave(newSaveData, saveID ? updateSaveResponse : newSaveResponse, saveID);
	};

	useEffect(() => {
		if (autoSaveStatus && isUserLoggedIn && !saveStatus) saveWorkbook();
		setUserChanges(true);
	}, [currentResponse, currentOptional]);

	return (
		<section className={className}>
			<h4 className={styles.heading}>
				{title}
				{checkmark && (isRequired ? currentResponse : currentOptional) && <FaCheck className={styles.correct} />}{" "}
			</h4>

			{/* {(isRequired ? currentResponse : currentOptional) && <FaCheck className={styles.correct} />} */}

			<DebounceInput
				placeholder={placeholder || "*optional"}
				className="form-control"
				element={Textarea}
				minLength={2}
				rows={rows || 3}
				debounceTimeout={500}
				value={isRequired ? (currentResponse.response ? currentResponse.response : currentResponse) : currentOptional}
				onChange={isRequired ? (event) => checkRequired(event) : (event) => checkOptional(event)}
			/>

			{/* TODO: Rework status functionality. Not sure if it should be central to specific input, or global... */}
			{/* {autoSaveStatus && <LastSaved date={saveDate} isChecked={checkmark} hasUserMadeChanges={userChanges} />} */}

			{/* Condition One: Answer loads in from previous save */}
			{/* Condition Two: Answer initially saves from user input --  */}
		</section>
	);
}
