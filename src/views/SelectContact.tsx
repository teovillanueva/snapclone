import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";

import ContactsList from "../components/containers/ContactsList";

import { connect } from "react-redux";
import { addSnapAsync } from "../redux/actions/snapsActions";
import { bindActionCreators } from "redux";

import { NavigationStackScreenProps } from "react-navigation-stack";
import { IContact } from "../redux/types/contactTypes";
import { AppState } from "../redux/reducers";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "../redux/types";
import { ISnap } from "../redux/types/snapTypes";
import { IMedia } from "../redux/types/mediaTypes";

type SelectContactProps = NavigationStackScreenProps &
	ILinkStateProps &
	ILinkDispatchProps;

const SelectContact: React.FC<SelectContactProps> = props => {
	const getNextSnapID = (): number => {
		const last_snap = props.snaps[props.snaps.length - 1];
		return last_snap ? last_snap.id + 1 : 1;
	};

	const sendSnapToContact = (contact: IContact) => {
		props.addSnap({
			id: getNextSnapID(),
			media: props.media,
			user_id: contact.id
		});
		props.navigation.popToTop();
	};

	return (
		<SafeAreaView>
			<ContactsList itemType="plain" onSelectContact={sendSnapToContact} />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	list: {
		height: "100%"
	}
});

interface ILinkStateProps {
	contacts: IContact[];
	media: IMedia;
	snaps: ISnap[];
}

interface ILinkDispatchProps {
	addSnap(snap: ISnap): void;
}

const mapStateToProps = (state: AppState) => {
	return {
		contacts: state.contacts,
		media: state.media,
		snaps: state.snaps
	};
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>) => {
	return {
		addSnap: bindActionCreators(addSnapAsync, dispatch)
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectContact);
