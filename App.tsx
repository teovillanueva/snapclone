import React from "react";

import { Provider as ReduxProvider } from "react-redux";
import store from "./src/redux/store";

import SnapClone from "./src/SnapClone";

export default function App() {
	return (
		<ReduxProvider store={store}>
			<SnapClone />
		</ReduxProvider>
	);
}
