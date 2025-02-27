import { useEffect } from "react";

import { LoginPrompt } from "@/components/organisms/authentication/";
import useAuth from "@/hooks/useAuth";

const AccountIndicator = () => {
	const { authenticate, authState } = useAuth();

	// useEffect(() => {
	// 	authenticate().catch((err) => console.error(err));
	// }, []);

	return (
		<>
			<p>
				{" "}
				Account status: {(authState.isAuthenticated && "logged in") || (!authState.isAuthenticated && "not logged in")}
			</p>
			{/* <LoginPrompt isPreLaunched={true} /> */}
		</>
	);
};

export default AccountIndicator;
