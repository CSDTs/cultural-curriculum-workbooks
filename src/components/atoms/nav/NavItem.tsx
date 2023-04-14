import { Flex, Icon } from "@chakra-ui/react";
import { FC, MouseEventHandler } from "react";

interface NavItemProps {
	icon?: any;
	color?: string;
	children: React.ReactNode;
	modifiers?: string;
	onClick: MouseEventHandler;
}
const NavItem: FC<NavItemProps> = (props) => {
	const { icon, children, color, modifiers, onClick } = props;
	return (
		<div
			onClick={onClick}
			className={`font-semibold transition-all ease-linear duration-[.15s] items-center flex px-4 py-3 cursor-pointer text-gray-400 hover:bg-gray-100 hover:dark:bg-gray-900 hover:text-slate-200 group ${modifiers}`}>
			{icon && (
				<Icon
					mx="2"
					boxSize="4"
					_groupHover={{
						color: color,
					}}
					as={icon}
				/>
			)}
			{children}
		</div>
	);
};

export default NavItem;
