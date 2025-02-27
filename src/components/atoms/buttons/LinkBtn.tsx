import { FC, ReactNode } from "react";

interface IProps {
	link: string;
	children: ReactNode;
}
const LinkBtn: FC<IProps> = ({ link, children }) => {
	return (
		<a
			className="p-4 justify-center flex flex-1 w-full text-base font-medium rounded-full bg-blue-400 text-white  shadow-lg shadow-blue-500/50 hover:bg-blue-500 focus:bg-blue-500"
			href={link}>
			{children}
		</a>
	);
};
export default LinkBtn;
