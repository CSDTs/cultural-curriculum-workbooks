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
	useColorMode,
	useColorModeValue,
	useDisclosure,
} from "@chakra-ui/react";
import { FaRegQuestionCircle } from "react-icons/fa";

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

const NavBar = () => {
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
				<Flex flex={{ base: 1, md: "auto" }} ml={{ base: -2 }} display={{ base: "flex", md: "none" }}>
					<IconButton
						onClick={onToggle}
						icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
						variant={"ghost"}
						aria-label={"Toggle Navigation"}
					/>
				</Flex>
				<Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }} verticalAlign={"middle"}>
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
					<Flex display={{ base: "none", md: "flex" }} ml={10}>
						<DesktopNav data={NAV_ITEMS} />
					</Flex>
				</Flex>

				<Stack flex={{ base: 1, md: 0 }} justify={"flex-end"} direction={"row"} spacing={6} verticalAlign={"middle"}>
					<UserMenu />
					<Center height="auto" py={"10px"} color={"teal"} display={{ base: "none", md: "inline-flex" }}>
						<Divider orientation="vertical" borderColor={useColorModeValue("gray.600", "white")} />
					</Center>
					<Button
						as={"a"}
						fontSize={"lg"}
						fontWeight={400}
						variant={"link"}
						href={"#"}
						className="help-step"
						display={{ base: "none", md: "flex" }}>
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
