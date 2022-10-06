import { Flex } from "@chakra-ui/react";
import { PuffLoader } from "react-spinners";

const override = {
	display: "block",
	margin: "0 auto",
};

export default function LoadingWrapper({ isLoading, isError, children, ...styles }) {
	return (
		<>
			<Flex align={"center"} justify={"center"} {...styles}>
				{isLoading && <PuffLoader color={"#000000"} loading={isLoading} cssOverride={override} size={150} />}
				{!isLoading && !isError && children}
			</Flex>
		</>
	);
}
