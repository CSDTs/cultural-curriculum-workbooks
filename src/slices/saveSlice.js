import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	id: 0,
	responses: [],
	optional: [],
	current_lesson: 0,
	save_status: "Unsaved",
	classroom: {},
	points_earned: 0,
};

export const saveSlice = createSlice({
	name: "userSave",
	initialState,
	reducers: {
		updateCurrentResponse: (state, action) => {
			state.responses[state.current_lesson] = action.payload;
		},
		updateCurrentOptional: (state, action) => {
			state.optional[state.current_lesson] = action.payload;
		},
		setLesson: (state, action) => {
			state.current_lesson = action.payload;
		},
		increaseLesson: (state) => {
			state.current_lesson += 1;
		},
		decreaseLesson: (state) => {
			state.current_lesson -= 1;
		},
		setSaveStatus: (state, action) => {
			if (action.payload.type === "CHANGES_MADE") state.save_status = "You have unsaved changes.";
			else if (action.payload.type === "SAVED") state.save_status = `Last saved on ${new Date().getTime()} `;
			else if (action.payload.type === "NO_USER") state.save_status = "You need to login to save your work.";
			else state.save_status = "New workbook. You should save...";
		},
		setClassroom: (state, action) => {
			state.classroom = action.payload;
		},
		updatePointsEarned: (state) => {
			state.points_earned = state.responses.reduce((total, response) => {
				let current = 0;
				current += Array.isArray(response)
					? response.reduce((acc, obj) => {
							return acc + obj;
					  }, 0)
					: response != ""
					? 1
					: 0;

				return total + current;
			}, 0);
		},

		loadSave: (state, action) => {
			let data = action.payload;

			state.optional = data.optional;
			state.responses = data.responses;
			state.points_earned = data.points_earned;
			state.current_lesson = data.current_lesson;
		},
	},
});

export const {
	updateCurrentResponse,
	updateCurrentOptional,
	setLesson,
	increaseLesson,
	decreaseLesson,
	setSaveStatus,
	setClassroom,
	updatePointsEarned,
	loadSave,
} = saveSlice.actions;

export default saveSlice.reducer;
