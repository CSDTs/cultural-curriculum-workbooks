import { Box, Heading, Link } from "@chakra-ui/react";

import { P } from "/src/common/core";

import { useEffect } from "react";
import SelectionLayout from "./SelectionLayout";

const ErrorScreen = ({ err }) => {
	useEffect(() => {
		if (err) console.error("Selection Screen: ", err);
	}, []);

	return (
		<SelectionLayout>
			<Box textAlign={"center"} p={5}>
				<Heading py={5}>Welcome to CSDT Workbooks!</Heading>
				<P textAlign={"center"}>There seems to be an issue fetching the workbooks. Please try again later.</P>
				<P textAlign={"center"}>
					If this persists, please contact us at{" "}
					<Link href="mailto:csdtdevelopers@umich.edu" fontWeight={600}>
						csdtdevelopers@umich.edu
					</Link>
				</P>
			</Box>
		</SelectionLayout>
	);
};

export default ErrorScreen;
