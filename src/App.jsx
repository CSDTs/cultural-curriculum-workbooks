import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import AVAILABLE_WORKBOOKS from "./data/";
import { loadConfigSave, setWorkbookData } from "./slices/workbookSlice";

import FirstTimePrompt from "./features/FirstTimePrompt";

import useConfig from "./hooks/useConfig";
import useUserData from "./hooks/useUserData";
import { Main, WorkbookLayout } from "./layout";
import SelectionScreen from "./pages/SelectionScreen";

const getParam = (param) => {
	const [searchParams] = useSearchParams();
	let urlParam = searchParams.get(param);
	return urlParam;
};

function App() {
	const dispatch = useDispatch();

	const [wb, setWb] = useState(null);
	const [lesson, setLesson] = useState(null);
	const [djangoConfig] = useConfig();

	let lessonParam = getParam("lesson");

	const [currentUser] = useUserData();

	const saveID = currentUser?.save_id;

	const currentWorkbook = djangoConfig ? djangoConfig.slug : getParam("wb");
	const isValidWorkbook = currentWorkbook in AVAILABLE_WORKBOOKS;

	useEffect(() => {
		if (currentWorkbook && isValidWorkbook) {
			dispatch(setWorkbookData({ initLesson: parseInt(lessonParam), ...AVAILABLE_WORKBOOKS[currentWorkbook] }));
			setWb(AVAILABLE_WORKBOOKS[currentWorkbook]);
		}

		if (djangoConfig) dispatch(loadConfigSave(djangoConfig));
	}, []);

	return (
		<WorkbookLayout title={wb?.title || "CSDT Workbook"} sections={wb?.data} setLesson={setLesson}>
			<ToastContainer />
			{!isValidWorkbook || !currentWorkbook ? <SelectionScreen /> : <Main />}
		</WorkbookLayout>
	);
}

export default App;
