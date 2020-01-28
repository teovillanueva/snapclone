import React, { useEffect } from "react";
import { Image, StyleSheet, TouchableWithoutFeedback } from "react-native";

import { Video } from "expo-av";

import { NavigationStackScreenProps } from "react-navigation-stack";

import { connect } from "react-redux";

import { AppState } from "../redux/reducers";
import { IMedia } from "../redux/types/mediaTypes";
import { PlaybackStatus } from "expo-av/build/AV";

type MediaViewProps = NavigationStackScreenProps & ILinkStateProps;

const MediaView: React.FC<MediaViewProps> = props => {
	const media = props.media;
	const onFinish = props.navigation.getParam(
		"onFinish",
		() => null
	) as () => void;

	const returnToMessages = () => {
		onFinish();
		props.navigation.goBack();
	};

	const onStatusChange = (video: PlaybackStatus) => {
		if (video.isLoaded) {
			if (video.didJustFinish) {
				returnToMessages();
			}
		}
	};

	useEffect(() => {
		props.navigation.dangerouslyGetParent().setParams({ swipeEnabled: false });

		if (media.type === "image") {
			setTimeout(() => {
				returnToMessages();
			}, 5000);
		}

		return () => {
			clearInterval();
			props.navigation.dangerouslyGetParent().setParams({ swipeEnabled: true });
		};
	}, []);

	return (
		<TouchableWithoutFeedback onPress={returnToMessages}>
			{media.type === "image" ? (
				<Image source={{ uri: media.uri }} style={styles.media} />
			) : (
				<Video
					source={{ uri: media.type }}
					style={styles.media}
					shouldPlay
					onPlaybackStatusUpdate={onStatusChange}
					resizeMode="cover"
				/>
			)}
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	media: {
		flex: 1
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

export default connect(mapStateToProps)(MediaView);
