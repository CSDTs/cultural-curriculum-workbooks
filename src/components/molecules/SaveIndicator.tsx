import { Stack, Text } from "@chakra-ui/react";
import { ScaleLoader } from "react-spinners";

import useAuth from "@/hooks/useAuth";
import useLocalStorage from "@/hooks/useLocalStorage";
import useWorkbook from "@/hooks/useWorkbook";
import { useEffect, useState } from "react";
const SavingIndicator = () => {
	const [backup] = useLocalStorage("backup");
	const [status, setStatus] = useState<any>({});

	const { saveData, saveState, saveWorkbook } = useWorkbook();
	const { currentLoggedInUser } = useAuth();

	useEffect(() => {
		if (saveState.auto_save && currentLoggedInUser.id) {
			saveWorkbook();
		}
	}, [saveData, saveState.isFirstTime]);

	const textColor =
		!saveState.status && !saveState.isLoading
			? "red.500"
			: saveState.isLoading
			? "cyan.500"
			: saveState.isSuccess
			? "green.500"
			: saveState.isError
			? "red.500"
			: "gray.500";
	return (
		<div className="flex flex-row items-center">
			{saveState.isLoading && <ScaleLoader color={"rgb(144,205,244)"} height={"18px"} />}

			<Text color={textColor}>
				{" "}
				{!saveState.status && !saveState.isLoading && !saveState.isError
					? "You have unsaved changes"
					: saveState.isLoading
					? "Saving..."
					: saveState.isSuccess
					? "Saved"
					: saveState.isError
					? "Unable to save: Temporary backup created..."
					: saveState.last_saved
					? `Last saved ${saveState.last_saved}`
					: ""}
				{backup && !saveState.isSuccess && !saveState.isLoading && " Will attempt to save backup soon..."}
				{!currentLoggedInUser.id && "Login to save your progress"}
			</Text>
		</div>
	);
};

export default SavingIndicator;
