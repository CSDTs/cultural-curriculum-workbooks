import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import AVAILABLE_WORKBOOKS from "./data/";
import { loadBackupSave, loadConfigSave, setWorkbookData, updateBackupState } from "/src/setup/slices/workbookSlice";

import SelectionScreen from "/src/tools/SelectionScreen";
import WorkbookScreen from "/src/tools/WorkbookScreen";

import useLocalStorage from "./common/hooks/useLocalStorage";
import useSave from "/src/common/hooks/useSave";
import getSlug from "/src/common/utils/getSlug";

function App() {
	const dispatch = useDispatch();

	const [searchParams] = useSearchParams();
	const [backup] = useLocalStorage("backup");
	const [data] = useLocalStorage("data");
	const { saveWorkbook } = useSave();
	const slug = getSlug();
	const isValidWorkbook = slug in AVAILABLE_WORKBOOKS;
	const lessonParam = parseInt(searchParams.get("lesson"));

	useEffect(() => {
		if (slug && isValidWorkbook) dispatch(setWorkbookData({ initLesson: lessonParam, ...AVAILABLE_WORKBOOKS[slug] }));
		if (typeof config !== "undefined") dispatch(loadConfigSave(config));

		if (import.meta.env.DEV && data) {
			dispatch(loadBackupSave(data));
		}
		if (import.meta.env.PROD && backup) {
			dispatch(loadBackupSave(backup));
		}
	}, [slug]);

	if (!slug || !isValidWorkbook) return <SelectionScreen />;

	return <WorkbookScreen slug={slug} />;
}

export default App;
