import { Box } from "@chakra-ui/react";
import { lazy, Suspense, useState } from "react";
import useCurrentLesson from "../../hooks/useCurrentLesson";
import Loader from "./Loader";

const LoadPage = () => {
	const { currentLesson, slug } = useCurrentLesson();
	// const [Page, setPage] = useState('');
	let Page = lazy(() => import(`../../pages/${slug}/index.jsx`));
	return (
		<Suspense fallback={<Loader />}>
			<Page slideID={currentLesson} />
		</Suspense>
	);
};

export default LoadPage;
