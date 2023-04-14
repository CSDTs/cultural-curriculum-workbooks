import { NavItem } from "@/components/atoms";
import useLesson from "@/hooks/useLesson";
import useResponse from "@/hooks/useResponse";

import { FC } from "react";

interface SectionItemProps {
	title: string;
	idx: number;
}
/**
 * Section item within the groupings that represents each lesson, changes to lesson on click
 */
const SectionItem: FC<SectionItemProps> = ({ title, idx }) => {
	const { current, selectLesson } = useLesson();
	const { specificResponse } = useResponse();
	const isCurrent = current.id == idx;

	const setLesson = () => selectLesson(idx);

	return (
		<NavItem modifiers={"pl-12 py-2"} onClick={setLesson}>
			<p
				className={`font- ${isCurrent ? "text-blue-500" : "text-gray-500"} ${
					isCurrent ? "font-extrabold" : "font-bold"
				} ${specificResponse(idx) ? "line-through" : ""}`}>
				{title}
			</p>
		</NavItem>
	);
};

export default SectionItem;
