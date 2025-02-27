import { Footer, NavBar } from "@/components/organisms";
import { FC } from "react";

interface SelectionLayoutProps {
	children: React.ReactNode;
}
const SelectionLayout: FC<SelectionLayoutProps> = ({ children }) => {
	return (
		<main className="flex bg-gray-50 dark:bg-gray-700 w-full flex-col justify-center overflow-y-scroll h-screen ">
			<NavBar />
			<section className="h-full p-5 flex flex-col place-content-center">{children}</section>
			<Footer />
		</main>
	);
};

export default SelectionLayout;
