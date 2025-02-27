import { FC, ReactNode } from "react";

interface ResponseHeadingProps {
	modifiers?: string;
	children: ReactNode;
}
const ResponseHeading: FC<ResponseHeadingProps> = ({ modifiers, children }) => {
	return <h2 className={`text-lg font-bold ${modifiers}`}>{children}</h2>;
};

export default ResponseHeading;
