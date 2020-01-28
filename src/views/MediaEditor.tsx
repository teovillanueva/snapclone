import React, { useEffect, useState } from "react";
import {
	Text,
	View,
	Image,
	StyleSheet,
	SafeAreaView,
	Alert,
	ActivityIndicator
} from "react-native";

import { Ionicons as Icon } from "@expo/vector-icons";

import * as MediaLibrary from "expo-media-library";
import { Video } from "expo-av";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { NavigationTabScreenProps } from "react-navigation-tabs";
import { TouchableOpacity } from "react-native-gesture-handler";

import SendButton from "../components/SendButton";

import { IMedia } from "../redux/types/mediaTypes";
import { AppState } from "../redux/reducers";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "../redux/types";

type MediaEditorProps = NavigationTabScreenProps & ILinkStateProps;

const MediaEditor: React.FC<MediaEditorProps> = props => {
	const media_uri = props.media.uri;
	const media_type = props.media.type;

	const [saving, setSaving] = useState(false);

	useEffect(() => {
		props.navigation.dangerouslyGetParent().setParams({ swipeEnabled: false });

		return () => {
			props.navigation.dangerouslyGetParent().setParams({ swipeEnabled: true });
		};
	}, []);

	const saveMedia = async () => {
		const { granted } = await MediaLibrary.requestPermissionsAsync();

		if (granted) {
			setSaving(true);
			await MediaLibrary.saveToLibraryAsync(media_uri);
			Alert.alert(`Saved ${media_type} to camera roll!`);
			setSaving(false);
		}
	};

	const discardMedia = async () => {
		props.navigation.goBack();
	};

	const MediaControls = () => {
		return (
			<View style={styles.mediaControlContainer}>
				<TouchableOpacity onPress={discardMedia}>
					<Icon
						style={{ padding: 7 }}
						name="ios-close"
						color="white"
						size={33}
					/>
				</TouchableOpacity>
				<View style={{ flexDirection: "row" }}>
					{saving ? (
						<ActivityIndicator style={{ marginBottom: 3, marginRight: 3 }} />
					) : (
						<TouchableOpacity onPress={saveMedia}>
							<Icon
								style={{ padding: 7 }}
								name="ios-download"
								color="white"
								size={28}
							/>
						</TouchableOpacity>
					)}
					<TouchableOpacity>
						<Icon
							style={{ padding: 7, marginLeft: 7 }}
							name="ios-brush"
							color="white"
							size={28}
						/>
					</TouchableOpacity>
				</View>
			</View>
		);
	};

	return (
		<View style={styles.container}>
			{media_type === "image" ? (
				<Image source={{ uri: media_uri }} style={styles.image} />
			) : (
				<Video
					source={{ uri: media_uri }}
					style={styles.video}
					isLooping
					shouldPlay
					resizeMode="cover"
				/>
			)}
			<SafeAreaView style={styles.overlay}>
				<MediaControls />
				<SendButton
					style={{ position: "absolute", bottom: 20, right: 20 }}
					onPress={() => {
						props.navigation.navigate("select_contact");
					}}
				/>
			</SafeAreaView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	image: {
		flex: 1
	},
	video: {
		flex: 1
	},
	overlay: {
		...(StyleSheet.absoluteFill as object)
	},
	mediaControlContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 10,
		paddingTop: 0
	}
});

interface ILinkStateProps {
	media: IMedia;
}

const mapStateToProps = (state: AppState) => {
	return {
		media: state.media
	};
};
export default connect(mapStateToProps)(MediaEditor);
