import { Stack, Text } from "@chakra-ui/react";
import { ScaleLoader } from "react-spinners";

import useLocalStorage from "@/hooks/useLocalStorage";
import useWorkbook from "@/hooks/useWorkbook";
const SavingIndicator = () => {
	const [backup] = useLocalStorage("backup");
	const { saveState } = useWorkbook();

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
			</Text>
		</div>
	);
};

export default SavingIndicator;
