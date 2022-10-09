import { Divider, useColorModeValue } from "@chakra-ui/react";

import { LoadPage } from "/src/common/features/Loading";

import PageHeader from "./PageHeader";
import useLesson from "/src/common/hooks/useLesson";

const Main = () => {
	const { current } = useLesson();

	return (
		<>
			<PageHeader title={current.title} />
			<Divider
				my={3}
				w={"75%"}
				bgGradient={useColorModeValue("linear(to-r, #0092ed, gray.50)", "linear(to-r, #0092ed, gray.700)")}
			/>

			<LoadPage />
		</>
	);
};

export default Main;
