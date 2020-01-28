import { createStore, applyMiddleware } from "redux";

import thunk, { ThunkMiddleware } from "redux-thunk";

import rootReducer from "./reducers";

import { AppState } from "react-native";
import { AppActions } from "./types";

const store = createStore(
	rootReducer,
	applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>)
);

export default store;
