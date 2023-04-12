import { ExampleType } from "@/tools/aikr_compare/pages/classification/data";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { HiChevronDown } from "react-icons/hi";

interface SelectProps {
	options: any[];
	handleOnChange: (e: string) => void;
}

interface AvailableOptions extends ExampleType {}
const Select: FC<SelectProps> = ({ options, handleOnChange }) => {
	const [selectedOption, setSelectedOption] = useState<string>("");
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		handleOnChange(selectedOption);
	}, [selectedOption]);

	return (
		<div className="relative mb-5">
			<button
				className="w-full py-2 pl-3 pr-10 text-left bg-gray-600 rounded-md shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-opacity-75"
				onClick={() => setIsOpen(!isOpen)}>
				{selectedOption || "Select option"}
				<HiChevronDown className="absolute top-2 right-3 text-gray-400 pointer-events-none" />
			</button>
			{isOpen && (
				<div className="absolute z-10 w-full mt-1 bg-gray-600  rounded-md shadow-lg">
					<button
						key={"default"}
						className="w-full py-2 pl-3 text-left hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
						onClick={() => {
							setSelectedOption("");
							setIsOpen(false);
						}}>
						Select option
					</button>
					{options.map((option: AvailableOptions) => (
						<button
							key={option.title}
							className="w-full py-2 pl-3 text-left hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
							onClick={() => {
								setSelectedOption(option.title);
								setIsOpen(false);
							}}>
							{option.title}
						</button>
					))}
				</div>
			)}
		</div>
	);
};

export default Select;
