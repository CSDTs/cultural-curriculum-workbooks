import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import useConfig from "./useConfig";

import AVAILABLE_WORKBOOKS from "/src/data/";
const useSlug = () => {
	const [slug, setSlug] = useState(null);
	const [djangoConfig] = useConfig();
	const [searchParams] = useSearchParams();

	// useEffect(() => {
	// 	const currentWorkbook = djangoConfig ? djangoConfig.slug : searchParams.get("wb");

	// 	if (currentWorkbook) setSlug(currentWorkbook);
	// 	console.log(slug, "hook");
	// }, []);

	return {
		getSlug: () => {
			const currentWorkbook = djangoConfig ? djangoConfig.slug : searchParams.get("wb");

			return currentWorkbook;
		},
	};
};

export default useSlug;
