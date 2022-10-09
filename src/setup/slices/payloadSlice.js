import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	owner: null,
	classroom: null,
	workbook: 1,
	data: {
		responses: [],
		points: 0,
	},
	progression: 0,
};

export const payloadSlice = createSlice({
	name: "payloadState",
	initialState,
	reducers: {
		updateData: (state, action) => {},
	},
});
