import React from "react";

import { createStackNavigator } from "react-navigation-stack";

import MediaView from "../views/MediaView";
import Contacts from "../views/Contacts";
import AddContact from "../views/AddContact";

import { TouchableOpacity } from "react-native";
import { Ionicons as Icon } from "@expo/vector-icons";

const ContactsStack = createStackNavigator(
	{
		contacts: {
			screen: Contacts,
			navigationOptions: ({ navigation }) => ({
				title: "Contacts",
				headerRight: () => (
					<TouchableOpacity
						onPress={() => {
							navigation.navigate("add_contact");
						}}
					>
						<Icon
							name="ios-add"
							style={{ padding: 5, paddingRight: 10 }}
							size={33}
						/>
					</TouchableOpacity>
				)
			})
		},
		media_view: {
			screen: MediaView,
			navigationOptions: {
				gestureEnabled: false,
				headerShown: false
			}
		},
		add_contact: {
			screen: AddContact,
			navigationOptions: {
				headerShown: false,
				gestureEnabled: false
			}
		}
	},

	{
		initialRouteName: "contacts"
	}
);

export default ContactsStack;
