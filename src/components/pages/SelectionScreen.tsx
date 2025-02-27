import { Loader, Paragraph } from "@/components/atoms/";
import WorkbookCard from "@/components/molecules/cards/WorkbookCard";

import { SelectionLayout } from "@/components/organisms";

import useWorkbook from "@/hooks/useWorkbook";
import { Workbook } from "@/types";

/**
 * Workbook selection screen, pulls from workbook api, plans to use later on when we have more workbooks available...
 */
const SelectionScreen = () => {
	const { availableWorkbooks } = useWorkbook();
	const { isLoading, data, error } = availableWorkbooks;

	let gridCols = `grid-cols-1 md:grid-cols-${Math.min(data?.length || 0, 2)} lg:grid-cols-${Math.min(
		data?.length || 0,
		3
	)}`;

	return (
		<SelectionLayout>
			<div className="text-center p-5">
				{!isLoading && (
					<>
						<h1 className="text-4xl font-bold text-slate-600 dark:text-white">Welcome to CSDT Workbooks!</h1>
						<Paragraph modifiers="!text-center w-full mt-2">
							Please select one of the available workbooks to begin:
						</Paragraph>
					</>
				)}

				{(error as Object) && (
					<Paragraph modifiers={"!text-center"}>
						There seems to be an issue fetching the workbooks. Please try again later.
					</Paragraph>
				)}
			</div>

			{data && (
				<div className={`grid gap-x-8 gap-y-4 ${gridCols}`}>
					{data.map((workbook: Workbook) => (
						<WorkbookCard {...workbook} key={workbook.name} />
					))}
				</div>
			)}

			{(error as Object) && (
				<Paragraph modifiers={"!text-center"}>
					If this persists, please contact us at{" "}
					<a href="mailto:csdtdevelopers@umich.edu" className="font-semibold">
						csdtdevelopers@umich.edu
					</a>
				</Paragraph>
			)}

			{isLoading && (
				<div className="flex flex-col justify-center">
					<Loader />
				</div>
			)}
		</SelectionLayout>
	);
};

export default SelectionScreen;
