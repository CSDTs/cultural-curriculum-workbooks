import PropTypes from "prop-types";
import { useEffect } from "react";
import useResponse from "/src/common/hooks/useResponse";

const NoResponse = ({ children }) => {
	const { updateNormal } = useResponse();

	useEffect(() => {
		updateNormal();
	}, []);

	return <>{children}</>;
};

export default NoResponse;
