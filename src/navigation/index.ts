import { createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";

import ContactsStack from "./ContactsStack";
import CameraStack from "./CameraStack";

const Navigation = createAppContainer(
	createMaterialTopTabNavigator(
		{
			contacts: {
				screen: ContactsStack
			},
			camera: {
				screen: CameraStack
			}
		},
		{
			initialRouteName: "camera",
			tabBarPosition: "bottom",
			tabBarComponent: null,
			defaultNavigationOptions: ({ navigation }) => {
				return { swipeEnabled: navigation.getParam("swipeEnabled", true) };
			}
		}
	)
);

export default createAppContainer(Navigation);
