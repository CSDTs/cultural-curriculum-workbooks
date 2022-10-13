import { Divider, useColorModeValue } from "@chakra-ui/react";

import PageHeader from "./PageHeader";
import WorkbookLayout from "./WorkbookLayout";
import useLesson from "/src/common/hooks/useLesson";
import AIKR from "/src/tools/aikr_compare/pages/index";
import fetchUserSpecificData from "/src/tools/WorkbookScreen/fetchers/fetchUserSpecificData";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function WorkbookScreen({ slug }) {
	const { current } = useLesson();
	// const { data } = useQuery(["classrooms"], async () =>
	// 	fetchUserSpecificData(import.meta.env.VITE_CLASSROOMS_API, 12776)
	// );

	// useEffect(() => {
	// 	console.log(data);
	// }, [data]);

	return (
		<WorkbookLayout>
			<PageHeader title={current.title} />

			<Divider
				my={3}
				w={"75%"}
				bgGradient={useColorModeValue("linear(to-r, #0092ed, gray.50)", "linear(to-r, #0092ed, gray.700)")}
			/>
			{slug === "aikr_compare" && <AIKR slideID={current.id} />}
		</WorkbookLayout>
	);
}
