import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import fetchCsrfToken from "@/features/Authentication/fetchers/fetchCsrfToken";
import postLogin from "@/features/Authentication/fetchers/postLogin";
import postLogout from "@/features/Authentication/fetchers/postLogout";
import fetchUserSpecificData from "@/fetchers/fetchUserSpecificData";
import useLocalStorage from "@/hooks/useLocalStorage";
import {
	setCurrentUser,
	setSaveDataId,
	setUserClassrooms,
	updateAutoSaveState,
	updateIsSavingStatus,
	updateSaveStatus,
} from "@/setup/slices/workbookSlice";
import { RootState } from "@/setup/store";
import { Lesson, SerializedResponse, User } from "@/types";
import delay from "@/utils/delay";
import getSlug from "@/utils/getSlug";
import { useMutation, useQuery } from "@tanstack/react-query";

import postSaveData from "@/fetchers/postSaveData";
import serializeResponses from "@/utils/serializeResponses";
import updateURL from "@/utils/updateURL";
type CurrentLesson = Lesson & { id: number };
const useWorkbook = () => {
	const dispatch = useDispatch();

	const saveData = useSelector((state: RootState) => state.workbookState.data);
	const userData = useSelector((state: RootState) => state.workbookState.user);
	const workbookData = useSelector((state: RootState) => state.workbookState.workbook);
	const [previous, setPrevious] = useState(null);
	const isLocal = window.location.origin === import.meta.env.VITE_LOCAL_ROOT;
	const slug = getSlug();
	const [localSaveData, setLocalSaveData] = useLocalStorage("data");
	const [localBackup, setLocalBackup] = useLocalStorage("backup");

	const { data: token } = useQuery(["csrftoken"], fetchCsrfToken);

	const [devSaveState, setDevSaveState] = useState({
		isError: false,
		isLoading: false,
		isSuccess: false,
	});

	const {
		mutateAsync: save,
		isLoading,
		isSuccess,
		isError,
	} = useMutation(postSaveData, {
		onMutate: () => dispatch(updateIsSavingStatus(true)),
		onSuccess: (data) => {
			dispatch(updateSaveStatus(true));
			dispatch(updateIsSavingStatus(false));
			updateURL(data.id);
			dispatch(setSaveDataId(data.id));

			console.log("Saved to cloud: ", data);

			localStorage.removeItem("backup");
		},
		onError: (error, variables) => {
			const backup = variables.updatedSaveData;
			backup["classroom"] = userData.selected_classroom;

			setLocalBackup(backup);
			dispatch(updateIsSavingStatus(false));

			console.error("Save error", error);
		},
	});
	const {
		data: classroomList,
		isLoading: isFetchingClassrooms,
		isError: isFetchingClassroomsError,
		isSuccess: isFetchingClassroomsSuccess,
	} = useQuery(["classrooms"], async () => fetchUserSpecificData(import.meta.env.VITE_CLASSROOMS_API, userData.id), {
		enabled: !!userData.id,
	});
	const {
		data: workbookSaves,
		isLoading: isFetchingLast,
		isError: isFetchingError,
	} = useQuery(
		["workbookSaves"],
		async () => fetchUserSpecificData(import.meta.env.VITE_WORKBOOK_SAVE_API, userData.id),
		{
			enabled: !!userData.id,
		}
	);

	const saveState = {
		status: useSelector((state: RootState) => state.workbookState.save_status),
		last_saved: useSelector((state: RootState) => state.workbookState.last_saved),
		auto_save: useSelector((state: RootState) => state.workbookState.workbook.autosave),
		isLoading: isLocal ? devSaveState.isLoading : isLoading,
		isError: isLocal ? devSaveState.isError : isError,
		isSuccess: isLocal ? devSaveState.isSuccess : isSuccess,
		isNewProject: userData.id && !userData.save_id,
		isFirstTime: !userData.save_id,
		isFetchingPrevious: isFetchingLast,
		isFetchingPreviousError: isFetchingError,
		previous_project: previous,
	};

	const toggleAutoSave = () => dispatch(updateAutoSaveState(!workbookData.autosave));

	const saveWorkbook = async () => {
		if (saveState.auto_save && userData.id) {
			// Local testing with vite
			if (window.location.origin === import.meta.env.VITE_LOCAL_ROOT) {
				let updatedSaveData: SerializedResponse = serializeResponses(userData, saveData);

				setDevSaveState({ ...devSaveState, isLoading: true, isSuccess: false });
				updatedSaveData = { ...updatedSaveData, id: 99999, classroom: userData?.selected_classroom };
				dispatch(updateIsSavingStatus(true));
				setLocalSaveData(updatedSaveData);
				await delay(1000);
				dispatch(updateSaveStatus(true));
				dispatch(updateIsSavingStatus(false));
				setDevSaveState({ ...devSaveState, isLoading: false, isSuccess: true });

				return;
			} else {
				//Django
				const updatedSaveData: SerializedResponse = serializeResponses(userData, saveData);

				if (userData.save_id) {
					updatedSaveData["id"] = userData.save_id;
				}

				return save({ saveID: userData.save_id, updatedSaveData, token });
			}
		} else {
			return;
		}
	};

	const classroomState = {
		list: classroomList,
		isLoading: isFetchingClassrooms,
		isError: isFetchingClassroomsError,
		isSuccess: isFetchingClassroomsSuccess,
	};
	const launchPreviousSave = () => {
		if (previous && import.meta.env.PROD)
			window.location.href = window.location.origin + "/workbooks/start_" + slug + "/" + previous + "/";
	};

	const getCurrentLesson = () => {
		return { id: workbookData.current_lesson_id, ...workbookData.current_lesson } as CurrentLesson;
	};

	useEffect(() => {
		if (saveState.isFirstTime && workbookSaves && workbookSaves?.length > 0) setPrevious(workbookSaves.pop().id);
	}, [saveState.isFirstTime, workbookSaves]);

	return {
		workbookData,
		userData,
		saveData,
		toggleAutoSave,
		saveState,
		saveWorkbook,
		launchPreviousSave,
		classroomState,
		getCurrentLesson,
	};
};

export default useWorkbook;
