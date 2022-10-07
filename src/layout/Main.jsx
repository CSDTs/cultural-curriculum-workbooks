import { Divider, useColorModeValue } from "@chakra-ui/react";

import { LoadPage } from "../features/Loading";

import useLesson from "../hooks/useLesson";
import Header from "./Header";
const Main = () => {
	const { current } = useLesson();
	return (
		<>
			<Header title={current.title} />
			<Divider
				my={3}
				w={"75%"}
				bgGradient={useColorModeValue("linear(to-r, #0092ed, gray.50)", "linear(to-r, #0092ed, gray.700)")}
			/>

			{current?.tags?.includes("slide") && <LoadPage />}
		</>
	);
};

export default Main;
