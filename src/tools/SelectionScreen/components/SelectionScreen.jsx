import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

import { Loader } from "/src/common/core";

import WorkbookCard from "./WorkbookCard";

import { P } from "/src/common/core";

import ErrorScreen from "./ErrorScreen";
import SelectionLayout from "./SelectionLayout";
import fetchWorkbooks from "/src/tools/SelectionScreen/fetchers/fetchWorkbooks";
const SelectionScreen = () => {
	const { isLoading, data: workbooks, error } = useQuery(["workbooks"], fetchWorkbooks);

	if (isLoading) return <Loader minH={"100vh"} />;

	if (error) return <ErrorScreen err={error} />;

	return (
		<SelectionLayout>
			<Box textAlign={"center"} p={5}>
				<Heading>Welcome to CSDT Workbooks!</Heading>
				<P textAlign={"center"}>Please select one of the available workbooks to begin:</P>
			</Box>
			<SimpleGrid
				columns={{
					base: 1,
					md: Math.min(workbooks.length, 2),
					lg: Math.min(workbooks.length, 3),
				}}
				spacing={10}
				width={"100%"}
				maxW={"6xl"}
				mx={"auto"}>
				{workbooks.map((workbook) => (
					<WorkbookCard {...workbook} key={workbook.name} />
				))}
			</SimpleGrid>
		</SelectionLayout>
	);
};

export default SelectionScreen;
