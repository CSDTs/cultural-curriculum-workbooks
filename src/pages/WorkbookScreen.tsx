import { Drawer, DrawerContent, DrawerOverlay, useDisclosure } from "@chakra-ui/react";

import { Footer, NavBar, SideBar } from "@/components/layouts";
import useLesson from "@/hooks/useLesson";
import aikrSlides from "@/tools/aikr_compare/";

import getSlug from "@/utils/getSlug";
import { ReactElement } from "react";
import PageHeader from "../components/ui/PageHeader";

interface AvailablePages {
	[key: string]: ReactElement[];
}
const WorkbookScreen = () => {
	const sidebar = useDisclosure();
	const { current } = useLesson();
	const slug = getSlug();
	const availablePages: AvailablePages = {
		aikr_compare: aikrSlides,
	};

	const componentToRender = availablePages[slug][current.id] || <div>Invalid slide ID</div>;
	return (
		<section className="bg-gray-50 dark:bg-gray-700 min-h-screen">
			<SideBar
				display={{
					base: "none",
					lg: "unset",
				}}
			/>
			<Drawer isOpen={sidebar.isOpen} onClose={sidebar.onClose} placement="left">
				<DrawerOverlay />
				<DrawerContent>
					<SideBar w="full" borderRight="none" />
				</DrawerContent>
			</Drawer>
			<section className="ml-0 lg:ml-96 transition-all ease-linear duration-300 min-h-screen flex flex-col justify-between">
				<div>
					<NavBar openSidebar={sidebar.onOpen} />
					<main className="p-4 max-h-[calc(100vh - 164px)] md:max-h-[calc(100vh - 124px)] overflow-y-scroll">
						<PageHeader title={current.title} />

						<hr className="my-3 w-3/4  border-gray-900 border-opacity-20 dark:border-gray-50 dark:border-opacity-10" />

						<section className="py-5 max-w-6xl">{componentToRender}</section>
					</main>
				</div>
				<Footer />
			</section>
		</section>
	);
};
export default WorkbookScreen;
