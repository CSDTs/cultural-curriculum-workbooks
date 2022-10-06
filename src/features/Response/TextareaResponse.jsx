import { Text, Textarea } from "@chakra-ui/react";
import PropTypes from "prop-types";

import { debounce } from "lodash";
import { useCallback, useMemo, useState } from "react";
import useResponse from "../../hooks/useResponse";
const TextareaResponse = ({ points, question, placeholder, children }) => {
	const { checkRequired, getRequired } = useResponse();

	const [response, setResponse] = useState(getRequired);

	const debounceSave = useMemo(
		() =>
			debounce((val) => {
				checkRequired(val);
			}, 750),
		[setResponse]
	);

	const handleChange = useCallback((e) => {
		setResponse({ question, response: e.target.value, points: e.target.value === "" ? 0 : points });
		debounceSave({ question, response: e.target.value, points: e.target.value === "" ? 0 : points });
	});
	return (
		<>
			{children}

			<Textarea
				placeholder={placeholder}
				onChange={handleChange}
				value={response.response}
				borderColor={response.response && "rgb(129 252 138)"}
				boxShadow={response.response && "rgb(129 252 138) 0px 0px 0px 1px"}
			/>
		</>
	);
};

TextareaResponse.propTypes = {
	children: PropTypes.arrayOf(PropTypes.element),
	points: PropTypes.number,
	placeholder: PropTypes.string,
};

export default TextareaResponse;
