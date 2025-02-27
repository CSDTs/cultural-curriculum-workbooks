import { updatePoints, updateResponse, updateSaveStatus } from "@/setup/slices/workbookSlice";
import { RootState } from "@/setup/store";
import { useDispatch, useSelector } from "react-redux";
const useResponse = () => {
	const dispatch = useDispatch();
	const data = useSelector((state: RootState) => state.workbookState.data);
	const index = useSelector((state: RootState) => state.workbookState.workbook.current_lesson_id);
	// const dispatch = useDispatch();
	const responses = useSelector((state: RootState) => state.workbookState.data.responses);
	// const index = useSelector((state) => state.workbookState.workbook.current_lesson_id);
	const saveStatus = useSelector((state: RootState) => state.workbookState.save_status);
	const response = responses[index]?.response || "";

	const setResponse = (val) => {
		dispatch(updateResponse(val));
		dispatch(updatePoints());
		dispatch(updateSaveStatus(false));
	};

	let currentResponse = data.responses[index] || "";

	return {
		response,
		setResponse,
		checkRequired: (val: any) => {
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
		autoSaveResponse: async (val: any) => {
			dispatch(updateResponse(val));
			dispatch(updatePoints());
			dispatch(updateSaveStatus(false));
		},

		updateCurrentResponse: async (val: any) => {
			dispatch(updateResponse(val));
			dispatch(updatePoints());
		},
		getRequired: currentResponse,
		specificResponse: (id: number) => {
			return data.responses[id];
		},
		fetchResponse: (id: number) => {
			return responses[id] || "";
		},
		hasResponseSaved: () => saveStatus,
		setResponseSaved: (val: any) => dispatch(updateSaveStatus(val)),
	};
};
export default useResponse;
