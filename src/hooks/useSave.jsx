import { serializeResponses } from "#utils/save";
import { useDispatch, useSelector } from "react-redux";
import useLocalStorage from "./useLocalStorage";

const useSave = () => {
	const saveWorkbook = () => {
		const saveID = useSelector((state) => state.workbookState.user.save_id);
		const newSaveData = serializeResponses(currentUser, saveData);
	};

	return {
		saveWorkbook,
	};
};
