import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	userID: -1,
	username: "",
	classrooms: null,
};

export const userSlice = createSlice({
	name: "currentUser",
	initialState,
	reducers: {
		setUser: (state, action) => {
			if (action.payload?.username) {
				state.userID = action.payload.id;
				state.username = action.payload.username;
				return;
			}
			state.userID = -1;
			state.username = "";
		},
		setClassrooms: (state, action) => {
			state.classrooms = action.payload;
		},
	},
});

export const { setUser, setClassrooms } = userSlice.actions;

export default userSlice.reducer;
