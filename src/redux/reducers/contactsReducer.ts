import { IContact, ContactsActionTypes } from "../types/contactTypes";

import ContactsMockData from "../../mocks/contacts.json";

const initialState: IContact[] = ContactsMockData;

const contactsReducer = (
	state = initialState,
	action: ContactsActionTypes
): typeof initialState => {
	switch (action.type) {
		case "SET_CONTACTS":
			return action.contacts;

		case "ADD_CONTACT":
			return [action.contact, ...state];

		default:
			return state;
	}
};

export default contactsReducer;
