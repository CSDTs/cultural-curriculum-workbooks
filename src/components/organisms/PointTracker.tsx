import { Progress } from "@chakra-ui/react";
import { FaTrophy } from "react-icons/fa";

import useWorkbook from "@/hooks/useWorkbook";

export default function PointTracker() {
	const { pointsEarned, totalPoints } = useWorkbook();

	return (
		<div className="flex flex-col px-5 py-2">
			{totalPoints && (
				<>
					<div className="flex justify-between">
						<p>
							<strong>{`${pointsEarned} / ${totalPoints}`}</strong> POINTS EARNED
						</p>

						<FaTrophy />
					</div>
					<Progress value={(pointsEarned / totalPoints) * 100} />
				</>
			)}
		</div>
	);
}
