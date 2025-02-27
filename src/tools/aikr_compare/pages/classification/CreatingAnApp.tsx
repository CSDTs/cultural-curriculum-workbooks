import { ChangeEvent, useState } from "react";

import { Paragraph, Select } from "@/components/atoms";
import { MultiTextareaResponse } from "@/components/organisms/responses";
import { worldExamples } from "./data";

const CreatingAnApp = () => {
	const [prompt, setPrompt] = useState<string>("");

	const handleOnSelect = (e: ChangeEvent<HTMLSelectElement>) => {
		if (!e.target.value) {
			setPrompt("");
			return;
		}
		const current = worldExamples.filter((example) => {
			return example.title == e.target.value;
		});

		setPrompt(current[0].prompt);
	};
	const handleOnSelectAlt = (e: string) => {
		if (e === "") {
			setPrompt("");
			return;
		}
		const current = worldExamples.filter((example) => {
			return example.title == e;
		});

		setPrompt(current[0].prompt);
	};

	return (
		<MultiTextareaResponse
			questions={[
				{
					question: "Problem statement",
					placeholder: "The problem is... ",
				},
				{
					question: "First category training",
					placeholder: "I would train the AI's first category with samples of...",
				},
				{
					question: "Second category training",
					placeholder: "I would train the AI's second category with samples of...",
				},
				{
					question: "Rationale statement",
					placeholder: "The rationale of this would be...",
				},
			]}>
			<Paragraph>
				Finally, it is now your turn to write your very own AI application that helps solve a community problem! Instead
				of revising you'll be creating.
			</Paragraph>
			<Paragraph>
				Using what you've learned so far about deciding on a problem, turning it into a binary classification problem,
				validating an AI binary classification model and correlation, please fill in each box in order. When all boxes
				are filled in you can advance to the next screen.
			</Paragraph>

			<Select handleOnChange={handleOnSelectAlt} options={worldExamples} />
			{prompt && <div className="p-5 bg-slate-600">{prompt}</div>}
		</MultiTextareaResponse>
	);
};
export default CreatingAnApp;
