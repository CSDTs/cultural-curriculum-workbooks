import { Icon } from "@chakra-ui/react";
import { FC, MouseEventHandler, ReactNode } from "react";

interface SectionCardProps {
	title?: string;
	image: string;
	question: string;
	handleOnClick: MouseEventHandler;
	children: ReactNode;
}
const SectionCard: FC<SectionCardProps> = ({ title, image, question, handleOnClick, children }) => {
	return (
		<div className="h-full group" onClick={handleOnClick}>
			<div className="mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden cursor-pointer h-full w-full max-w-sm group-hover:border-b-2 group-hover:border-[#1f89dd] group-hover:duration-75">
				<img
					className="w-full h-72 object-cover object-center group-hover:border-t-2 group-hover:border-gray-900 group-hover:duration-75"
					src={image}
					alt="avatar"
				/>

				<div className="flex items-center px-6 py-3 bg-gray-900">
					<Icon h={6} w={6} color="white" />
					<h1 className="mx-3 text-white font-bold text-lg">{question}</h1>
				</div>

				<div className="py-4 px-6">
					<h1 className="text-xl font-bold text-slate-800 dark:text-white">{title}</h1>
					{children}
				</div>
			</div>
		</div>
	);
};

export default SectionCard;
