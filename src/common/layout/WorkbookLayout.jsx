import { Box, Drawer, DrawerContent, DrawerOverlay, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import Loader from "../features/Loading/Loader";

import NavBar from "./NavBar/NavBar";
import SideBar from "./SideBar";

export default function WorkbookLayout({ title, sections, children }) {
	const sidebar = useDisclosure();

	return (
		<Box as="section" bg={useColorModeValue("gray.50", "gray.700")} minH="100vh">
			<SideBar
				title={title}
				sections={sections}
				display={{
					base: "none",
					md: "unset",
				}}
			/>
			<Drawer isOpen={sidebar.isOpen} onClose={sidebar.onClose} placement="left">
				<DrawerOverlay />
				<DrawerContent>
					<SideBar w="full" borderRight="none" />
				</DrawerContent>
			</Drawer>
			<Box
				ml={{
					base: 0,
					md: 96,
				}}
				transition=".3s ease"
				minH="100vh">
				<NavBar />
				<Box as="main" p="4" h={"100%"}>
					{children}
					{/* <Loader /> */}
				</Box>
			</Box>
		</Box>
	);
}
