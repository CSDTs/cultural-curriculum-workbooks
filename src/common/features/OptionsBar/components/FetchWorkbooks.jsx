import { MenuItem } from "@chakra-ui/react";

import fetchWorkbookData from "/src/common/utils/fetchWorkbookData";

const FetchWorkbooks = () => {
	return <MenuItem onClick={fetchWorkbookData}>Fetch Workbook Data</MenuItem>;
};

export default FetchWorkbooks;
