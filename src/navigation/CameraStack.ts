import { createStackNavigator } from "react-navigation-stack";

import Camera from "../views/Camera";
import MediaEditor from "../views/MediaEditor";
import SelectContact from "../views/SelectContact";

const CameraStack = createStackNavigator(
	{
		camera: {
			screen: Camera,
			navigationOptions: {
				headerShown: false
			}
		},
		media_editor: {
			screen: MediaEditor,
			navigationOptions: {
				gestureEnabled: false,
				headerShown: false
			}
		},
		select_contact: {
			screen: SelectContact,
			navigationOptions: {
				title: "Select a contact"
			}
		}
	},
	{
		initialRouteName: "camera"
	}
);

export default CameraStack;
