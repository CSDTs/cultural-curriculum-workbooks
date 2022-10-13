import { Text } from "@chakra-ui/react";

import { NavItem } from "/src/common/core";
import useLesson from "/src/common/hooks/useLesson";
import useResponse from "/src/common/hooks/useResponse";

import PropTypes from "prop-types";

const SectionItem = ({ title, idx }) => {
	const { current, selectLesson } = useLesson();
	const { specificResponse } = useResponse();

	const navState = {
		color: current.id == idx ? "#1f89dd" : "gray.500",
		fontWeight: current.id == idx ? "800" : "500",
		textDecoration: specificResponse(idx) && "line-through",
	};

	const setLesson = () => selectLesson(idx);

	return (
		<NavItem pl="12" py="2" onClick={setLesson}>
			<Text {...navState}>{title}</Text>
		</NavItem>
	);
};

SectionItem.propTypes = {
	title: PropTypes.string.isRequired,
	idx: PropTypes.number.isRequired,
};
export default SectionItem;
