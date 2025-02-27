import { Caption, Header, LinkBtn, Tag } from "@/components/atoms";
import { Workbook } from "@/types";
import { FC } from "react";

/**
 *Creates the link to load in workbook data correctly while part of CSDT
 * @param slug Which workbook key to use to pull correct data
 * @returns URL params to set data correctly in workbook
 */
const createWorkbookLink = (slug: string) => {
	if (import.meta.env.PROD) return `/workbooks/start_${slug}`;
	return `?wb=${slug}`;
};

/**
 * Creates a card that displays the loaded workbook data for initial selection.
 */
const WorkbookCard: FC<Workbook> = ({ name, tags, description, slug }) => {
	const calculatedLink = createWorkbookLink(slug);

	return (
		<div className="flex aspect-square border rounded-lg w-full max-w-full sm:max-w-sm mx-auto my-auto flex-col  bg-white dark:bg-gray-900 shadow-2xl p-4 text-center justify-center">
			<Header>{name}</Header>

			<Caption> {description}</Caption>
			<div className="flex items-center justify-center flex-row mt-6 flex-wrap">
				{tags && tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
			</div>

			<div className="flex flex-row w-full  px-2 pt-5 pb-2 justify-between items-center ">
				<LinkBtn link={`${calculatedLink}`}>Start Workbook</LinkBtn>
			</div>
		</div>
	);
};

export default WorkbookCard;
