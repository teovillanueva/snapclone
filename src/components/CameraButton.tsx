import React, { Fragment, useState, useRef } from "react";
import { TouchableWithoutFeedback, StyleSheet, View } from "react-native";

interface ICameraButtonProps {
	onPicture(): void;
	onStartRecording(): void;
	onStopRecording(): void;
}

const CameraButton: React.FC<ICameraButtonProps> = props => {
	const [startTime, setStartTime] = useState<number>(null);
	const [stopTime, setStopTime] = useState<number>(null);

	const startRef = useRef(startTime);
	startRef.current = startTime;
	const stopRef = useRef(stopTime);
	stopRef.current = stopTime;

	const [recording, setRecording] = useState(false);

	const handleStart = () => {
		const start = Date.now();
		setStartTime(start);
		startRef.current = start;
		setTimeout(() => {
			if (startRef.current > stopRef.current) {
				setRecording(true);
				props.onStartRecording();
			}
		}, 201);
	};

	const handleStop = () => {
		const stop = Date.now();
		setStopTime(stop);
		stopRef.current = stop;

		const delta = stopRef.current - startRef.current;

		if (delta > 200) {
			props.onStopRecording();
		}

		setRecording(false);
	};

	const handlePress = () => {
		const delta = stopRef.current - startRef.current;
		if (delta <= 200) {
			props.onPicture();
		}
	};

	return (
		<TouchableWithoutFeedback
			onPress={handlePress}
			onPressIn={handleStart}
			onPressOut={handleStop}
		>
			<View
				style={[styles.container, { borderColor: recording ? "red" : "white" }]}
			></View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 35,
		borderRadius: 40,
		borderWidth: 5,
		borderColor: "white",
		alignSelf: "center"
	}
});

export default CameraButton;
