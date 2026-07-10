import { useEffect } from "react";

import SelectionScreen from "@/components/pages/SelectionScreen";

import WorkbookScreen from "@/components/pages/WorkbookScreen";
import useWorkbook from "@/hooks/useWorkbook";
import getSlug from "@/utils/getSlug";

function App() {
	const { setConfigData, setCurrentWorkbook, checkValidityOfSlug, restoreBackup } = useWorkbook();
	const slug = getSlug();

	useEffect(() => {
		if (slug) setCurrentWorkbook(slug);
		if (typeof config !== "undefined") setConfigData(config);
		if (import.meta.env.PROD) restoreBackup();

		// // Whenever the user explicitly chooses dark mode
		localStorage.theme = "dark";
	}, [slug]);

	if (!slug || !checkValidityOfSlug(slug)) return <SelectionScreen />;

	return <WorkbookScreen />;
}

export default App;
