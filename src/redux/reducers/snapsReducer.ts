import { ISnap, SnapActionTypes } from "../types/snapTypes";

import SnapsMockData from "../../mocks/snaps.json";

const initialState: ISnap[] = SnapsMockData as ISnap[];

const snapsReducer = (
	state = initialState,
	action: SnapActionTypes
): typeof initialState => {
	switch (action.type) {
		case "SET_SNAPS":
			return action.snaps;

		case "DELETE_SNAP":
			return state.filter(snap => snap.id !== action.id);

		case "ADD_SNAP":
			return [...state, action.snap];

		default:
			return state;
	}
};

export default snapsReducer;
