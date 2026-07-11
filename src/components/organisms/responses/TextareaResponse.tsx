import { ChangeEvent, FC, ReactNode, useEffect, useRef } from "react";

import debounce from "lodash/debounce";
import useResponse from "../../../hooks/useResponse";

interface TextareaResponseProps {
	points: number;
	question: string;
	placeholder: string;
	children: ReactNode;
}
const TextareaResponse: FC<TextareaResponseProps> = ({ points, question, placeholder, children }) => {
	const { response, setResponseAt, setResponseSaved, index } = useResponse();

	const debounceSave = useRef(debounce((idx: number, val: any) => setResponseAt(idx, val), 750)).current;

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setResponseSaved(false);
		debounceSave(index, { question, response: e.target.value, points: e.target.value === "" ? 0 : points });
	};

	useEffect(() => () => { debounceSave.flush(); }, []);

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
