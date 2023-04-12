import { NavItem } from "@/components/common";
import useLesson from "@/hooks/useLesson";
import { Collapse, Icon, useDisclosure } from "@chakra-ui/react";
import { Fragment, useEffect } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

import PropTypes from "prop-types";

const SectionGrouping = ({ title, range, children }) => {
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

SectionGrouping.propTypes = {
	title: PropTypes.string.isRequired,
	range: PropTypes.object.isRequired,
	children: PropTypes.node.isRequired,
};
export default SectionGrouping;
