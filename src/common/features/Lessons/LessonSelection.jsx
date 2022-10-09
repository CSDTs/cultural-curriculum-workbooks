import { Collapse, Flex, Icon, Text, useDisclosure } from "@chakra-ui/react";
import { Fragment, useEffect } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import useLesson from "/src/common/hooks/useLesson";
import useResponse from "/src/common/hooks/useResponse";
import NavItem from "/src/common/ui/NavItem";

import useWorkbook from "/src/common/hooks/useWorkbook";

const LessonData = ({ data }) => {
	const { current, updateCurrentLesson } = useLesson(data);
	const { specificResponse } = useResponse();

	const navState = {
		color: current.id == data.lessonID ? "#1f89dd" : "gray.500",
		fontWeight: current.id == data.lessonID ? "800" : "500",
		textDecoration: specificResponse(data.lessonID) && "line-through",
	};

	return (
		<NavItem pl="12" py="2" onClick={updateCurrentLesson}>
			<Text {...navState}>{data.title}</Text>
		</NavItem>
	);
};

const SectionData = ({ title, range, children }) => {
	const { current } = useLesson();
	const { isOpen, onOpen, onToggle } = useDisclosure();

	useEffect(() => {
		if (current.id >= range.min && current.id < range.max) onOpen();
	}, [current.id]);

	return (
		<Fragment>
			<NavItem onClick={onToggle} fontSize="lg">
				{title}
				<Icon ml="auto" as={MdKeyboardArrowRight} transform={isOpen && "rotate(90deg)"} />
			</NavItem>
			<Collapse in={isOpen}>{children}</Collapse>
		</Fragment>
	);
};

const LessonSelection = () => {
	let lessonCount = 0;
	let offset = 0;
	const { sections } = useWorkbook();
	return (
		<Flex direction="column" as="nav" fontSize="sm" color="gray.600" aria-label="Main Navigation">
			{sections &&
				sections.map((section) => (
					<SectionData
						title={section.title}
						key={section.title}
						range={{ min: offset, max: (offset += section.lessons.length) }}>
						{section.lessons.map((lesson) => (
							<LessonData key={lesson.title} data={{ lessonID: lessonCount++, ...lesson }} />
						))}
					</SectionData>
				))}
		</Flex>
	);
};

export default LessonSelection;
