import { IMedia } from "../types/mediaTypes";

import { AppActions } from "../types";

export const setMedia = (media: IMedia): AppActions => {
	return {
		type: "SET_MEDIA",
		media
	};
};
