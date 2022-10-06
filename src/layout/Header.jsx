import WorkbookOptions from "#features/WorkbookOptions";
import { Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import useUserData from "../hooks/useUserData";

const SaveStatus = () => {
	const { saveStatus, isUserLoggedIn, lastSaved } = useUserData();

	return (
		<>
			{isUserLoggedIn ? (
				<Text color="gray.500" fontWeight={"500"}>
					Login to save your work.
				</Text>
			) : (
				<Text color="gray.500" fontWeight={saveStatus ? "500" : "bold"}>
					{saveStatus ? lastSaved : "You have unsaved changes"}
				</Text>
			)}
		</>
	);
};

const Header = ({ title }) => {
	const [isAutoSave, setIsAutoSave] = useLocalStorage("autoSave");

	return (
		<Flex align={"center"} w="100%" justifyContent={"space-between"}>
			<Flex direction={"column"}>
				<Heading fontSize={"2xl"} fontWeight={"500"}>
					{title}
				</Heading>
				{/* {!isAutoSave && <SaveStatus />} */}
			</Flex>

			<WorkbookOptions />
		</Flex>
	);
};

export default Header;
