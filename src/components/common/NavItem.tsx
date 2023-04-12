import { Flex, Icon } from "@chakra-ui/react";
import { FC } from "react";

interface NavItemProps {
	icon: any;
	color: string;
	children: React.ReactNode;
	rest: any;
}
const NavItem: FC<NavItemProps> = (props) => {
	const { icon, children, color, ...rest } = props;
	return (
		<Flex
			align="center"
			px="4"
			pl="4"
			py="3"
			cursor="pointer"
			color="inherit"
			_dark={{
				color: "gray.400",
			}}
			_hover={{
				bg: "gray.100",
				_dark: {
					bg: "gray.900",
				},
				color: "gray.900",
			}}
			role="group"
			fontWeight="semibold"
			transition=".15s ease"
			{...rest}>
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
		</Flex>
	);
};

export default NavItem;
