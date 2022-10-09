import { configureStore } from "@reduxjs/toolkit";

import workbookSlice from "./slices/workbookSlice";

export const store = configureStore({
	reducer: {
		workbookState: workbookSlice,
	},
});
