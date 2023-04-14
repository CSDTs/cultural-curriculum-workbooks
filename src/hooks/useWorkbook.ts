import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import fetchCsrfToken from "@/fetchers/fetchCsrfToken";

import fetchUserSpecificData from "@/fetchers/fetchUserSpecificData";
import useLocalStorage from "@/hooks/useLocalStorage";
import {
	loadBackupSave,
	loadConfigSave,
	setSavingSucceeded,
	setWorkbookData,
	setWorkbookId,
	updateAutoSaveState,
	updateIsSavingStatus,
} from "@/setup/slices/workbookSlice";
import { RootState } from "@/setup/store";
import { Lesson, SerializedResponse, User, Workbook } from "@/types";
import delay from "@/utils/delay";
import getSlug from "@/utils/getSlug";
import { useMutation, useQuery } from "@tanstack/react-query";

import AVAILABLE_WORKBOOKS from "@/data";
import fetchBasicData from "@/fetchers/fetchBasicData";
import postSaveData from "@/fetchers/postSaveData";
import serializeResponses from "@/utils/serializeResponses";
import { useSearchParams } from "react-router-dom";
// import updateURL from "@/utils/updateURL";
type CurrentLesson = Lesson & { id: number };
interface SavedResponse {
	classroom?: number;
	id: number;
	data: string;
	owner: number;
	progression: number;
	workbook: number;
}
const updateURL = (slug: string, id: number) => {
	if (slug && id) window.history.pushState({}, "", `/workbooks/start_${slug}/${id}/` + window.location.search);
	else throw new Error("Could not update url. Slug or id is required.");
};
const useWorkbook = () => {
	const dispatch = useDispatch();
	const [searchParams] = useSearchParams();
	const [data] = useLocalStorage("data");
	const [backup] = useLocalStorage("backup");
	const saveData = useSelector((state: RootState) => state.workbookState.data);
	const userData = useSelector((state: RootState) => state.workbookState.user);
	const workbookData = useSelector((state: RootState) => state.workbookState.workbook);

	const [previous, setPrevious] = useState(null);
	const isLocal = window.location.origin === import.meta.env.VITE_LOCAL_ROOT;
	const slug = getSlug();
	const [localSaveData, setLocalSaveData] = useLocalStorage("data");
	const [localBackup, setLocalBackup] = useLocalStorage("backup");
	const address = import.meta.env.DEV ? "https://csdt.org/api/workbooks" : `${window.location.origin}/api/workbooks`;

	const { data: token } = useQuery(["csrftoken"], fetchCsrfToken);

	const [devSaveState, setDevSaveState] = useState({
		isError: false,
		isLoading: false,
		isSuccess: false,
	});
	const pointsEarned = useSelector((state: RootState) => state.workbookState.data.points_earned);
	const lessons = useSelector((state: RootState) => state.workbookState.workbook.available_lessons);

	const totalPoints = lessons.reduce((acc: number, obj: any) => {
		return acc + (obj.points || 0);
	}, 0);

	// Fetch current workbooks at api endpoint
	const availableWorkbooks = useQuery<Workbook[]>(["workbooks", address], () => fetchBasicData<Workbook[]>(address));

	// Fetch current logged in user's workbook saves to retrieve the most current worked on
	const workbookSaves = useQuery(
		["workbookSaves"],
		async () => fetchUserSpecificData(import.meta.env.VITE_WORKBOOK_SAVE_API, userData.id),
		{
			enabled: !!userData.id,
		}
	);

	const savingMutate = () => dispatch(updateIsSavingStatus(true));

	const savingSuccess = (data: any) => {
		dispatch(setSavingSucceeded(data.id));
		updateURL(slug, data.id);
		localStorage.removeItem("backup");
	};

	const savingError = (error: any, variables: any) => {
		const backup = variables.updatedSaveData;
		backup["classroom"] = userData.selected_classroom;

		setLocalBackup(backup);
		dispatch(updateIsSavingStatus(false));

		console.error("Save error", error);
	};

	const {
		mutateAsync: save,
		isLoading,
		isSuccess,
		isError,
	} = useMutation(postSaveData, {
		onMutate: savingMutate,
		onSuccess: savingSuccess,
		onError: savingError,
	});

	const saveState = {
		status: useSelector((state: RootState) => state.workbookState.save_status),
		last_saved: useSelector((state: RootState) => state.workbookState.last_saved),
		auto_save: useSelector((state: RootState) => state.workbookState.workbook.autosave),
		isLoading: isLocal ? devSaveState.isLoading : isLoading,
		isError: isLocal ? devSaveState.isError : isError,
		isSuccess: isLocal ? devSaveState.isSuccess : isSuccess,
		isNewProject: userData.id && !userData.save_id,
		isFirstTime: !userData.save_id,
		isFetchingPrevious: workbookSaves.isLoading,
		isFetchingPreviousError: workbookSaves.isError,
		previous_project: previous,
	};

	const setAutoSave = (state: boolean) => dispatch(updateAutoSaveState(state));

	const saveWorkbook = async () => {
		if (saveState.auto_save && userData.id) {
			// Local testing with vite
			if (window.location.origin === import.meta.env.VITE_LOCAL_ROOT) {
				let updatedSaveData: SerializedResponse = serializeResponses(userData, saveData);

				setDevSaveState({ ...devSaveState, isLoading: true, isSuccess: false });
				await delay(1000);
				updatedSaveData = { ...updatedSaveData, id: 99999, classroom: userData?.selected_classroom };
				dispatch(updateIsSavingStatus(true));
				setLocalSaveData(updatedSaveData);

				dispatch(setSavingSucceeded(null));
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

	const launchPreviousSave = () => {
		if (previous && import.meta.env.PROD)
			window.location.href = window.location.origin + "/workbooks/start_" + slug + "/" + previous + "/";
	};

	const getCurrentLesson = () => {
		return { id: workbookData.current_lesson_id, ...workbookData.current_lesson } as CurrentLesson;
	};

	useEffect(() => {
		if (saveState.isFirstTime && workbookSaves.data && workbookSaves.data?.length > 0 && workbookData.id !== -1) {
			const currentWorkbookSaves = workbookSaves.data.filter((save: SavedResponse) => {
				return workbookData.id === save.workbook;
			});
			currentWorkbookSaves &&
				currentWorkbookSaves.length > 0 &&
				setPrevious(currentWorkbookSaves[currentWorkbookSaves?.length - 1].id);
		}
	}, [saveState.isFirstTime, workbookData.id, workbookSaves.data]);

	useEffect(() => {
		if (availableWorkbooks.data && workbookData.slug) {
			const current = availableWorkbooks.data.filter((workbook, idx) => {
				console.log(workbook.slug === workbookData.slug);
				return workbook.slug === workbookData.slug;
			});

			dispatch(setWorkbookId(current[0]?.id));
		}
	}, [availableWorkbooks.data, workbookData.slug]);

	const setConfigData = (config: any) => {
		dispatch(loadConfigSave(config));
	};

	const setCurrentWorkbook = (slug: string) => {
		const lessonParam = parseInt(searchParams.get("lesson"));
		if (slug in AVAILABLE_WORKBOOKS)
			dispatch(setWorkbookData({ initLesson: lessonParam, ...AVAILABLE_WORKBOOKS[slug] }));
	};

	const checkValidityOfSlug = (slug: string) => {
		return slug in AVAILABLE_WORKBOOKS;
	};

	useEffect(() => {
		if (import.meta.env.DEV && data) {
			dispatch(loadBackupSave(data));
		}
		// TODO: Load last workbook should also check for backup and load data / save previous.
		// if (import.meta.env.PROD && backup) {
		// 	dispatch(loadBackupSave(backup));
		// }
	}, [slug]);

	return {
		workbookData,
		saveData,

		saveState,
		saveWorkbook,
		launchPreviousSave,

		getCurrentLesson,

		setAutoSave,
		setPrevious,
		setConfigData,
		setCurrentWorkbook,
		checkValidityOfSlug,
		availableWorkbooks,

		pointsEarned,
		totalPoints,
	};
};

export default useWorkbook;
