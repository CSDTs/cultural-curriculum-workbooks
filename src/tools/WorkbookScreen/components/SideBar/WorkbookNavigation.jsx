import { Button, Flex, Text } from "@chakra-ui/react";

import useLesson from "/src/common/hooks/useLesson";

const WorkbookNavigation = () => {
	const { current, available, selectLesson } = useLesson();

	let endOfWorkbook = current.id == available.length - 1;
	let startOfWorkbook = current.id == 0;

	const nextLesson = () => selectLesson(++current.id);
	const previousLesson = () => selectLesson(--current.id);

	return (
		<Flex w="100%" justifyContent={"space-between"} px="5" align={"center"}>
			<Text fontSize={"lg"} fontWeight={600}>
				Lesson &nbsp;
				{current.id + 1} / {available.length}
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
};

export default WorkbookNavigation;
