import { Button } from "@chakra-ui/react";

import useLesson from "@/hooks/useLesson";

/**
 * Basic next and previous navigation with lesson count
 */
const WorkbookNavigation = () => {
	const { current, total, selectLesson } = useLesson();

	let endOfWorkbook = current.id == total - 1;
	let startOfWorkbook = current.id == 0;

	const nextLesson = () => selectLesson(++current.id);
	const previousLesson = () => selectLesson(--current.id);

	return (
		<div className="flex flex-row w-full justify-between px-5 items-center">
			<p className="font-semibold text-lg"> {`Lesson ${current.id + 1} / ${total}`}</p>

			<span>
				<Button variant="outline" colorScheme="blue" disabled={startOfWorkbook} onClick={previousLesson} mr={2}>
					Prev
				</Button>
				<Button variant="solid" colorScheme="blue" disabled={endOfWorkbook} onClick={nextLesson}>
					Next
				</Button>
			</span>
		</div>
	);
};

export default WorkbookNavigation;
