import { ISnap } from "../types/snapTypes";

import { AppActions } from "../types";
import { Dispatch } from "redux";

export const deleteSnap = (id: ISnap["id"]): AppActions => {
	return {
		type: "DELETE_SNAP",
		id
	};
};

export const addSnap = (snap: ISnap): AppActions => {
	return {
		type: "ADD_SNAP",
		snap
	};
};

export const addSnapAsync = (snap: ISnap) => {
	return (dispatch: Dispatch<AppActions>) => {
		setTimeout(() => {
			dispatch(addSnap(snap));
		}, 820);
	};
};
