import { useEffect } from "react";

import AccountIndicator from "@/components/organisms/AccountIndicator";

import useWorkbook from "@/hooks/useWorkbook";

import { SavingIndicator } from "@/components/molecules";
import { DebugMenu } from "@/components/organisms";
import useAuth from "@/hooks/useAuth";

const Footer = () => {
	const { saveData, saveState, saveWorkbook } = useWorkbook();
	const { currentLoggedInUser } = useAuth();

	useEffect(() => {
		if (saveState.auto_save && currentLoggedInUser.id) {
			saveWorkbook();
		}
	}, [saveData, saveState.isFirstTime]);

	return (
		<footer className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200">
			<div className="py-4 px-4 flex flex-col md:flex-row space-x-4 mt-auto justify-center md:justify-between items-center ">
				<SavingIndicator />
				<div className="flex flex-row space-x-6">
					<AccountIndicator />
					<DebugMenu />
				</div>
			</div>
		</footer>
	);
};

export default Footer;
