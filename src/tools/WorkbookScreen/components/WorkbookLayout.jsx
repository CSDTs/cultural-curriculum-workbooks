import { Box, Button, Drawer, DrawerContent, DrawerOverlay, useColorModeValue, useDisclosure } from "@chakra-ui/react";

import SideBar from "./SideBar";

import { Footer, NavBar } from "/src/common/layout";

export default function WorkbookLayout({ title, sections, children }) {
	const sidebar = useDisclosure();

	return (
		<Box as="section" bg={useColorModeValue("gray.50", "gray.700")} minH="100vh">
			<SideBar
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
					<NavBar openSidebar={sidebar.onOpen} />

					<Box as="main" p="4" maxH={{ base: "calc(100vh - 164px)", md: "calc(100vh - 124px)" }} overflowY={"scroll"}>
						{children}
					</Box>
				</Box>
				<Footer />
			</Box>
		</Box>
	);
}
