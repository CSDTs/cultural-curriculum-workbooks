import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const usePoints = () => {
	const pointsEarned = useSelector((state) => state.workbookState.data.points_earned);
	const lessons = useSelector((state) => state.workbookState.workbook.available_lessons);

	const [points, setPoints] = useState(pointsEarned || 0);

	const totalPoints = lessons.reduce((acc, obj) => {
		return acc + (obj.points || 0);
	}, 0);

	const data = useSelector((state) => state.workbookState.data);
	const index = useSelector((state) => state.workbookState.workbook.current_lesson_id);

	let currentResponse = data.responses[index] || "";
	let currentOptional = data.optional[index] || "";

	return [pointsEarned, totalPoints];
};

export default usePoints;
