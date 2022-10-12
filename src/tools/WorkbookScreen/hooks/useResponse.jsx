import { useDispatch, useSelector } from "react-redux";
import { updatePoints, updateResponse, updateSaveStatus } from "/src/setup/slices/workbookSlice.js";

const useResponseHook = () => {
	const dispatch = useDispatch();
	const responses = useSelector((state) => state.workbookState.data.responses);
	const index = useSelector((state) => state.workbookState.workbook.current_lesson_id);
	const saveStatus = useSelector((state) => state.workbookState.save_status);
	const response = responses[index]?.response || "";

	const setResponse = (val) => {
		dispatch(updateResponse(val));
		dispatch(updatePoints());
		dispatch(updateSaveStatus(false));
	};

	return [
		response,
		setResponse,
		{
			fetchResponse: (id) => {
				return responses[id] || "";
			},
			hasResponseSaved: () => saveStatus,
			setResponseSaved: (val) => dispatch(updateSaveStatus(val)),
		},
	];
};
export default useResponseHook;
