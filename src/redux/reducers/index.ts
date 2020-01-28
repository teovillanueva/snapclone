import { combineReducers } from "redux";

import mediaReducer from "./mediaReducer";
import contactsReducer from "./contactsReducer";
import snapsReducer from "./snapsReducer";

const rootReducer = combineReducers({
	media: mediaReducer,
	contacts: contactsReducer,
	snaps: snapsReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
