import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { updateResponse, updateEarnedPoints, updateSaveStatus } from "/src/slices/workbookSlice.js";

import { prompts } from "./data";

export default function CompareSectionSix() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(updateResponse("  "));
		dispatch(updateEarnedPoints());
		dispatch(updateSaveStatus(false));
	}, []);

	return (
		<section>
			<p> Now lets look at some other applications for real vs fake that matter for ordinary people.</p>

			{prompts &&
				Object.keys(prompts).map((opt, index) => (
					<>
						<h4 className="mt-4">{prompts[opt].title}</h4>
						<p>{prompts[opt].prompt}</p>
					</>
				))}
		</section>
	);
}
