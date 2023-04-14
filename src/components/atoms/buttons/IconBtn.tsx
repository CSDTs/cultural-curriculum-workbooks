import { FC, MouseEventHandler, ReactNode } from "react";

interface IProps {
	children: ReactNode;
	tooltipText: string;
	handleOnClick: MouseEventHandler;
}

const IconBtn: FC<IProps> = ({ handleOnClick, children, tooltipText }) => {
	return (
		<div className="relative inline-block group">
			<button
				className="rounded-xl  hover:bg-slate-700 text-white font-bold py-2 px-4  group-hover:bg-slate-700 transition-all ease-linear"
				onClick={handleOnClick}>
				{children}
			</button>
			{tooltipText && (
				<div className="opacity-0 bg-gray-700 text-white text-center text-sm rounded-lg py-2 px-4 absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 -translate-y-1/4 tooltip transition-all ease-in-out duration-150 group-hover:opacity-100  whitespace-nowrap">
					{tooltipText}
					<svg className="absolute text-gray-700 h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255">
						<polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
					</svg>
				</div>
			)}
		</div>
	);
};

export default IconBtn;
