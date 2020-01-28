import React, { useState, useEffect } from "react";

import { Camera as CameraView } from "expo-camera";
import { BarCodeScanningResult } from "expo-camera/build/Camera.types";

import {
	StyleSheet,
	SafeAreaView,
	TextInput,
	TouchableOpacity,
	Text,
	View,
	Alert
} from "react-native";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { addContactAsync } from "../redux/actions/contactActions";

import { NavigationStackScreenProps } from "react-navigation-stack";
import { AppState } from "../redux/reducers";
import { IContact } from "../redux/types/contactTypes";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "../redux/types";

type AddContactProps = NavigationStackScreenProps &
	ILinkStateProps &
	ILinkDispatchProps;

const AddContact: React.FC<AddContactProps> = props => {
	const [hasPermission, setHasPermission] = useState<boolean>(null);

	const [name, setName] = useState<string>(null);
	const [qrScanned, setQrScanned] = useState(false);

	useEffect(() => {
		(async () => {
			const { status } = await CameraView.requestPermissionsAsync();
			setHasPermission(status === "granted");
		})();
	}, []);

	const getNextId = (): number => {
		return props.contacts[props.contacts.length - 1].id + 1;
	};

	const addContactByName = () => {
		props.addContact({
			id: getNextId(),
			name,
			avatar:
				"https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
		});
		props.navigation.goBack();
	};

	const onQrScanned = (result: BarCodeScanningResult) => {
		if (!qrScanned) {
			try {
				setQrScanned(true);
				const data: IContact = JSON.parse(result.data);
				if (data.id && data.name && data.avatar) {
					const found = props.contacts.filter(
						contact => contact.id === data.id
					)[0];
					console.log(found);
					if (!found) {
						props.addContact(data);
						props.navigation.goBack();
					} else {
						Alert.alert(
							"here was an error adding the user",
							`You have already added ${data.name}`
						);
						setQrScanned(false);
					}
				} else {
					throw new Error();
				}
			} catch (error) {
				Alert.alert(
					"There was an error adding the user",
					"The scanned qr is invalid"
				);
				setQrScanned(false);
			}
		}
	};

	return (
		<CameraView
			style={styles.camera}
			type={CameraView.Constants.Type.back}
			flashMode={CameraView.Constants.FlashMode.auto}
			onBarCodeScanned={onQrScanned}
		>
			<SafeAreaView style={styles.container}>
				<TextInput
					onChangeText={text => setName(text)}
					placeholder="Username"
					style={styles.input}
				/>
				<TouchableOpacity onPress={addContactByName} style={styles.button}>
					<Text>Add</Text>
				</TouchableOpacity>
			</SafeAreaView>
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<View
					style={{
						width: 240,
						height: 240,
						marginBottom: 25,
						borderWidth: 5,
						borderColor: "white",
						alignItems: "center",
						justifyContent: "center"
					}}
				>
					<Text style={{ color: "white", textAlign: "center", fontSize: 11 }}>
						You can add a contact by scanning its qr code or writing its name
						manually.
					</Text>
				</View>
			</View>
			<SafeAreaView style={{ alignItems: "center" }}>
				<TouchableOpacity
					style={{
						marginBottom: 20,
						padding: 10,
						borderWidth: 2,
						borderColor: "white"
					}}
					onPress={() => {
						props.navigation.goBack();
					}}
				>
					<Text style={{ color: "white" }}>Cancel</Text>
				</TouchableOpacity>
			</SafeAreaView>
		</CameraView>
	);
};

const styles = StyleSheet.create({
	camera: {
		flex: 1
	},
	container: {
		flexDirection: "row",
		margin: 20,
		marginTop: 30
	},
	input: {
		flex: 1,
		padding: 15,
		backgroundColor: "white"
	},
	button: {
		backgroundColor: "lightblue",
		padding: 10,
		justifyContent: "center",
		alignItems: "center"
	}
});

interface ILinkStateProps {
	contacts: IContact[];
}

interface ILinkDispatchProps {
	addContact(contact: IContact): void;
}

const mapStateToProps = (state: AppState) => {
	return {
		contacts: state.contacts
	};
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>) => {
	return {
		addContact: bindActionCreators(addContactAsync, dispatch)
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AddContact);
