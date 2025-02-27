import { Textarea } from "@chakra-ui/react";

import { ChangeEvent, FC, ReactNode, useCallback } from "react";

import { debounce } from "lodash";
import useResponse from "../../../hooks/useResponse";

interface TextareaResponseProps {
	points: number;
	question: string;
	placeholder: string;
	children: ReactNode;
}
const TextareaResponse: FC<TextareaResponseProps> = ({ points, question, placeholder, children }) => {
	const { response, setResponse, setResponseSaved } = useResponse();

	const debounceSave = useCallback(
		debounce((val) => {
			setResponse(val);
		}, 750),
		[]
	);

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setResponseSaved(false);
		debounceSave({ question, response: e.target.value, points: e.target.value === "" ? 0 : points });
	};

	return (
		<>
			{children}
			<textarea
				placeholder={placeholder}
				onChange={handleChange}
				defaultValue={response}
				className="w-full bg-transparent border dark:border-gray-600 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-400 dark:text-white text-gray-700"
				rows={3}></textarea>
		</>
	);
};

export default TextareaResponse;
