import { IMedia, MediaActionTypes } from "../types/mediaTypes";

const initialState: IMedia = null;

const mediaReducer = (
	state = initialState,
	action: MediaActionTypes
): typeof initialState => {
	switch (action.type) {
		case "SET_MEDIA":
			return action.media;

		default:
			return state;
	}
};

export default mediaReducer;
