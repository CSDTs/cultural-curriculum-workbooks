import { Stack, useColorModeValue } from "@chakra-ui/react";
import PropTypes from "prop-types";

import { FC } from "react";
import { FaRegQuestionCircle } from "react-icons/fa";
import ColorModeSwitch from "../../ColorModeSwitch";
import MobileNavItem from "./MobileNavItem";
import UserMenu from "./UserMenu";

interface MobileNavProps {
	data: any[];
}
const MobileNav: FC<MobileNavProps> = ({ data }) => {
	return (
		<div className="bg-white dark:bg-gray-800 p-4 lg:hidden block ">
			{data.map((navItem) => (
				<MobileNavItem key={navItem.label} {...navItem} />
			))}
			<hr></hr>

			<div className="flex justify-start items-start mt-2 flex-col">
				<UserMenu />

				<a
					href={"/culture/help/index.html"}
					className="inline-flex items-center font-semibold lg:text-sm  hover:bg-gray-300 hover:text-gray-900 py-2 px-4  rounded-md">
					<FaRegQuestionCircle />
					<span className=" px-1">Help</span>
				</a>
				{/* <ColorModeSwitch /> */}
			</div>
		</div>
	);
};

export default MobileNav;
