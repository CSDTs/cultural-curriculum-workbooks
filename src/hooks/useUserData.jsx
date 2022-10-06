import { useDispatch, useSelector } from "react-redux";
const useUserData = () => {
	const saveStatus = useSelector((state) => state.workbookState.save_status);
	const isUserLoggedIn = useSelector((state) => state.workbookState.user.id) == null;
	const lastSaved = useSelector((state) => state.workbookState.data.last_saved);
	const currentUser = useSelector((state) => state.workbookState.user);
	const userClassrooms = useSelector((state) => state.workbookState.user.classroom_list);
	const saveObjectClassroom = useSelector((state) => state.workbookState.user.selected_classroom);

	return {
		saveStatus,
		isUserLoggedIn,
		lastSaved,
		currentUser,
		userClassrooms,
		saveObjectClassroom,
	};
};

export default useUserData;
