import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setAvailablePoints } from "#slices/workbookSlice";

import { FaTrophy } from "react-icons/fa";

import { Flex, Progress, Text } from "@chakra-ui/react";
import useWorkbookData from "../../hooks/useWorkbookData";
export default function WorkbookProgress() {
	const dispatch = useDispatch();

	const { lessons, pointsEarned } = useWorkbookData();

	let finishedLessons = document.querySelectorAll(`s`).length;

	const checkForPoints = lessons.reduce((acc, obj) => {
		return acc + (obj.points || 0);
	}, 0);

	useEffect(() => {
		dispatch(setAvailablePoints(checkForPoints));
	}, [checkForPoints]);

	return (
		<Flex direction={"column"} px={5} py={2}>
			<>
				<Flex justifyContent={"space-between"}>
					<Text>
						<strong>
							{checkForPoints == 0 ? `${finishedLessons} / ${lessons.length}` : `${pointsEarned} / ${checkForPoints}`}
						</strong>{" "}
						{checkForPoints == 0 ? "COMPLETED" : "POINTS EARNED"}
					</Text>

					<FaTrophy />
				</Flex>
				<Progress
					value={checkForPoints == 0 ? finishedLessons / lessons.length : (pointsEarned / checkForPoints) * 100}
				/>
			</>
		</Flex>
	);
}
