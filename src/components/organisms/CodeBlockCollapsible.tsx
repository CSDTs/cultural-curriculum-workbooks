import { Collapse, useDisclosure } from "@chakra-ui/react";
import { FC } from "react";

interface CollapsibleProps {
	description?: string;
	children?: React.ReactElement;
}
const CodeBlockCollapsible: FC<CollapsibleProps> = ({ description, children }) => {
	const { isOpen, onToggle } = useDisclosure();

	return (
		<div onClick={onToggle}>
			{children}
			<Collapse in={isOpen} animateOpacity>
				<div className="p-[40px] text-white mb-5 bg-gray-500 rounded-md shadow-md cursor-pointer">{description}</div>
			</Collapse>
		</div>
	);
};

export default CodeBlockCollapsible;
