export interface Workbook {
	description?: string;
	id: number;
	name: string;
	slug: string;
	tags?: string[];
}

export interface WorkbookData {
	id: number;
	slug: string;
	title: string;
	current_lesson: Object;
	current_lesson_id: number;
	available_workbooks: any[];
	available_lessons: any[];
	available_sections: any[];
	available_points: number;
	is_finished: boolean;
	autosave: boolean;
}

export type User = {
	first_name?: string;
	last_name?: string;
	id: number | null;
	username: string | null;
};
export type AuthResponse = {
	data: User;
	msg: string;
};

export type SerializedResponse = {
	owner: number;
	classroom: number | Object | null;
	workbook: number;
	data: any;
	progression: number;
	id?: number;
};

declare global {
	interface Window {
		world?: any;
	}
}
export type Lesson = {
	title: string;
	details?: string;
	tags: string;
	points: number;
	project?: string;
};

export type Section = {
	title: string;
	lessons: Lesson[];
};
