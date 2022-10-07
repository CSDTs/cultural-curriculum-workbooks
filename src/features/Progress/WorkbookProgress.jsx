import { Flex, Progress, Text } from "@chakra-ui/react";
import { FaTrophy } from "react-icons/fa";
import usePoints from "../../hooks/usePoints";
export default function WorkbookProgress() {
	const [pointsEarned, totalPoints] = usePoints();

	return (
		<Flex direction={"column"} px={5} py={2}>
			{totalPoints && (
				<>
					<Flex justifyContent={"space-between"}>
						<Text>
							<strong>{`${pointsEarned} / ${totalPoints}`}</strong> POINTS EARNED
						</Text>

						<FaTrophy />
					</Flex>
					<Progress value={(pointsEarned / totalPoints) * 100} />
				</>
			)}
		</Flex>
	);
}
