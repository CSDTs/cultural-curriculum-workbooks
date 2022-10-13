import { Flex } from "@chakra-ui/react";

import { useSelector } from "react-redux";
import SectionGrouping from "./SectionGrouping";
import SectionItem from "./SectionItem";

const WorkbookSections = () => {
	let lessonCount = 0;
	let offset = 0;

	const { available_sections: sections } = useSelector((state) => state.workbookState.workbook);
	return (
		<Flex direction="column" as="nav" fontSize="sm" color="gray.600" aria-label="Main Navigation">
			{sections &&
				sections.map((section) => (
					<SectionGrouping
						title={section.title}
						key={section.title}
						range={{ min: offset, max: (offset += section.lessons.length) }}>
						{section.lessons.map((lesson) => (
							<SectionItem key={lesson.title} title={lesson.title} idx={lessonCount++} />
						))}
					</SectionGrouping>
				))}
		</Flex>
	);
};
export default WorkbookSections;
