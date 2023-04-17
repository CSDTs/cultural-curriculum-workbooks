import AccountIndicator from "@/components/organisms/AccountIndicator";

import { SavingIndicator } from "@/components/molecules";
import { DebugMenu } from "@/components/organisms";

const Footer = () => {
	return (
		<footer className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200">
			<div className="py-4 px-4 flex flex-col md:flex-row space-x-4 mt-auto justify-center md:justify-between items-center ">
				<SavingIndicator />
				<div className="flex flex-row space-x-6">
					{/* <AccountIndicator /> */}
					<DebugMenu />
				</div>
			</div>
		</footer>
	);
};

export default Footer;
