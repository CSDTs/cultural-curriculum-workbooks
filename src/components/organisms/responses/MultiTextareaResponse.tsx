import { SimpleGrid, Textarea } from "@chakra-ui/react";

import debounce from "lodash/debounce";
import { FC, ReactNode, useCallback, useEffect, useRef } from "react";
import useResponse from "../../../hooks/useResponse";
type Question = {
	question: string;
	placeholder: string;
};
interface MultiTextareaResponseProps {
	questions: Question[];
	children: ReactNode;
}

type MyMapKey = number;
type MyMapValue = any;
interface MyObject {
	[key: string]: MyMapValue;
}

const MultiTextareaResponse: FC<MultiTextareaResponseProps> = ({ questions, children }) => {
	const { response, setResponseAt, setResponseSaved, index } = useResponse();
	const textAreas = useRef<HTMLTextAreaElement[]>([]);

	const debounceSave = useRef(debounce((idx: number, val: any) => setResponseAt(idx, val), 750)).current;

	const handleChange = useCallback(() => {
		const responses = new Map<MyMapKey, MyMapValue>();

		let multiPoints = 0;

		textAreas.current.forEach((el: HTMLTextAreaElement, idx: number) => {
			responses.set(idx, {
				prompt: questions[idx]?.question,
				reply: el.value,
			});

			if (el.value) multiPoints += 1;
		});

		const multiResponse = Array.from(responses).reduce((obj: MyObject, [key, value]) => {
			obj[key] = value;
			return obj;
		}, {});

		setResponseSaved(false);
		debounceSave(index, { question: "Creating an AI App", response: multiResponse, points: multiPoints });
	}, [index]);

	useEffect(() => () => { debounceSave.flush(); }, []);
	return (
		<>
			{children}
			<SimpleGrid columns={{ base: 1, md: questions.length / 2, lg: questions.length }} spacing={10}>
				{questions.map((item, i: number) => (
					<div className="h-full" key={item.question}>
						<h2 className="text-lg font-medium my-5">{item.question}</h2>

						<Textarea
							placeholder={item.placeholder}
							onChange={handleChange}
							defaultValue={response?.[i]?.reply}
							h={"15rem"}
							mt={"auto"}
							ref={(el: HTMLTextAreaElement) => (textAreas.current[i] = el)}
						/>
					</div>
				))}
			</SimpleGrid>
		</>
	);
};

export default MultiTextareaResponse;
