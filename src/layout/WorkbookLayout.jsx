import { setCurrentLessonData } from "#slices/workbookSlice.js";
import {
	Box,
	Drawer,
	DrawerContent,
	DrawerOverlay,
	Flex,
	Text,
	useColorModeValue,
	useDisclosure,
} from "@chakra-ui/react";
import { Fragment, useCallback, useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "./Navigation";

import { LessonNavigation, LessonSelection } from "../features/Lessons";
import { WorkbookProgress } from "../features/Progress";
import useWorkbookData from "../hooks/useWorkbookData";

const SidebarContent = ({ title, sections, ...rest }) => {
	const { classroom } = useWorkbookData();
	return (
		<Box
			as="nav"
			pos="fixed"
			top="0"
			left="0"
			zIndex="sticky"
			h="full"
			pb="10"
			overflowX="hidden"
			overflowY="auto"
			bg={useColorModeValue("white", "gray.800")}
			border
			color="inherit"
			borderRightWidth="1px"
			w="96"
			{...rest}>
			<Flex direction="column" justifyContent={"space-between"} h="full">
				<Flex direction="column">
					<Flex px="4" py="5" align="left" direction={"column"}>
						<Text
							fontSize="2xl"
							ml="2"
							color="brand.500"
							_dark={{
								color: "white",
							}}
							fontWeight="semibold">
							{title}
						</Text>
						{import.meta.env.DEV && (
							<Text fontSize="md" ml="2" color={useColorModeValue("gray.800", "gray.400")} fontWeight="400">
								Development Mode
							</Text>
						)}
						{classroom && (
							<Text fontSize="md" ml="2" color={useColorModeValue("gray.800", "gray.400")} fontWeight="400">
								{classroom.name}
							</Text>
						)}
					</Flex>
					<WorkbookProgress />

					{sections && <LessonSelection sections={sections} />}
				</Flex>
				<LessonNavigation />
			</Flex>
		</Box>
	);
};

export default function WorkbookLayout({ title, sections, children }) {
	const sidebar = useDisclosure();

	return (
		<Box as="section" bg={useColorModeValue("gray.50", "gray.700")} minH="100vh">
			<SidebarContent
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
					<SidebarContent w="full" borderRight="none" />
				</DrawerContent>
			</Drawer>
			<Box
				ml={{
					base: 0,
					md: 96,
				}}
				transition=".3s ease"
				minH="100vh">
				<Navigation />
				{/* h="calc(100vh - 60px)" */}
				<Box as="main" p="4">
					{children}
				</Box>
			</Box>
		</Box>
	);
}
