import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useLocalStorage from "./useLocalStorage";
import { setUserClassrooms } from "/src/setup/slices/workbookSlice";
const ROOT_URL = import.meta.env.DEV ? import.meta.env.VITE_ROOT_URL_DEV : "";

const useClassroom = () => {
	const dispatch = useDispatch();
	const classroomList = useSelector((state) => state.workbookState.user.classroom_list);

	const getClassrooms = async (id) => {
		const response = await fetch(`${ROOT_URL + import.meta.env.VITE_CLASSROOMS_API}?user=${id}`);
		const data = await response.json();
		return { data, status: response.status };
	};

	// useEffect(() => {
	// 	authenticate().then((data) => dispatch(setCurrentUser(data.data)));
	// 	getClassrooms(user.id)
	// 		.then((res) => dispatch(setUserClassrooms(res.data)))
	// 		.catch((err) => console.warn("Unable to find / fetch classrooms for " + user.username, err));
	// }, [user.id]);

	return [
		classroomList,
		{
			getClassrooms,
		},
	];
};

export default useClassroom;
