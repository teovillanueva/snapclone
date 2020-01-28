import { IMedia } from "./mediaTypes";

export interface ISnap {
	id: number;
	user_id: number;
	media: IMedia;
}

export const SET_SNAPS = "SET_SNAPS";
export const DELETE_SNAP = "DELETE_SNAP";
export const ADD_SNAP = "ADD_SNAP";

export interface ISetSnapsAction {
	type: typeof SET_SNAPS;
	snaps: ISnap[];
}

export interface IDeleteSnapAction {
	type: typeof DELETE_SNAP;
	id: ISnap["id"];
}

export interface IAddSnapAction {
	type: typeof ADD_SNAP;
	snap: ISnap;
}

export type SnapActionTypes =
	| ISetSnapsAction
	| IDeleteSnapAction
	| IAddSnapAction;
