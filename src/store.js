import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./components/counter/counterSlice";
import userSlice from "./slices/userSlice";
import saveSlice from "./slices/saveSlice";
import workbookSlice from "./slices/workbookSlice";
import { reducer as notificationsReducer } from "reapop";

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		notifications: notificationsReducer(),
		currentUser: userSlice,
		userSave: saveSlice,
		workbookState: workbookSlice,
	},
});
