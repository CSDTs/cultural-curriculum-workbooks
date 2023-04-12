import { FC, ReactNode, useState } from "react";

interface CollapseProps {
	isOpen: boolean;
	onToggle: () => void;
	children: ReactNode;
}

const Collapse: FC<CollapseProps> = ({ isOpen, onToggle, children }) => {
	const [height, setHeight] = useState<number | undefined>(undefined);

	const handleToggle = () => {
		if (isOpen) {
			setHeight(0);
		} else {
			setHeight(undefined);
		}

		onToggle();
	};

	return (
		<div className="relative">
			<button
				className="flex justify-between items-center w-full p-4 text-sm font-medium text-gray-800 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:bg-gray-200"
				onClick={handleToggle}>
				<span>Toggle</span>
				<span className={`transform transition-all ${isOpen ? "rotate-180" : ""} ease-linear  duration-75`}>
					<svg className="w-5 h-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
						<path
							fillRule="evenodd"
							d="M6.293 6.293a1 1 0 0 1 1.414 0L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z"
							clipRule="evenodd"
						/>
					</svg>
				</span>
			</button>
			<div className={`transition-[height] overflow-hidden ${height === 0 ? "h-0" : "h-40"} `}>
				<div className="p-4">{children}</div>
			</div>
		</div>
	);
};
export default Collapse;
