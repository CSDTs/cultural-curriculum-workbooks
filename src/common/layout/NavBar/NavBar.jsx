import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Center,
	Collapse,
	Divider,
	Flex,
	IconButton,
	Image,
	Stack,
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

import Logo from "/src/assets/logo.svg";
import NSF from "/src/assets/nsf.gif";

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
];

const NavBar = ({ openSidebar }) => {
	const { isOpen, onToggle } = useDisclosure();
	const { colorMode, toggleColorMode } = useColorMode();

	const prefix = import.meta.env.PROD ? "/static/img/misc" : "";

	return (
		<Box>
			<Flex
				bg={useColorModeValue("white", "gray.800")}
				color={useColorModeValue("gray.600", "white")}
				minH={"60px"}
				py={{ base: 2 }}
				px={{ base: 4 }}
				borderBottom={1}
				borderStyle={"solid"}
				borderColor={useColorModeValue("gray.200", "gray.900")}
				align={"center"}>
				<Flex flex={{ base: 1, lg: "auto" }} ml={{ base: -2 }} display={{ base: "flex", lg: "none" }} align={"center"}>
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
				</Flex>
				<Flex flex={{ base: 1 }} justify={{ base: "center", lg: "start" }} verticalAlign={"middle"}>
					<Image
						src={NSF}
						boxSize={"40px"}
						onClick={() => {
							window.location.href = "https://www.nsf.gov/";
						}}
					/>
					<Image
						src={Logo}
						onClick={() => {
							window.location.href = "/";
						}}
					/>
					<Flex display={{ base: "none", lg: "flex" }} ml={10}>
						<DesktopNav data={NAV_ITEMS} />
					</Flex>
				</Flex>

				<Stack flex={{ base: 1, lg: 0 }} justify={"flex-end"} direction={"row"} spacing={6} verticalAlign={"middle"}>
					<UserMenu />
					<Center height="auto" py={"10px"} color={"teal"} display={{ base: "none", lg: "inline-flex" }}>
						<Divider orientation="vertical" borderColor={useColorModeValue("gray.600", "white")} />
					</Center>
					<Button
						as={"a"}
						fontSize={"lg"}
						fontWeight={400}
						variant={"link"}
						href={"#"}
						className="help-step"
						display={{ base: "none", lg: "flex" }}>
						<FaRegQuestionCircle />
					</Button>
					<Button onClick={toggleColorMode} display={{ base: "none" }}>
						{colorMode === "light" ? <MoonIcon /> : <SunIcon />}
					</Button>
				</Stack>
			</Flex>

			<Collapse in={isOpen} animateOpacity>
				<MobileNav data={NAV_ITEMS} />
			</Collapse>
		</Box>
	);
};

export default NavBar;
