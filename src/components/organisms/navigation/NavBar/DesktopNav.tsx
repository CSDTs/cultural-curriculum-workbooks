import { Box, Popover, PopoverTrigger, Stack } from "@chakra-ui/react";
import { FC } from "react";

interface DesktopNavProps {
	data: any[];
}
const DesktopNav: FC<DesktopNavProps> = ({ data }) => {
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
					</Popover>
				</Box>
			))}
		</Stack>
	);
};

export default DesktopNav;
