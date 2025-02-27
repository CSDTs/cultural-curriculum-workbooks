import { NavItem } from "@/components/atoms";
import useLesson from "@/hooks/useLesson";
import { Collapse, Icon, useDisclosure } from "@chakra-ui/react";
import { FC, ReactNode, useEffect } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

interface SectionGroupingProps {
	title: string;
	range: { min: number; max: number };
	children: ReactNode;
}
const SectionGrouping: FC<SectionGroupingProps> = ({ title, range, children }) => {
	const { current } = useLesson();
	const { isOpen, onOpen, onToggle } = useDisclosure();

	useEffect(() => {
		if (current.id >= range.min && current.id < range.max) onOpen();
	}, [current.id]);

	return (
		<>
			<NavItem onClick={onToggle} modifiers="text-lg">
				{title}
				<Icon ml="auto" as={MdKeyboardArrowRight} transform={isOpen && "rotate(90deg)"} />
			</NavItem>
			<Collapse in={isOpen}>{children}</Collapse>
		</>
	);
};

export default SectionGrouping;
