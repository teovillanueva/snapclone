export interface IMedia {
	type: "image" | "video";
	uri: string;
}

// Actions
export const SET_MEDIA = "SET_MEDIA";

export interface ISetMediaAction {
	type: typeof SET_MEDIA;
	media: IMedia;
}

export type MediaActionTypes = ISetMediaAction;
