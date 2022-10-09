import { Text } from "@chakra-ui/react";

import useLocalStorage from "/src/common/hooks/useLocalStorage";
import useUserData from "/src/common/hooks/useUserData";

const PageSubheader = () => {
	const { saveStatus, isUserLoggedIn, lastSaved } = useUserData();
	const [isAutoSave, setIsAutoSave] = useLocalStorage("autoSave");
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

export default PageSubheader;
