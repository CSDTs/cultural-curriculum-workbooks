import { Box, Link, Popover, PopoverContent, PopoverTrigger, Stack, useColorModeValue } from "@chakra-ui/react";
import PropTypes from "prop-types";

import { FC } from "react";
import DesktopSubNav from "./DesktopSubNav";

interface DesktopNavProps {
	data: any[];
}
const DesktopNav: FC<DesktopNavProps> = ({ data }) => {
	const linkColor = useColorModeValue("gray.600", "gray.200");
	const linkHoverColor = useColorModeValue("gray.800", "white");
	const popoverContentBgColor = useColorModeValue("white", "gray.800");

	return (
		<Stack direction={"row"} spacing={4} alignItems="center">
			{data.map((navItem) => (
				<Box key={navItem.label}>
					<Popover trigger={"hover"} placement={"bottom-start"}>
						<PopoverTrigger>
							<a
								className="p-2 text-sm font-medium  hover:text-gray-900 hover:dark:text-gray-300"
								href={navItem.href ?? "#"}>
								{navItem.label}
							</a>
						</PopoverTrigger>

						{/* {navItem.children && (
							<PopoverContent border={0} boxShadow={"xl"} bg={popoverContentBgColor} p={4} rounded={"xl"} minW={"sm"}>
								<Stack>
									{navItem.children.map((child) => (
										<DesktopSubNav key={child.label} {...child} />
									))}
								</Stack>
							</PopoverContent>
						)} */}
					</Popover>
				</Box>
			))}
		</Stack>
	);
};

export default DesktopNav;
