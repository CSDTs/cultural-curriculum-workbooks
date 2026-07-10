import { createSlice } from "@reduxjs/toolkit";

interface SelectedClassroom {
	id: number | string | null;
	name: string;
}

interface UserState {
	id: number | null;
	username: string | null;
	classroom_list: any[] | null;
	save_id: number | null;
	selected_classroom: SelectedClassroom;
}

interface WorkbookMeta {
	id: number;
	slug: string;
	title: string;
	current_lesson: Record<string, any>;
	current_lesson_id: number;
	available_workbooks: any[];
	available_lessons: any[];
	available_sections: any[];
	available_points: number;
	is_finished: boolean;
	autosave: boolean;
}

export interface ResponseItem {
	response?: any;
	points?: number;
	question?: string;
	[key: string]: any;
}

interface WorkbookDataState {
	responses: (ResponseItem | string)[];
	optional: any[];
	misc: Record<string, any>;
	points_earned: number;
	lessons_completed: number;
	completion: number;
	last: number;
}

export interface WorkbookState {
	user: UserState;
	workbook: WorkbookMeta;
	data: WorkbookDataState;
	save_status: boolean;
	is_saving: boolean;
	is_using_backup: boolean;
	last_saved: string;
}

const initialState: WorkbookState = {
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
			let totalLessons = action.payload.data.reduce((total: any[], section: { title: string; lessons: any[] }) => {
				let temp = section.lessons.map((lesson: any) => ({ section: section.title, ...lesson }));
				return total.concat(temp);
			}, [] as any[]);
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
		updateResponseAt: (state, action) => {
			state.data.responses[action.payload.index] = action.payload.value;
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
			const payload = action.payload;
			if (!payload || typeof payload !== "object" || !payload.data || typeof payload.data !== "object") {
				console.error("loadConfigSave: malformed config payload", payload);
				return;
			}

			const current = Math.min(
				Math.max(Number(payload.data.last) || 0, 0),
				Math.max(state.workbook.available_lessons.length - 1, 0)
			);

			Object.assign(state.data, payload.data);
			if (payload.meta && typeof payload.meta === "object") {
				Object.assign(state.user.selected_classroom, payload.meta.classroom);
				state.last_saved = payload.meta.lastSaved;
			}
			state.workbook.autosave = true;

			state.workbook.current_lesson_id = current;
			state.workbook.current_lesson = state.workbook.available_lessons[current];

			state.user.save_id = payload.workbook_save_id;

			// Django injects the authoritative workbook id into the config global
			// (as a string, e.g. "1"). Use it directly so saves are attributed correctly
			// in production without waiting on the async slug-match in useWorkbook.
			if (payload.workbook_id != null) state.workbook.id = Number(payload.workbook_id);
		},
		loadBackupSave: (state, action) => {
			let parsedData;
			try {
				parsedData = JSON.parse(action.payload.data);
			} catch (err) {
				console.error(err);
				parsedData = state.data;
			}
			const current = Math.min(Number(parsedData.last) || 0, Math.max(state.workbook.available_lessons.length - 1, 0));
			// state.user.save_id = action.payload?.id || null;
			Object.assign(state.data, parsedData);
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
					if (typeof response == "object" && response.points !== undefined) {
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
	updateResponse,
	updateResponseAt,
	setWorkbookClassroom,
	loadConfigSave,
	setSaveDataId,
	updateSaveStatus,
	setAvailablePoints,
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
