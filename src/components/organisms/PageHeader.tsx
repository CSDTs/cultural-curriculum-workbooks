import SavePrompt from "@/components/organisms/SavePrompt";
import { FC } from "react";

interface PageHeaderProps {
	title: string;
}
const PageHeader: FC<PageHeaderProps> = ({ title }) => {
	return (
		<div className="flex items-center w-full justify-between">
			<div className="flex flex-col">
				<h1 className="text-2xl font-medium text-gray-900 dark:text-white">{title}</h1>
			</div>

			<div className="flex justify-end">
				<SavePrompt />
			</div>
		</div>
	);
};

export default PageHeader;
