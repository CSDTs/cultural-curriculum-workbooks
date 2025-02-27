import produce from "immer";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type Classroom = {
	id: number;
	name: string;
};
interface AccountState {
	id: number;
	username: string;
	classroom_list: Classroom[];
	save_id?: number;
	selected_classroom?: Classroom;

	updateUser: (id: number, username: string) => void;
}

const useAccountState = create<AccountState>()((set) => ({
	id: -1,
	username: "",
	classroom_list: [],
	save_id: -1,
	selected_classroom: {
		id: -1,
		name: "",
	},
	updateUser: (id, username) => set((state) => ({ username: username, id: id })),
}));

export { useAccountState };
