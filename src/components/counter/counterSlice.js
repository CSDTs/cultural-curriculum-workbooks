import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	value: 0,
	title: "CSDT Workbooks",
	lessons: 0,
	workbook: [],
	lesson: {},
	all_lessons: [],
	slug: "",
	available_workbooks: [],
	temp: [],
};

export const counterSlice = createSlice({
	name: "counter",
	initialState,
	reducers: {
		setCurrentLesson: (state, action) => {
			state.value = action.payload.lessonID;
			state.lesson = action.payload;
		},

		nextLesson: (state) => {
			if (state.value < state.all_lessons.length) {
				state.value += 1;
				state.lesson = state.all_lessons[state.value];
			}
		},
		previousLesson: (state) => {
			if (state.value > 0) {
				state.value -= 1;
				state.lesson = state.all_lessons[state.value];
			}
		},
		setWorkbook: (state, action) => {
			state.title = action.payload.title;
			state.workbook = action.payload.data;
			state.lessons = 0;
			state.all_lessons = [];
			state.slug = action.payload.slug;

			if (state.workbook != [] && state.workbook != undefined) {
				for (let i = 0; i < state.workbook.length; i++) {
					state.lessons += state.workbook[i].lessons.length;
					state.all_lessons.push(...state.workbook[i].lessons);
				}
				state.responses = new Array(state.all_lessons.length);
			}
			if (!action.payload?.c) state.lesson = action.payload.data[0].lessons[0];
		},

		setAvailableWorkbooks: (state, action) => {
			state.available_workbooks = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { nextLesson, previousLesson, setCurrentLesson, setWorkbook, setAvailableWorkbooks } =
	counterSlice.actions;

export default counterSlice.reducer;
