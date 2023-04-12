import useResponse from "@/features/Responses/hooks/useResponse";

import { FC, ReactNode, useEffect } from "react";

interface NoResponseProps {
	children: ReactNode;
}
const NoResponse: FC<NoResponseProps> = ({ children }) => {
	const { updateNormal } = useResponse();

	useEffect(() => {
		updateNormal();
	}, []);

	return <>{children}</>;
};

export default NoResponse;
