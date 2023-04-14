import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
	Box,
	Collapse,
	Divider,
	Flex,
	IconButton,
	Text,
	useColorMode,
	useColorModeValue,
	useDisclosure,
} from "@chakra-ui/react";
import { FaRegQuestionCircle } from "react-icons/fa";
import { MdSchool } from "react-icons/md";

import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import UserMenu from "./UserMenu";

import Logo from "@/assets/logo.svg";
import NSF from "@/assets/nsf.gif";
import { ColorModeSwitch } from "@/components/organisms";
import { FC, MouseEventHandler } from "react";
const NAV_ITEMS = [
	{
		label: "Projects",
		href: "/projects",
	},
	{
		label: "News",
		href: "/news",
	},
	{
		label: "Publications",
		href: "/publications",
	},
	{
		label: "About",
		href: "/about",
	},
	{
		label: "Getting Started",
		href: "/getting-started",
	},
];

interface NavBarProps {
	openSidebar: MouseEventHandler;
}
const NavBar: FC<NavBarProps> = ({ openSidebar }) => {
	const { isOpen, onToggle } = useDisclosure();
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Box>
			<div className="flex bg-white dark:bg-gray-800 text-gray-500 dark:text-white h-[60px] py-2 px-4 border-b border-gray-200 dark:border-gray-900 items-center">
				<div className="flex flex-1 lg:flex-auto -ml-2 lg:hidden items-center">
					<IconButton
						onClick={onToggle}
						icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
						variant={"ghost"}
						aria-label={"Toggle Navigation"}
						mr={3}
					/>

					<Divider orientation="vertical" borderColor={useColorModeValue("gray.600", "white")} h={"25px"} mr={3} />
					<IconButton
						onClick={openSidebar}
						icon={
							<Flex align={"center"} px={2}>
								<MdSchool w={5} h={5} />
								<Text ml={2}>Lessons</Text>
							</Flex>
						}
						variant={"ghost"}
						aria-label={"Toggle Navigation"}
					/>
				</div>
				<div className="justify-center lg:justify-start flex items-center">
					<img
						src={NSF}
						alt="NSF Logo"
						width={40}
						height={40}
						onClick={() => {
							window.location.href = "https://www.nsf.gov/";
						}}
					/>
					<img
						src={Logo}
						width={100}
						height={40}
						alt="CSDT Logo"
						onClick={() => {
							window.location.href = "/";
						}}
					/>
					<div className="lg:flex hidden ml-4">
						<DesktopNav data={NAV_ITEMS} />
					</div>
				</div>

				<div className=" inline-flex justify-end flex-row items-center flex-1 invisible lg:visible">
					<UserMenu />

					<div className="px-2 ">
						<hr aria-orientation="vertical" className="border-gray-600 dark:border-white border h-5  opacity-40" />
					</div>
					<button className="help-step text-lg font-normal lg:flex hidden items-center hover:bg-white hover:bg-opacity-10 p-2 rounded  transition ease-in-out ">
						<FaRegQuestionCircle />
					</button>
					<button className="hidden lg:inline-flex items-center">
						{/* {colorMode === "light" ? <MoonIcon /> : <SunIcon />} */}
						<ColorModeSwitch />
					</button>
				</div>
			</div>

			<Collapse in={isOpen} animateOpacity>
				<MobileNav data={NAV_ITEMS} />
			</Collapse>
		</Box>
	);
};

export default NavBar;
