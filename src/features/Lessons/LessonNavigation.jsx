import { Button, Flex, Text } from "@chakra-ui/react";

import { useDispatch } from "react-redux";
import useCurrentLesson from "../../hooks/useCurrentLesson";
import useWorkbookData from "../../hooks/useWorkbookData";

import { goToNextLesson, goToPreviousLesson } from "/src/slices/workbookSlice.js";

export default function LessonNavigation() {
	const dispatch = useDispatch();

	const { lessons } = useWorkbookData();
	const { currentLesson } = useCurrentLesson();

	let endOfWorkbook = currentLesson == lessons.length - 1;
	let startOfWorkbook = currentLesson == 0;

	const nextLesson = () => {
		dispatch(goToNextLesson());
	};

	const previousLesson = () => {
		dispatch(goToPreviousLesson());
	};

	return (
		<Flex w="100%" justifyContent={"space-between"} px="5" align={"center"}>
			<Text fontSize={"lg"} fontWeight={600}>
				Lesson &nbsp;
				{currentLesson + 1} / {lessons.length}
			</Text>

			<span>
				<Button variant="outline" colorScheme="blue" disabled={startOfWorkbook} onClick={previousLesson}>
					Prev
				</Button>
				<Button variant="solid" colorScheme="blue" disabled={endOfWorkbook} onClick={nextLesson}>
					Next
				</Button>
			</span>
		</Flex>
	);
}
