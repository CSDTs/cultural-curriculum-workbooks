import { FC, ReactNode } from "react";

interface ParagraphProps {
	children: ReactNode;
	modifiers?: string;
}

const Paragraph: FC<ParagraphProps> = ({ children, modifiers }) => {
	return (
		<p className={`mb-5 text-center sm:text-left text-slate-600 dark:text-slate-400 md:text-lg ${modifiers}`}>
			{children}
		</p>
	);
};
export default Paragraph;
