import { Box, Drawer, DrawerContent, DrawerOverlay, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import Footer from "./Footer";

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
					lg: "unset",
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
					lg: 96,
				}}
				transition=".3s ease"
				minH="100vh"
				display={"flex"}
				flexDir={"column"}
				justifyContent={"space-between"}>
				<Box>
					<NavBar />
					<Box as="main" p="4" maxH={{ base: "calc(100vh - 164px)", md: "calc(100vh - 124px)" }} overflowY={"scroll"}>
						{children}
					</Box>
				</Box>
				<Footer />
			</Box>
		</Box>
	);
}
