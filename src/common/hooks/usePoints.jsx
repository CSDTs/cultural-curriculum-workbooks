import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const usePoints = () => {
	const pointsEarned = useSelector((state) => state.workbookState.data.points_earned);
	const lessons = useSelector((state) => state.workbookState.workbook.available_lessons);

	const totalPoints = lessons.reduce((acc, obj) => {
		return acc + (obj.points || 0);
	}, 0);

	return [pointsEarned, totalPoints];
};

export default usePoints;
