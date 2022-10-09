import { Box, Heading, SimpleGrid, Text, Textarea } from "@chakra-ui/react";
import PropTypes from "prop-types";

import { debounce } from "lodash";
import { useCallback, useMemo, useRef, useState } from "react";
import useResponse from "/src/common/hooks/useResponse";
import useSave from "/src/common/hooks/useSave";
const MultiTextareaResponse = ({ points, questions }) => {
	const { checkRequired, autoSaveResponse, getRequired } = useResponse();

	const textAreas = useRef([]);

	const [isSaving, isSaved, { saveWorkbook }] = useSave();
	const [response, setResponse] = useState(getRequired);

	const debounceSave = useMemo(
		() =>
			debounce((val) => {
				autoSaveResponse(val).then(() => {
					console.log("uploading to cloud");
					saveWorkbook().then((res) => {
						console.log(res);
					});
				});
			}, 750),
		[setResponse]
	);

	const handleChange = useCallback(() => {
		const multiResponse = {};
		let multiPoints = 0;
		// setResponse({ question, response: e.target.value, points: e.target.value === "" ? 0 : points });
		// debounceSave({ question, response: e.target.value, points: e.target.value === "" ? 0 : points });

		textAreas.current.forEach((el, idx) => {
			multiResponse[idx] = {
				prompt: questions[idx].question,
				reply: el.value,
			};

			if (el.value) multiPoints += 1;
		});
		setResponse({ question: "Creating an AI App", response: multiResponse, points: multiPoints });
		debounceSave({ question: "Creating an AI App", response: multiResponse, points: multiPoints });
	});
	return (
		<>
			<SimpleGrid columns={{ base: 1, md: questions.length / 2, lg: questions.length }} spacing={10}>
				{questions.map((item, i) => (
					<Box h={"100%"} key={item.question}>
						<Heading fontSize={"lg"} my={5}>
							{item.question}
						</Heading>

						<Textarea
							placeholder={item.placeholder}
							onChange={handleChange}
							value={response?.response?.[i]?.reply}
							borderColor={response?.response?.[i]?.reply && "rgb(129 252 138)"}
							boxShadow={response?.response?.[i]?.reply && "rgb(129 252 138) 0px 0px 0px 1px"}
							h={"15rem"}
							mt={"auto"}
							ref={(el) => (textAreas.current[i] = el)}
						/>
					</Box>
				))}
			</SimpleGrid>

			{isSaving && <Text>{"Saving..."}</Text>}
			{isSaved && <Text>{"Saved"}</Text>}
		</>
	);
};

export default MultiTextareaResponse;
