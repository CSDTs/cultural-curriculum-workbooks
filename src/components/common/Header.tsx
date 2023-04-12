import { FC, ReactNode } from "react";

interface HeaderProps {
	children: ReactNode;
}
const Header: FC<HeaderProps> = ({ children }) => {
	return <h1 className="py-5 font-bold text-4xl">{children}</h1>;
};

export default Header;
