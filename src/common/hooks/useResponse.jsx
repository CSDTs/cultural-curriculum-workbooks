import { useDispatch, useSelector } from "react-redux";
import {
	setSaveDataId,
	updateIsSavingStatus,
	updatePoints,
	updateResponse,
	updateSaveStatus,
} from "/src/setup/slices/workbookSlice.js";
const useResponse = () => {
	const dispatch = useDispatch();
	const data = useSelector((state) => state.workbookState.data);
	const index = useSelector((state) => state.workbookState.workbook.current_lesson_id);

	let currentResponse = data.responses[index] || "";
	let currentOptional = data.optional[index] || "";
	const lessonResponse = useSelector((state) => state.workbookState.data.responses)[index];
	return {
		checkRequired: (val) => {
			console.log(val);
			dispatch(updateResponse(val));
			// dispatch(updateSaveStatus(false));
			dispatch(updatePoints());
		},
		updateNormal: () => {
			dispatch(updateResponse("  "));
			dispatch(updatePoints());
			// dispatch(updateSaveStatus(false));
		},
		autoSaveResponse: async (val) => {
			dispatch(updateResponse(val));
			dispatch(updatePoints());
		},

		updateCurrentResponse: async (val) => {
			dispatch(updateResponse(val));
			dispatch(updatePoints());
		},
		getRequired: currentResponse,
		specificResponse: (id) => {
			return data.responses[id];
		},
	};
};
export default useResponse;
