import { Collapse, Flex, Icon, Text, useDisclosure } from "@chakra-ui/react";
import { Fragment, useEffect } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import NavItem from "../../components/NavItem";
import useCurrentLesson from "../../hooks/useCurrentLesson";

const LessonData = ({ lessonID, lessonData }) => {
	const lesson = { lessonID, ...lessonData };

	const { currentLesson, currentResponse, updateCurrentLesson } = useCurrentLesson(lessonID, lesson);

	const isCurrentLesson = currentLesson == lessonID;

	const navState = {
		color: isCurrentLesson ? "#1f89dd" : "gray.500",
		fontWeight: isCurrentLesson ? "800" : "500",
	};

	return (
		<NavItem pl="12" py="2" onClick={updateCurrentLesson}>
			<Text {...navState}>{currentResponse ? <s>{lessonData.title}</s> : <>{lessonData.title}</>}</Text>
		</NavItem>
	);
};
const SectionData = ({ title, range, children }) => {
	const { currentLesson } = useCurrentLesson();
	const { isOpen, onOpen, onToggle } = useDisclosure();

	useEffect(() => {
		if (currentLesson >= range.min && currentLesson < range.max) onOpen();
	}, [currentLesson]);

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

const LessonSelection = ({ sections }) => {
	let lessonCount = 0;
	let offset = 0;

	return (
		<Flex direction="column" as="nav" fontSize="sm" color="gray.600" aria-label="Main Navigation">
			{sections &&
				sections.map((section) => (
					<SectionData
						title={section.title}
						key={section.title}
						range={{ min: offset, max: (offset += section.lessons.length) }}>
						{section.lessons.map((lesson) => (
							<LessonData lessonID={lessonCount++} key={lesson.title} lessonData={lesson} />
						))}
					</SectionData>
				))}
		</Flex>
	);
};

export default LessonSelection;
