import { Text } from "@chakra-ui/react";

import { NavItem } from "@/components/common";
import useResponse from "@/features/Responses/hooks/useResponse";
import useLesson from "@/hooks/useLesson";

import PropTypes from "prop-types";
import { FC } from "react";

interface SectionItemProps {
	title: string;
	idx: number;
}
const SectionItem: FC<SectionItemProps> = ({ title, idx }) => {
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
