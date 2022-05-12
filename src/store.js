import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./components/counter/counterSlice";
import { reducer as notificationsReducer } from "reapop";

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		notifications: notificationsReducer(),
	},
});
