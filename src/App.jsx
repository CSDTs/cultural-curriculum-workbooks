import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import AVAILABLE_WORKBOOKS from "./data/";
import { loadConfigSave, setSlug, setWorkbookData } from "/src/setup/slices/workbookSlice";

import { Heading } from "@chakra-ui/react";
import useSlug from "./common/hooks/useSlug";
import useWorkbook from "./common/hooks/useWorkbook";
import useConfig from "/src/common/hooks/useConfig";

import { Main, WorkbookLayout } from "/src/common/layout";
import SelectionScreen from "/src/tools/SelectionScreen";

import useLocalStorage from "./common/hooks/useLocalStorage";
import useSave from "./common/hooks/useSave";
import { getSlug } from "/src/common/services/WorkbookService";
function updateURL(slug, id) {
	window.history.pushState({}, "", `/workbooks/start_${slug}/${id}`);

	// if (window.history !== undefined && window.history.pushState !== undefined) {
	// 	let updatedPathname = window.location.pathname.replace(/\d+$/, `${id}`);
	// 	if (updatedPathname === window.location.pathname) window.history.pushState({}, "", `${updatedPathname}${id}`);
	// 	else window.history.pushState({}, "", updatedPathname);
	// }
}

function App() {
	const dispatch = useDispatch();

	const [wb, setWb] = useState(null);
	const [searchParams] = useSearchParams();
	const [lesson, setLesson] = useState(null);
	const [autoSave] = useLocalStorage("autoSave");
	const saveData = useSelector((state) => state.workbookState.data);
	const saveId = useSelector((state) => state.workbookState.user.save_id);
	const reduxAutoSave = useSelector((state) => state.workbookState.workbook.autosave);
	let lessonParam = searchParams.get("lesson");
	const [isSaving, isSaved, { saveWorkbook }] = useSave(reduxAutoSave);

	const slug = getSlug();

	useEffect(() => {
		const isValidWorkbook = slug in AVAILABLE_WORKBOOKS;

		if (slug && isValidWorkbook) {
			dispatch(setWorkbookData({ initLesson: parseInt(lessonParam), ...AVAILABLE_WORKBOOKS[slug] }));
			setWb(AVAILABLE_WORKBOOKS[slug]);
		}

		if (typeof config !== undefined) dispatch(loadConfigSave(config));
	}, [slug]);

	useEffect(() => {
		if (reduxAutoSave)
			saveWorkbook().then((res) => {
				// if (res.status == 201) updateURL(slug, res.data.id);
				console.log(res);
			});
	}, [saveData]);

	return (
		<>
			<WorkbookLayout title={wb?.title || "CSDT Workbook"} sections={wb?.data} setLesson={setLesson}>
				{(!slug || !wb) && <SelectionScreen />}

				{slug && wb && <Main />}
			</WorkbookLayout>
		</>
	);
}

export default App;
