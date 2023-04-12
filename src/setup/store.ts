import { configureStore } from "@reduxjs/toolkit";

import workbookSlice from "./slices/workbookSlice";

export const store = configureStore({
	reducer: {
		workbookState: workbookSlice,
	},
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
