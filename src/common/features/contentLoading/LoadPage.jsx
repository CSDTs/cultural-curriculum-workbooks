import { lazy, Suspense } from "react";

import useLesson from "/src/common/hooks/useLesson";

import Loader from "/src/common/ui/Loader";

import { getSlug } from "/src/common/services/WorkbookService";

const Page = lazy(() => import(`../../../tools/${getSlug()}/pages/index.jsx`));

import AIKR from "/src/tools/aikr_compare/pages/index";

const LoadPage = () => {
	const { current } = useLesson();
	const slug = getSlug();

	return (
		// <Suspense fallback={<Loader />}>
		// 	<Page slideID={current.id} />
		// </Suspense>
		<>{slug === "aikr_compare" && <AIKR slideID={current.id} />}</>
	);
};

export default LoadPage;
