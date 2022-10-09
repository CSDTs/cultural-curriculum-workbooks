import { Box, Divider, useColorModeValue } from "@chakra-ui/react";
import { lazy, Suspense, useEffect, useState } from "react";
import useSlug from "../../hooks/useSlug";

import Loader from "./Loader";
import useLesson from "/src/common/hooks/useLesson";
import useWorkbook from "/src/common/hooks/useWorkbook";
import PageHeader from "/src/common/layout/PageHeader";

import { getSlug } from "/src/common/services/WorkbookService";

const LoadPage = () => {
	const { current } = useLesson();
	const slug = getSlug();

	const Page = lazy(() => import(`../../../tools/${slug}/pages/index.jsx`));
	return (
		<Suspense fallback={<Loader />}>
			<Page slideID={current.id} />
		</Suspense>
	);
};

export default LoadPage;
