import { Textarea } from "@chakra-ui/react";
import { debounce } from "lodash";
import PropTypes from "prop-types";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import useResponseHook from "../../../tools/WorkbookScreen/hooks/useResponse";

const TextareaResponse = ({ points, question, placeholder, children }) => {
	const [response, setResponse, { setResponseSaved }] = useResponseHook();

	const debounceSave = useCallback(
		debounce((val) => {
			setResponse(val);
		}, 750),
		[]
	);

	const handleChange = (e) => {
		setResponseSaved(false);
		debounceSave({ question, response: e.target.value, points: e.target.value === "" ? 0 : points });
	};

	return (
		<>
			{children}
			<Textarea placeholder={placeholder} onChange={handleChange} defaultValue={response} />
		</>
	);
};

TextareaResponse.propTypes = {
	points: PropTypes.number,
	question: PropTypes.string,
	placeholder: PropTypes.string,
	children: PropTypes.arrayOf(PropTypes.element),
};

export default TextareaResponse;
