import { FC, ReactNode } from "react";

interface IProps {
	children: ReactNode;
}

const Tag: FC<IProps> = ({ children }) => {
	return <span className="px-2 py-1 mx-2 bg-gray-50 dark:bg-gray-700 font-normal text-sm">{children}</span>;
};
export default Tag;
