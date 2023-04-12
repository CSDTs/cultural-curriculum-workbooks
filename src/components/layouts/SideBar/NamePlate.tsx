import useWorkbook from "@/hooks/useWorkbook";

/**
 * Sidebar nameplate displaying the current workbook title, classroom selected, and dev status
 */
const NamePlate = () => {
	const { workbookData, userData } = useWorkbook();

	const title = workbookData.title;
	const name = userData.selected_classroom;

	return (
		<div className="px-4 py-5 flex flex-col">
			<h2 className="text-2xl ml-2 dark:text-white text-slate-900 font-semibold">{title}</h2>
			{import.meta.env.DEV && (
				<p className="text-base ml-2 text-gray-800 dark:text-gray-400 font-normal">Development Mode</p>
			)}

			{name.name && <p className="text-base ml-2 text-gray-800 dark:text-gray-400 font-normal">{name.name}</p>}
		</div>
	);
};

export default NamePlate;
