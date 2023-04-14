import useLesson from "@/hooks/useLesson";

/** Basic next and previous navigation with lesson count*/
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
				<button
					className="ring-1 rounded-md px-4 py-2 mx-2 font-semibold text-sky-200 ring-sky-200 hover:bg-sky-50 hover:bg-opacity-5 transition-all ease-in-out disabled:cursor-not-allowed disabled:opacity-20 disabled:bg-opacity-0"
					onClick={previousLesson}
					disabled={startOfWorkbook}>
					Prev
				</button>

				<button
					className="rounded-md px-4 py-2 mx-2 font-semibold text-sky-800 bg-sky-200  hover:bg-sky-300 transition-all ease-in-out disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-sky-200"
					onClick={nextLesson}
					disabled={endOfWorkbook}>
					Next
				</button>
			</span>
		</div>
	);
};

export default WorkbookNavigation;
