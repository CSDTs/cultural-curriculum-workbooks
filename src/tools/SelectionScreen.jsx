import { SimpleGrid } from "@chakra-ui/react";
import { useEffect } from "react";
import { LoadingWrapper } from "/src/common/features/contentLoading";
import useAvailableWorkbooks from "/src/common/hooks/useAvailableWorkbooks";
import { WorkbookCard } from "/src/common/ui/cards/";

const SelectionScreen = () => {
	const { workbooks, isLoading, isError } = useAvailableWorkbooks();

	return (
		<LoadingWrapper isLoading={isLoading} isError={isError} minH={"100%"}>
			<SimpleGrid columns={3} spacing={10} width={"6xl"}>
				{workbooks && workbooks.map((workbook) => <WorkbookCard {...workbook} />)}
			</SimpleGrid>
		</LoadingWrapper>
	);
};

export default SelectionScreen;
