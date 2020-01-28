import { MediaActionTypes } from "./mediaTypes";
import { ContactsActionTypes } from "./contactTypes";
import { SnapActionTypes } from "./snapTypes";

export type AppActions =
	| MediaActionTypes
	| ContactsActionTypes
	| SnapActionTypes;
