import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { Button, ButtonGroup, ButtonToolbar, Spinner } from "react-bootstrap";
import { RiSave2Fill, RiSettings3Fill } from "react-icons/ri";

import { workbookRequest } from "/src/common/utils/apiRequests";
import { updateURL } from "/src/common/utils/helpers";
import { getErrorProps, saveErrorProps, successProps } from "/src/common/utils/notificationProps";
import { serializeResponses } from "/src/common/utils/save";
import { setSaveDataId, updateSaveStatus } from "/src/setup/slices/workbookSlice";

import { DebugButton } from "../Debugging";
import LoginPrompt from "/src/common/ui/prompts/LoginPrompt";
import NewSavePrompt from "/src/common/ui/prompts/NewSavePrompt";

import { triggerNewSave, triggerSaveUpdate } from "/src/common/utils/triggerSave";

import styles from "./WorkbookOptions.module.scss";

import { Flex } from "@chakra-ui/react";
import AutoSaveIndicator from "../AutoSaveIndicator";

import useFetch from "/src/common/hooks/useFetch";

export default function Options() {
	const workbookState = useSelector((state) => state.workbookState);
	const saveData = workbookState.data;
	const currentUser = workbookState.user;
	const userClassrooms = currentUser.classroom_list;
	const isCurrentUser = currentUser.username != "";
	const saveID = currentUser.save_id;

	let isAutoSaveEnabled = window.localStorage.getItem("autoSave");
	const dispatch = useDispatch();

	const errCallback = (err, obj, props) => {
		toast.update(obj, props);
		console.error(err);
	};

	const fetchUserWorkbooks = () => {
		const getToast = toast.loading("Fetching your workbooks, please wait...", { theme: "colored" });

		workbookRequest(serializeResponses(currentUser, saveData), "GET")
			.then((response) => {
				toast.update(getToast, !response.ok ? getErrorProps : successProps);
				if (response.ok) console.log(response.data);
			})
			.catch((err) => errCallback(err, getToast, getErrorProps));
	};

	const newWorkbookSave = () => {
		const postToast = toast.loading("Saving your work, please wait...", { theme: "colored" });

		workbookRequest(serializeResponses(currentUser, saveData), "POST")
			.then((response) => {
				toast.update(postToast, !response.ok ? saveErrorProps : successProps);

				if (response.ok) {
					dispatch(setSaveDataId(response.data.id));
					dispatch(updateSaveStatus(true));
					updateURL(response.data.id);
				}
			})
			.catch((err) => errCallback(err, postToast, saveErrorProps));
	};

	const updateWorkbookSave = () => {
		const putToast = toast.loading("Saving your work, please wait...", { theme: "colored" });

		if (!saveID) {
			newWorkbookSave();
			return;
		}

		let pendingSaveData = Object.assign(serializeResponses(currentUser, saveData), { id: saveID });

		workbookRequest(pendingSaveData, "PUT")
			.then((response) => {
				toast.update(putToast, !response.ok ? saveErrorProps : successProps);

				if (response.ok) dispatch(updateSaveStatus(true));
			})
			.catch((err) => errCallback(err, putToast, saveErrorProps));
	};

	const saveWorkbook = () => {
		const newSaveResponse = (response) => {
			dispatch(setSaveDataId(response.data.id));
			dispatch(updateSaveStatus(true));
			updateURL(response.data.id);
		};

		const updateSaveResponse = () => {
			dispatch(updateSaveStatus(true));
		};

		const newSaveData = serializeResponses(currentUser, saveData);
		if (!saveID) triggerNewSave(newSaveData, newSaveResponse);
		if (saveID) triggerSaveUpdate(saveID, newSaveData, updateSaveResponse);
	};

	const isSaving = useSelector((state) => state.workbookState.is_saving);
	return (
		<div className={`col-auto ${styles.saveGroup}`}>
			<Flex aria-label="Toolbar with button groups" justifyContent={"end"}>
				<ButtonGroup className="me-2" aria-label="First group">
					{((isCurrentUser && saveID) || (isCurrentUser && !userClassrooms)) &&
						(isAutoSaveEnabled === "false" || isAutoSaveEnabled == null) && (
							<>
								<Button variant="secondary" onClick={() => updateWorkbookSave()} size="sm">
									Save and Continue
								</Button>
							</>
						)}
					{isCurrentUser && !saveID && userClassrooms && <NewSavePrompt handleClassNum={newWorkbookSave} />}
					{!isCurrentUser && <LoginPrompt />}
				</ButtonGroup>
				<ButtonGroup className="me-2" aria-label="Second group">
					{import.meta.env.DEV && (
						<DebugButton
							getCallback={fetchUserWorkbooks}
							postCallback={newWorkbookSave}
							putCallback={updateWorkbookSave}
						/>
					)}
				</ButtonGroup>

				<AutoSaveIndicator />
			</Flex>
		</div>
	);
}
