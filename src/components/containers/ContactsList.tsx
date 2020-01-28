import React, { useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";

import { IContact } from "../../redux/types/contactTypes";
import ContactListItem from "../ContactListItem";
import { connect } from "react-redux";
import { AppState } from "../../redux/reducers";
import { ISnap } from "../../redux/types/snapTypes";

interface IContactsListProps {
	contacts?: IContact[];
	onSelectContact(contact: IContact): void;
	itemType: "plain" | "withSnapInfo";
	snaps?: ISnap[];
}

const ContactsList: React.FC<IContactsListProps> = props => {
	return (
		<FlatList
			style={styles.container}
			data={props.contacts}
			keyExtractor={(item, index) => `list-item-${index}`}
			renderItem={({ item }) => (
				<ContactListItem
					onSelect={props.onSelectContact}
					key={item.id}
					type={props.itemType}
					contact={item}
					snaps={
						props.itemType === "withSnapInfo" && props.snaps
							? props.snaps.filter(snap => snap.user_id === item.id)
							: null
					}
				/>
			)}
		/>
	);
};

const styles = StyleSheet.create({
	container: {
		height: "100%"
	}
});

const mapStateToProps = (state: AppState) => {
	return {
		contacts: state.contacts
	};
};

export default connect(mapStateToProps)(ContactsList);
