import { Text } from "@chakra-ui/react";

import useLesson from "/src/common/hooks/useLesson";
import useResponse from "/src/common/hooks/useResponse";
import NavItem from "/src/common/ui/NavItem";

import PropTypes from "prop-types";

const SectionItem = ({ data }) => {
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

SectionItem.propTypes = {
	data: PropTypes.object.isRequired, //Lesson data
};
export default SectionItem;
