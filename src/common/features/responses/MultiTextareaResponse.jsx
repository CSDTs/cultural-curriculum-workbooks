import { Box, Heading, SimpleGrid, Textarea } from "@chakra-ui/react";
import PropTypes from "prop-types";

import { debounce } from "lodash";
import { useCallback, useRef } from "react";
import useResponseHook from "../../../tools/WorkbookScreen/hooks/useResponse";

const MultiTextareaResponse = ({ questions, children }) => {
	const [response, setResponse, { setResponseSaved }] = useResponseHook();
	const textAreas = useRef([]);

	const debounceSave = useCallback(
		debounce((val) => {
			setResponse(val);
		}, 750),
		[]
	);

	const handleChange = useCallback(() => {
		const multiResponse = {};
		let multiPoints = 0;

		textAreas.current.forEach((el, idx) => {
			multiResponse[idx] = {
				prompt: questions[idx].question,
				reply: el.value,
			};

			if (el.value) multiPoints += 1;
		});
		setResponseSaved(false);
		debounceSave({ question: "Creating an AI App", response: multiResponse, points: multiPoints });
	});
	return (
		<>
			{children}
			<SimpleGrid columns={{ base: 1, md: questions.length / 2, lg: questions.length }} spacing={10}>
				{questions.map((item, i) => (
					<Box h={"100%"} key={item.question}>
						<Heading fontSize={"lg"} my={5}>
							{item.question}
						</Heading>

						<Textarea
							placeholder={item.placeholder}
							onChange={handleChange}
							defaultValue={response?.[i]?.reply}
							h={"15rem"}
							mt={"auto"}
							ref={(el) => (textAreas.current[i] = el)}
						/>
					</Box>
				))}
			</SimpleGrid>
		</>
	);
};

export default MultiTextareaResponse;
