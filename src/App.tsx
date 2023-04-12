import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { loadBackupSave, loadConfigSave, setWorkbookData, updateBackupState } from "@/setup/slices/workbookSlice";
import AVAILABLE_WORKBOOKS from "./data";

import SelectionScreen from "@/pages/SelectionScreen";

import useSave from "@/features/Saving/hooks/useSave";
import useLocalStorage from "@/hooks/useLocalStorage";
import WorkbookScreen from "@/pages/WorkbookScreen";
import getSlug from "@/utils/getSlug";

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

		// TODO: Load last workbook should also check for backup and load data / save previous.
		// if (import.meta.env.PROD && backup) {
		// 	dispatch(loadBackupSave(backup));
		// }

		if (localStorage.getItem("chakra-ui-color-mode") == "light") {
			localStorage.removeItem("chakra-ui-color-mode");
			window.location.reload();
		}

		// // On page load or when changing themes, best to add inline in `head` to avoid FOUC
		// if (
		// 	localStorage.theme === "dark" ||
		// 	(!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
		// ) {
		// 	document.documentElement.classList.add("dark");
		// } else {
		// 	document.documentElement.classList.remove("dark");
		// }

		// // Whenever the user explicitly chooses light mode
		// localStorage.theme = "light";

		// // Whenever the user explicitly chooses dark mode
		// localStorage.theme = "dark";

		// // Whenever the user explicitly chooses to respect the OS preference
		// localStorage.removeItem("theme");
	}, [slug]);

	if (!slug || !isValidWorkbook) return <SelectionScreen />;

	return <WorkbookScreen />;
}

export default App;
