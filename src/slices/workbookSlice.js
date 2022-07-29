import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: {
		id: null,
		username: "",
		classroom_list: null,
		save_id: null,
		selected_classroom: {
			id: null,
			name: "",
		},
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
		available_points: 0,
		is_finished: false,
	},
	data: {
		responses: [],
		optional: [],
		misc: {},
		last_saved: "",
		points_earned: 0,
		lessons_completed: 0,
		completion: 0,
	},
	save_status: true,
	is_saving: false,
	autosave: false,
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

		updateObjectResponse: (state, action) => {
			if (!state.data.responses[state.workbook.current_lesson_id])
				state.data.responses[state.workbook.current_lesson_id] = action.payload;
			else Object.assign(state.data.responses[state.workbook.current_lesson_id], action.payload);
		},

		updateOptionalResponse: (state, action) => {
			state.data.optional[state.workbook.current_lesson_id] = action.payload;
		},

		updateMiscResponse: (state, action) => {
			Object.assign(state.data.misc, action.payload);
		},
		setWorkbookClassroom: (state, action) => {
			// state.data.classroom = action.payload;
			state.user.selected_classroom = action.payload;
		},

		setSaveDataId: (state, action) => {
			// state.data.id = action.payload;
			state.user.save_id = action.payload;
		},
		loadConfigSave: (state, action) => {
			state.user.save_id = action.payload?.workbook_save_id || null;
			Object.assign(state.data, action.payload.data);
			Object.assign(state.user.selected_classroom, action.payload.meta.classroom);
		},

		setAvailablePoints: (state, action) => {
			state.workbook.available_points = action.payload;
		},
		updateSaveStatus: (state, action) => {
			state.save_status = action.payload;
		},
		updateIsSavingStatus: (state, action) => {
			state.is_saving = action.payload;
		},
		updateWorkbookFinished: (state, action) => {
			state.workbook.is_finished = action.payload;
		},
		updateAutoSaveState: (state, action) => {
			state.workbook.autosave = action.payload;
		},
		updateEarnedPoints: (state) => {
			state.data.points_earned = state.data.responses.reduce((total, response, index) => {
				let current = 0;

				if (state.workbook.available_lessons[index].points && state.workbook.available_lessons[index].points > 0) {
					if (response !== null) {
						if (typeof response == "object") {
							if (Array.isArray(response)) {
								current += response.reduce((acc, obj) => {
									return acc + obj;
								}, 0);
							} else if (Object.keys(response).length > 0) {
								current += Object.keys(response).reduce((acc, obj) => {
									return acc + response[obj]?.verified || 0;
								}, false);
							}
						} else if (typeof response == "string") {
							current += response != "" ? 1 : 0;
							return total + current;
						}
					}
				}

				return total + current;
			}, 0);

			state.data.completion = parseInt((state.data.points_earned / state.workbook.available_points) * 100);
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
	setSaveDataId,
	updateMiscResponse,
	updateSaveStatus,
	setAvailablePoints,
	updateWorkbookFinished,
	updateObjectResponse,
	updateIsSavingStatus,
	updateAutoSaveState,
} = workbookSlice.actions;

export default workbookSlice.reducer;
