import React, { useEffect } from "react";

import { SafeAreaView, Text } from "react-native";

import ContactsList from "../components/containers/ContactsList";

import { connect } from "react-redux";

import { AppState } from "../redux/reducers";
import { IContact } from "../redux/types/contactTypes";

import { NavigationStackScreenProps } from "react-navigation-stack";
import { ISnap } from "../redux/types/snapTypes";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "../redux/types";
import { bindActionCreators } from "redux";
import { setMedia } from "../redux/actions/mediaActions";
import { deleteSnap } from "../redux/actions/snapsActions";
import { IMedia } from "../redux/types/mediaTypes";

type ContactsProps = NavigationStackScreenProps &
	ILinkStateProps &
	ILinkDispatchProps;

const Contacts: React.FC<ContactsProps> = props => {
	const showLatestSnap = (contact: IContact) => {
		const snaps = props.snaps.filter(snap => snap.user_id === contact.id);

		if (snaps[0]) {
			props.setMedia(snaps[0].media);
			props.navigation.navigate("media_view", {
				onFinish() {
					props.deleteSnap(snaps[0].id);
				}
			});
		}
	};

	return (
		<SafeAreaView>
			<ContactsList
				onSelectContact={showLatestSnap}
				snaps={props.snaps}
				itemType="withSnapInfo"
			/>
		</SafeAreaView>
	);
};

interface ILinkStateProps {
	snaps: ISnap[];
}

interface ILinkDispatchProps {
	setMedia?(media: IMedia): void;
	deleteSnap?(id: ISnap["id"]): void;
}

const mapStateToProps = (state: AppState) => {
	return {
		snaps: state.snaps
	};
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>) => {
	return {
		setMedia: bindActionCreators(setMedia, dispatch),
		deleteSnap: bindActionCreators(deleteSnap, dispatch)
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
