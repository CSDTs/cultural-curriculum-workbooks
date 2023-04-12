import { Flex } from "@chakra-ui/react";
import { PuffLoader } from "react-spinners";

const override = {
	display: "block",
	margin: "0 auto",
};

const Loader = ({ ...styles }) => {
	return (
		<Flex align={"center"} justify={"center"} {...styles}>
			<PuffLoader color={"#000000"} loading={true} cssOverride={override} size={150} />
		</Flex>
	);
};

export default Loader;
