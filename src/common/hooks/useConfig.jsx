import { useEffect, useState } from "react";
import { loadConfigSave } from "/src/setup/slices/workbookSlice.js";

import { useDispatch, useSelector } from "react-redux";
const useConfig = () => {
	const dispatch = useDispatch();

	const [djangoConfig, setDjangoConfig] = useState(null);

	useEffect(() => {
		if (import.meta.env.DEV) {
			let flag = sessionStorage.getItem("testConfig");

			if (flag) {
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
				setDjangoConfig(typeof config === "undefined" ? null : config);
			}
		} else {
			if (typeof config !== "undefined") console.log(config);
			setDjangoConfig(typeof config === "undefined" ? null : config);
		}
	}, []);

	return [djangoConfig];
};

export default useConfig;
