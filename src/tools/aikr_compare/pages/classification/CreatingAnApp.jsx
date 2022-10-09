import { useState } from "react";

import { Alert, Select } from "@chakra-ui/react";
import { MultiTextareaResponse } from "/src/common/features/responses";

import { worldExamples } from "./data";
import { P } from "/src/common/core";
export default function CreatingAnApp() {
	const [prompt, setPrompt] = useState("");

	const handleOnSelect = (e) => {
		if (!e.target.value) {
			setPrompt("");
			return;
		}
		const current = worldExamples.filter((example) => {
			return example.title == e.target.value;
		});

		setPrompt(current[0].prompt);
	};

	return (
		<MultiTextareaResponse
			points={4}
			questions={[
				{
					question: "Problem statement",
					placeholder: "The problem is... ",
				},
				{
					question: "Training for first category",
					placeholder: "I would train the AI's first category with samples of...",
				},
				{
					question: "Training for second category",
					placeholder: "I would train the AI's second category with samples of...",
				},
				{
					question: "Rationale",
					placeholder: "The rationale of this would be...",
				},
			]}>
			<P>
				Finally, it is now your turn to write your very own AI application that helps solve a community problem! Instead
				of revising you'll be creating.
			</P>
			<P>
				Using what you've learned so far about deciding on a problem, turning it into a binary classification problem,
				validating an AI binary classification model and correlation, please fill in each box in order. When all boxes
				are filled in you can advance to the next screen.
			</P>

			<Select placeholder="Select option" variant="filled" onChange={handleOnSelect} defaultValue="" my={5}>
				{worldExamples.map((example) => (
					<option value={example.title} key={example.title}>
						{example.title}
					</option>
				))}
			</Select>

			{prompt && <Alert>{prompt}</Alert>}
		</MultiTextareaResponse>
	);
}
