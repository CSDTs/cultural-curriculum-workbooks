import { Flex } from "@chakra-ui/react";
import { PuffLoader } from "react-spinners";

const override = {
	display: "block",
	margin: "0 auto",
};

export default function Loader() {
	return (
		<>
			<Flex align={"center"} justify={"center"} h={"95%"}>
				<PuffLoader color={"#1f89dd"} loading={true} cssOverride={override} size={150} />
			</Flex>
		</>
	);
}