import { Divider, useColorModeValue } from "@chakra-ui/react";

import PageHeader from "./PageHeader";
import WorkbookLayout from "./WorkbookLayout";
import useLesson from "/src/common/hooks/useLesson";

import AIKR from "/src/tools/aikr_compare/pages/index";

export default function WorkbookScreen({ slug }) {
	const { current } = useLesson();

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
