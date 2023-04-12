import { FC, ReactNode } from "react";

interface IProps {
	children: ReactNode;
}

const Caption: FC<IProps> = ({ children }) => {
	return <p className="text-center text-gray-700 dark:text-gray-500 px-3 py-2 font-normal text-base">{children}</p>;
};
export default Caption;
