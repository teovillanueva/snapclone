import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import { withNavigation, NavigationRoute } from "react-navigation";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setMedia } from "../redux/actions/mediaActions";
import { deleteSnap } from "../redux/actions/snapsActions";

import { IMedia } from "../redux/types/mediaTypes";
import { AppActions } from "../redux/types";
import { ThunkDispatch } from "redux-thunk";
import { IContact } from "../redux/types/contactTypes";
import { AppState } from "../redux/reducers";
import { ISnap } from "../redux/types/snapTypes";
import {
	NavigationTabScreenProps,
	NavigationTabProp
} from "react-navigation-tabs";

interface IContactListItemProps {
	contact: IContact;
	snaps?: ISnap[];
	onSelect(contact: IContact): void;
	type: "plain" | "withSnapInfo";
}

const ContactListItem: React.FC<IContactListItemProps> = props => {
	const contact = props.contact;
	const snaps = props.snaps;

	return (
		<TouchableOpacity
			onPress={() => {
				props.onSelect(props.contact);
			}}
			style={styles.container}
		>
			<Image style={styles.avatar} source={{ uri: contact.avatar }} />
			<View style={{ flex: 1 }}>
				<Text>{contact.name}</Text>
				{props.type === "withSnapInfo" ? (
					<Text>{snaps.length > 0 ? "Tap to view" : "No snaps"}</Text>
				) : null}
			</View>
			{props.type === "withSnapInfo" && snaps.length > 0 && (
				<View
					style={{
						...styles.badge,
						backgroundColor: snaps[0].media.type === "image" ? "pink" : "violet"
					}}
				>
					<Text style={{ marginLeft: 2 }}>{snaps.length}</Text>
				</View>
			)}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		padding: 10,
		flexDirection: "row",
		alignItems: "center"
	},
	avatar: {
		width: 40,
		height: 40,
		borderRadius: 40,
		marginRight: 10
	},
	badge: {
		width: 25,
		height: 25,
		borderRadius: 25,
		alignItems: "center",
		justifyContent: "center"
	}
});

export default ContactListItem;
