import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	userID: -1,
	username: "",
	classroom: -1,
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
		setClassroom: (state, action) => {
			state.classroom = action.payload.classroom;
		},
	},
});

export const { setUser, setClassroom } = userSlice.actions;

export default userSlice.reducer;
