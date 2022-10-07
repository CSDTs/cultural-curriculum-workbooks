import { loadConfigSave } from "#slices/workbookSlice.js";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
const useConfig = () => {
	const dispatch = useDispatch();

	const [djangoConfig, setDjangoConfig] = useState(null);

	useEffect(() => {
		if (import.meta.env.DEV) {
			let flag = sessionStorage.getItem("testConfig");
			let config = {
				workbook_save_id: "999",
				slug: "aikr_compare",
				data: JSON.stringify(JSON.parse(sessionStorage.getItem("data")).data),
				meta: {
					owner_id: 10387,
					lastSaved: "Thu Oct  6 01:24:06 2022",
					classroom: { id: 230, name: "Deborah's Classroom" },
				},
			};
			if (flag) setDjangoConfig(typeof config === "undefined" ? null : config);
		} else {
			setDjangoConfig(typeof config === "undefined" ? null : config);
		}
	}, []);

	return [djangoConfig];
};

export default useConfig;
