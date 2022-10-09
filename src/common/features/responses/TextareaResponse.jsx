import { Text, Textarea } from "@chakra-ui/react";
import { debounce } from "lodash";
import PropTypes from "prop-types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useLocalStorage from "../../hooks/useLocalStorage";
import useResponse from "/src/common/hooks/useResponse";
import useSave from "/src/common/hooks/useSave";
const TextareaResponse = ({ points, question, placeholder, children }) => {
	const { checkRequired, autoSaveResponse, getRequired } = useResponse();
	const saveData = useSelector((state) => state.workbookState.data);
	const [isSaving, isSaved, { saveWorkbook, updateResponseState }] = useSave();
	const [response, setResponse] = useState(getRequired);
	const [didSave, setDidSave] = useState(false);
	const [unsavedChanges, setUnsavedChanges] = useState(false);
	// const [autoSave, setAutoSave] = useLocalStorage("autoSave");
	const reduxAutoSave = useSelector((state) => state.workbookState.workbook.autosave);
	// const debounceSave = useMemo(
	// 	() =>
	// 		debounce((val) => {
	// 			if (reduxAutoSave) {
	// 				autoSaveResponse(val).then(() => {
	// 					saveWorkbook().then((res) => {
	// 						console.log(res);
	// 						setDidSave(true);
	// 					});
	// 				});
	// 			} else {
	// 				autoSaveResponse(val).then(() => {
	// 					console.log("updating workbook data");
	// 				});
	// 			}
	// 		}, 750),
	// 	[setResponse, reduxAutoSave]
	// );

	// const handleChange = useCallback((e) => {
	// 	setResponse({ question, response: e.target.value, points: e.target.value === "" ? 0 : points });
	// 	debounceSave({ question, response: e.target.value, points: e.target.value === "" ? 0 : points });
	// });

	const debounceSave = useCallback(
		debounce((val) => {
			if (reduxAutoSave) {
				autoSaveResponse(val).then(() => {
					saveWorkbook().then((res) => {
						console.log(res);
						setDidSave(true);
						setUnsavedChanges(false);
					});
				});
			} else {
				setUnsavedChanges(true);
				autoSaveResponse(val).then(() => {
					console.log("updating workbook data");
				});
			}
		}, 750),
		[reduxAutoSave]
	);

	const handleChange = (e) => {
		setResponse({ question, response: e.target.value, points: e.target.value === "" ? 0 : points });
		debounceSave({ question, response: e.target.value, points: e.target.value === "" ? 0 : points });
	};
	return (
		<>
			{children}
			<Textarea
				placeholder={placeholder}
				onChange={handleChange}
				value={response.response}
				borderColor={response.response && didSave && !unsavedChanges && "rgb(129 252 138)"}
				boxShadow={response.response && didSave && !unsavedChanges && "rgb(129 252 138) 0px 0px 0px 1px"}
			/>
			{isSaving && <Text>Saving... please wait...</Text>}
			{!isSaving && !unsavedChanges && didSave && <Text>{"Saved"}</Text>}
			{!isSaving && unsavedChanges && <Text>You have unsaved changes...</Text>}
		</>
	);
};

TextareaResponse.propTypes = {
	children: PropTypes.arrayOf(PropTypes.element),
	points: PropTypes.number,
	placeholder: PropTypes.string,
};

export default TextareaResponse;
