import React from "react";
import { StyleSheet, ViewStyle, StyleProp } from "react-native";

import { Ionicons as Icon } from "@expo/vector-icons";

import { TouchableOpacity } from "react-native-gesture-handler";

interface ISendButtonProps {
	style?: StyleProp<ViewStyle>;
	onPress(): void;
}

const SendButton: React.FC<ISendButtonProps> = props => {
	return (
		<TouchableOpacity
			onPress={props.onPress}
			style={{
				backgroundColor: "lightblue",
				width: 50,
				height: 50,
				alignItems: "center",
				justifyContent: "center",
				borderRadius: 50
			}}
			containerStyle={props.style}
		>
			<Icon style={styles.icon} name="ios-send" color="white" size={33} />
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	icon: {
		marginTop: 4
	}
});

export default SendButton;
