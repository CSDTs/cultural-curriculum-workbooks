import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { Button, ButtonGroup, ButtonToolbar } from "react-bootstrap";
import { RiSettings3Fill } from "react-icons/ri";

import { workbookRequest } from "#utils/apiRequests";
import { getErrorProps, saveErrorProps } from "#utils/notificationProps";
import { updateURL } from "#utils/helpers";
import { serializeResponses } from "#utils/save";
import { setSaveDataId, updateSaveStatus } from "#slices/workbookSlice";

import LoginPrompt from "#components/Stage/LoginPrompt";
import NewSavePrompt from "#components/UI/Prompt/NewSavePrompt";
import DebugButton from "#components/UI/Button/DebugButton";

import styles from "./WorkbookOptions.module.scss";

export default function WorkbookOptions() {
	const workbookState = useSelector((state) => state.workbookState);
	const saveData = workbookState.data;
	const currentUser = workbookState.user;
	const userClassrooms = currentUser.classroom_list;
	const isCurrentUser = currentUser.username != "";
	const saveID = currentUser.save_id;

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

	return (
		<div className={`col-auto ${styles.saveGroup}`}>
			<ButtonToolbar aria-label="Toolbar with button groups">
				<ButtonGroup className="me-2" aria-label="First group">
					{((isCurrentUser && saveID) || (isCurrentUser && !userClassrooms)) && (
						<Button variant="secondary" onClick={() => updateWorkbookSave()}>
							Save and Continue
						</Button>
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
				<ButtonGroup aria-label="Third group">
					<Button>
						<RiSettings3Fill />
					</Button>
				</ButtonGroup>
			</ButtonToolbar>
		</div>
	);
}
