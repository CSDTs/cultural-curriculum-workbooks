import { Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import AIKR from "../data/aikr";
export default function Alt() {
	const [params, setParams] = useSearchParams();
	const [workbook, setWorkbook] = useState(null);
	const [lessons, setLessons] = useState(null);

	const name = params.get("wb");

	const available = {
		aikr: AIKR,
	};
	if (name in available) {
		setWorkbook(available[name]);
	}
	useEffect(() => {
		let temp = available[name].reduce((accum, section) => {
			return accum.concat(section.lessons);
		}, []);
		setLessons(temp);
	}, [workbook]);

	return (
		<Box>
			<Text>Test</Text>
		</Box>
	);
}
