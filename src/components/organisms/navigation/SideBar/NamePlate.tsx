import useAuth from "@/hooks/useAuth";
import useWorkbook from "@/hooks/useWorkbook";

/**Sidebar nameplate displaying the current workbook title, classroom selected, and dev status**/
const NamePlate = () => {
	const { workbookData } = useWorkbook();
	const { currentLoggedInUser } = useAuth();

	const title = workbookData.title;
	const classroomName = currentLoggedInUser.selected_classroom?.name;

	return (
		<div className="px-4 py-5 flex flex-col">
			<h2 className="text-2xl ml-2 dark:text-white text-slate-900 font-semibold">{title}</h2>
			{import.meta.env.DEV && (
				<p className="text-base ml-2 text-gray-800 dark:text-gray-400 font-normal">Development Mode</p>
			)}

			{classroomName && <p className="text-base ml-2 text-gray-800 dark:text-gray-400 font-normal">{classroomName}</p>}
		</div>
	);
};

export default NamePlate;
