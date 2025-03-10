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
		autosave: false,
	},
	data: {
		responses: [],
		optional: [],
		misc: {},
		points_earned: 0,
		lessons_completed: 0,
		completion: 0,
		last: 0,
	},
	save_status: true,
	is_saving: false,
	is_using_backup: false,
	last_saved: "",
};

export const workbookSlice = createSlice({
	name: "workbookState",
	initialState,
	reducers: {
		setSlug: (state, action) => {
			state.workbook.slug = action.payload.slug;
		},
		setLastLesson: (state, action) => {
			state.data.last = action.payload;
		},
		setWorkbookData: (state, action) => {
			let totalLessons = action.payload.data.reduce((total, section) => {
				let temp = section.lessons.map((lesson) => ({ section: section.title, ...lesson }));
				return total.concat(temp);
			}, []);
			state.workbook.title = action.payload.title;
			state.workbook.available_sections = action.payload.data;

			state.workbook.available_lessons = totalLessons;

			state.workbook.slug = action.payload.slug;

			if (!action.payload?.initLesson) state.workbook.current_lesson = action.payload.data[0].lessons[0];
			else {
				const initLesson = parseInt(action.payload.initLesson);
				let temp = initLesson >= 0 && initLesson < totalLessons.length ? initLesson : 0;

				state.workbook.current_lesson_id = temp;
				state.workbook.current_lesson = totalLessons[temp];
			}
		},
		// Updated
		setSavingSucceeded: (state, action) => {
			state.save_status = true;
			state.is_saving = false;
			if (action.payload) state.user.save_id = action.payload;
		},
		setAvailableWorkbooksData: (state, action) => {
			state.workbook.available_workbooks = action.payload;
		},

		setCurrentUser: (state, action) => {
			state.user.id = action?.payload?.id ?? null;
			state.user.username = action?.payload?.username ?? null;
		},
		setWorkbookId: (state, action) => {
			state.workbook.id = action.payload;
		},
		setUserClassrooms: (state, action) => {
			state.user.classroom_list = action.payload;
		},
		setCurrentLessonData: (state, action) => {
			state.workbook.current_lesson_id = action.payload.lessonID;
			state.data.last = action.payload.lessonID; //TODO Remove this bit of redundancy...
			state.workbook.current_lesson = action.payload;
		},
		updateResponse: (state, action) => {
			state.data.responses[state.workbook.current_lesson_id] = action.payload;
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
			const current = action.payload.data.last ?? 0;

			Object.assign(state.data, action.payload.data);
			Object.assign(state.user.selected_classroom, action.payload.meta.classroom);
			state.workbook.autosave = true;
			state.last_saved = action.payload.meta.lastSaved;

			state.workbook.current_lesson_id = current;
			state.workbook.current_lesson = state.workbook.available_lessons[current];

			state.user.save_id = action.payload.workbook_save_id;
		},
		loadBackupSave: (state, action) => {
			const current = JSON.parse(action.payload.data).last;
			// state.user.save_id = action.payload?.id || null;
			Object.assign(state.data, JSON.parse(action.payload.data));
			Object.assign(state.user.selected_classroom, action.payload.classroom);
			state.is_using_backup = true;
			state.workbook.autosave = true;

			state.workbook.current_lesson_id = current;
			state.workbook.current_lesson = state.workbook.available_lessons[current];
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

		updateAutoSaveState: (state, action) => {
			state.workbook.autosave = action.payload;
		},

		updateBackupState: (state, action) => {
			state.is_using_backup = action.payload;
		},
		updatePoints: (state) => {
			const total = state.data.responses.reduce((accum, response) => {
				if (response) {
					if (response.points !== undefined) {
						return (accum += response.points);
					}

					if (typeof response == "object" && response.response != "") {
						return (accum += 1);
					}

					if (typeof response == "string" && response.trim() != "") {
						return (accum += 1);
					}
				}
				return accum;
			}, 0);

			state.data.points_earned = total;
			// state.data.completion = parseInt((total / state.workbook.available_points) * 100);
			state.data.completion = 0;
		},
	},
});

export const {
	setSlug,
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
	updatePoints,
	loadBackupSave,
	updateBackupState,
	setLastLesson,
	setWorkbookId,
	setSavingSucceeded,
} = workbookSlice.actions;

export default workbookSlice.reducer;
