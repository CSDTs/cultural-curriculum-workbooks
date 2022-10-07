import { Box } from "@chakra-ui/react";
import { lazy, Suspense, useEffect, useState } from "react";

import useLesson from "../../hooks/useLesson";
import useWorkbook from "../../hooks/useWorkbook";
import Loader from "./Loader";

const LoadPage = () => {
	const { current } = useLesson();
	const { slug } = useWorkbook();

	let Page = lazy(() => import(`../../pages/${slug}/index.jsx`));
	return (
		<Suspense fallback={<Loader />}>
			<Page slideID={current.id} />
		</Suspense>
	);
};

export default LoadPage;
