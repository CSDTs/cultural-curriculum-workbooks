import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: {
		id: -1,
		username: "",
		classroom_list: null,
	},
	workbook: {
		id: -1,
		slug: "",
		title: "CSDT Workbooks",
		current_lesson: {},
		current_lesson_id: 0,
		available_workbooks: [],
		available_lessons: [],
		available_sections: [],
	},
	data: {
		id: -1,
		responses: [],
		optional: [],
		misc: {},
		save_status: "Unsaved",
		classroom: {
			id: -1,
			name: "",
		},
		points_earned: 0,
		lessons_completed: 0,
		completion: 0,
		last_saved: "",
	},
};

export const workbookSlice = createSlice({
	name: "workbookState",
	initialState,
	reducers: {
		setWorkbookData: (state, action) => {
			let totalLessons = action.payload.data.reduce((total, section) => {
				return total.concat(section.lessons);
			}, []);
			state.workbook.title = action.payload.title;
			state.workbook.available_sections = action.payload.data;

			state.workbook.available_lessons = totalLessons;

			// state.workbook.current_lesson = totalLessons[0];
			state.workbook.slug = action.payload.slug;

			if (!action.payload?.initLesson) state.workbook.current_lesson = action.payload.data[0].lessons[0];
		},

		setAvailableWorkbooksData: (state, action) => {
			state.workbook.available_workbooks = action.payload;
		},

		setCurrentUser: (state, action) => {
			state.user.id = action.payload.id;
			state.user.username = action.payload.username;
		},

		setUserClassrooms: (state, action) => {
			state.user.classroom_list = action.payload;
		},
		setCurrentLessonData: (state, action) => {
			state.workbook.current_lesson_id = action.payload.lessonID;
			state.workbook.current_lesson = action.payload;
		},

		goToNextLesson: (state) => {
			if (state.workbook.current_lesson_id < state.workbook.available_lessons.length) {
				state.workbook.current_lesson_id += 1;
				state.workbook.current_lesson = state.workbook.available_lessons[state.workbook.current_lesson_id];
			}
		},
		goToPreviousLesson: (state) => {
			if (state.workbook.current_lesson_id > 0) {
				state.workbook.current_lesson_id -= 1;
				state.workbook.current_lesson = state.workbook.available_lessons[state.workbook.current_lesson_id];
			}
		},

		updateResponse: (state, action) => {
			state.data.responses[state.workbook.current_lesson_id] = action.payload;
		},
		updateOptionalResponse: (state, action) => {
			state.data.optional[state.workbook.current_lesson_id] = action.payload;
		},

		updateMiscResponse: (state, action) => {
			Object.assign(state.data.misc, action.payload);
		},
		setWorkbookClassroom: (state, action) => {
			state.classroom = action.payload;
		},
		loadConfigSave: (state, action) => {
			let data = action.payload;

			state.data.optional = data.optional;
			state.data.misc = data.misc;
			state.data.responses = data.responses;
			state.data.points_earned = data.points_earned;
			state.workbook.current_lesson = state.workbook.available_lessons[data.current_lesson];
		},
		updateEarnedPoints: (state) => {
			state.data.points_earned = state.data.responses.reduce((total, response) => {
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
	},
});

export const {
	setWorkbookData,
	setAvailableWorkbooksData,
	setCurrentUser,
	setUserClassrooms,
	setCurrentLessonData,
	goToPreviousLesson,
	goToNextLesson,
	updateResponse,
	updateOptionalResponse,
	setWorkbookClassroom,
	loadConfigSave,
	updateEarnedPoints,
	updateMiscResponse,
} = workbookSlice.actions;

export default workbookSlice.reducer;
