import { Drawer, DrawerContent, DrawerOverlay, useDisclosure } from "@chakra-ui/react";

import { Footer, NavBar, SideBar } from "@/components/organisms";
import useLesson from "@/hooks/useLesson";
import aikrSlides from "@/tools/aikr_compare/";

import PageHeader from "@/components/organisms/PageHeader";
import useAuth from "@/hooks/useAuth";
import useWorkbook from "@/hooks/useWorkbook";
import getSlug from "@/utils/getSlug";
import { ReactElement, useEffect } from "react";

interface AvailablePages {
	[key: string]: ReactElement[];
}

/** Main workbook layout.  */
const WorkbookScreen = () => {
	const sidebar = useDisclosure();
	const { authState } = useAuth();
	const { current } = useLesson();
	const { setCurrentWorkbook } = useWorkbook();
	const slug = getSlug();

	const availablePages: AvailablePages = {
		aikr_compare: aikrSlides,
	};

	const componentToRender = availablePages[slug][current.id] || <div>Invalid slide ID</div>;

	useEffect(() => {
		if (!authState.isAuthenticated) setCurrentWorkbook(slug);
	}, [authState]);
	return (
		<section className="min-h-screen bg-gray-50 dark:bg-gray-700">
			<SideBar additionalStyles="hidden lg:flex" />
			<Drawer isOpen={sidebar.isOpen} onClose={sidebar.onClose} placement="left">
				<DrawerOverlay />
				<DrawerContent>
					<SideBar additionalStyles="w-full border-r-0" />
				</DrawerContent>
			</Drawer>
			<section className="flex flex-col justify-between min-h-screen ml-0 transition-all duration-300 ease-linear lg:ml-96">
				<div>
					<NavBar openSidebar={sidebar.onOpen} />
					<main className="p-4 max-h-[calc(100vh - 164px)] md:max-h-[calc(100vh - 124px)] overflow-y-scroll">
						<PageHeader title={current.title} />

						<hr className="w-3/4 my-3 border-gray-900 border-opacity-20 dark:border-gray-50 dark:border-opacity-10" />

						<section className="max-w-6xl py-5">{componentToRender}</section>
					</main>
				</div>
				<Footer />
			</section>
		</section>
	);
};
export default WorkbookScreen;
