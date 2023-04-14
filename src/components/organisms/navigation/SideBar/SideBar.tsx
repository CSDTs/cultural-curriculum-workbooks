import { FC } from "react";

import NamePlate from "./NamePlate";
import WorkbookNavigation from "./WorkbookNavigation";

import PointTracker from "@/components/organisms/PointTracker";
import useWorkbook from "@/hooks/useWorkbook";
import { Section } from "@/types";

import { SectionGrouping, SectionItem } from "@/components/atoms";

interface SideBarProps {
	additionalStyles?: string;
}
const SideBar: FC<SideBarProps> = ({ additionalStyles }) => {
	let lessonCount = 0;
	let offset = 0;

	const { workbookData } = useWorkbook();
	const sections = workbookData.available_sections;

	return (
		<nav
			className={`fixed top-0 left-0 z-[sticky] h-full pb-10 overflow-x-hidden overflow-y-auto bg-white dark:bg-gray-800 border-r w-96 ${additionalStyles}`}>
			<div className="flex flex-col justify-between h-full">
				<div className="flex flex-col">
					<NamePlate />
					<PointTracker />

					{/* Available lessons hidden inside dropdown groupings */}
					<div className="flex flex-col text-sm text-gray-600">
						{sections &&
							sections.map((section: Section) => (
								<SectionGrouping
									title={section.title}
									key={section.title}
									range={{ min: offset, max: (offset += section.lessons.length) }}>
									{section.lessons.map((lesson) => (
										<SectionItem key={lesson.title} title={lesson.title} idx={lessonCount++} />
									))}
								</SectionGrouping>
							))}
					</div>
				</div>
				<WorkbookNavigation />
			</div>
		</nav>
	);
};

export default SideBar;
