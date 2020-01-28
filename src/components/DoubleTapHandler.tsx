import React, { useState } from "react";
import { TouchableWithoutFeedback, GestureResponderEvent } from "react-native";

interface IDoubleTapHandlerProps {
	useDelta: number;
	onDoubleTap(event?: GestureResponderEvent): void;
}

const DoubleTapHandler: React.FC<IDoubleTapHandlerProps> = props => {
	const [lastPress, setLastPress] = useState<number>(null);

	const pressHandler = (e: GestureResponderEvent) => {
		const delta = Date.now() - lastPress;
		if (delta <= props.useDelta) {
			props.onDoubleTap(e);
		}
		setLastPress(Date.now());
	};

	return (
		<TouchableWithoutFeedback onPress={pressHandler}>
			{props.children}
		</TouchableWithoutFeedback>
	);
};

export default DoubleTapHandler;
