import { Box, Divider, Heading, Text, useColorModeValue } from "@chakra-ui/react";

import { LoadPage } from "../features/Loading";
import useCurrentLesson from "../hooks/useCurrentLesson";
import Header from "./Header";
const Main = () => {
	const { lessonData, currentLesson } = useCurrentLesson();
	return (
		<>
			<Header title={lessonData.title} />
			<Divider
				my={3}
				w={"75%"}
				bgGradient={useColorModeValue("linear(to-r, #0092ed, gray.50)", "linear(to-r, #0092ed, gray.700)")}
			/>

			{lessonData?.tags?.includes("slide") && <LoadPage />}
		</>
	);
};

export default Main;
