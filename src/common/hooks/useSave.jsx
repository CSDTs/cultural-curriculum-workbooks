import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useLocalStorage from "./useLocalStorage";
import getSlug from "/src/common/utils/getSlug";
import { serializeResponses } from "/src/common/utils/serializeResponses";
import {
	setSaveDataId,
	updateBackupState,
	updateIsSavingStatus,
	updateSaveStatus,
} from "/src/setup/slices/workbookSlice";
const isProduction = import.meta.env.PROD;
const ROOT_URL = isProduction ? "" : "http://127.0.0.1:8000";
const CSRF_API_HOST = ROOT_URL + "/workbooks/csrf/";
const WORKBOOK_API_HOST = ROOT_URL + "/api/workbook_saves/";

function updateURL(slug, id) {
	window.history.pushState({}, "", `/workbooks/start_${slug}/${id}/` + window.location.search);
}

const fetchCsrfToken = async () => {
	const response = await fetch(`${CSRF_API_HOST}`, {
		credentials: "include",
	});
	const data = await response.json();

	return data.csrfToken;
};

const postSaveData = async ({ saveID, updatedSaveData, token }) => {
	const method = saveID ? "PUT" : "POST";
	const query = saveID ? `${updatedSaveData?.id || ""}/` : ``;

	let alterProps = {
		method: method,
		headers: { "X-CSRFToken": token, "Content-Type": "application/json" },
		credentials: "include",
		body: JSON.stringify(updatedSaveData),
	};

	const response = await fetch(`${WORKBOOK_API_HOST}${query}`, alterProps);
	return response.json();
};

const useSave = () => {
	const dispatch = useDispatch();

	const [isDevLoading, setIsDevLoading] = useState(false);
	const [isDevSuccess, setIsDevSuccess] = useState(false);
	const [isDevError, setIsDevError] = useState(false);

	const slug = getSlug();
	const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

	const currentUser = useSelector((state) => state.workbookState.user);
	const saveData = useSelector((state) => state.workbookState.data);
	const saveID = useSelector((state) => state.workbookState.user.save_id);

	const { data: token } = useQuery(["csrftoken"], fetchCsrfToken);

	const onMutateInit = () => dispatch(updateIsSavingStatus(true));

	const onMutationSuccess = (data) => {
		dispatch(updateSaveStatus(true));
		dispatch(updateIsSavingStatus(false));
		updateURL(slug, data.id);
		dispatch(setSaveDataId(data.id));

		console.log("Saved to cloud: ", data);

		localStorage.removeItem("backup");
	};

	const onMutateError = (error, variables) => {
		const backup = variables.updatedSaveData;
		backup["classroom"] = currentUser.selected_classroom;
		localStorage.setItem("backup", JSON.stringify(backup));

		dispatch(updateIsSavingStatus(false));

		console.error("Save error", error);
	};

	const { mutateAsync, isLoading, isSuccess, isError } = useMutation(postSaveData, {
		onMutate: onMutateInit,
		onSuccess: onMutationSuccess,
		onError: onMutateError,
	});

	const saveWorkbookProd = async () => {
		const updatedSaveData = serializeResponses(currentUser, saveData);

		if (saveID) updatedSaveData["id"] = saveID;

		return mutateAsync({ saveID, updatedSaveData, token });
	};
	const saveWorkbookDev = async () => {
		const updatedSaveData = serializeResponses(currentUser, saveData);

		setIsDevLoading(true);
		setIsDevSuccess(false);
		updatedSaveData["id"] = 99999;
		updatedSaveData["classroom"] = currentUser.selected_classroom;

		dispatch(updateIsSavingStatus(true));
		localStorage.setItem("data", JSON.stringify(updatedSaveData));

		await delay(1000);
		dispatch(updateSaveStatus(true));
		dispatch(updateIsSavingStatus(false));
		setIsDevLoading(false);
		setIsDevSuccess(true);
	};

	if (import.meta.env.DEV)
		return {
			isLoading: isDevLoading,
			isSuccess: isDevSuccess,
			isError: isDevError,
			saveWorkbook: saveWorkbookDev,
		};

	return {
		isLoading,
		isSuccess,
		isError,
		saveWorkbook: saveWorkbookProd,
	};
};

export default useSave;
