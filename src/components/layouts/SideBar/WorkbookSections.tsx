import useWorkbook from "@/hooks/useWorkbook";
import { Section } from "@/types";

import SectionGrouping from "./SectionGrouping";
import SectionItem from "./SectionItem";

/**
 * Displays the lesson groupings so users can jump to specific lessons
 */
const WorkbookSections = () => {
	let lessonCount = 0;
	let offset = 0;

	const { workbookData } = useWorkbook();
	const sections = workbookData.available_sections;
	return (
		<div className="flex flex-col text-sm text-gray-600" aria-label="Main Navigation">
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
	);
};
export default WorkbookSections;
