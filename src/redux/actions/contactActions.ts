import { IContact } from "../types/contactTypes";
import { AppActions } from "../types";
import { Dispatch } from "redux";

// import { ISnap } from "../types/snapTypes";

// import { AppActions } from "../types";

// export const deleteSnap = (id: ISnap["id"]): AppActions => {
// 	return {
// 		type: "DELETE_SNAP",
// 		id
// 	};
// };

export const setContacts = (contacts: IContact[]): AppActions => {
	return {
		type: "SET_CONTACTS",
		contacts
	};
};

export const addContact = (contact: IContact): AppActions => {
	return {
		type: "ADD_CONTACT",
		contact
	};
};

export const addContactAsync = (contact: IContact) => {
	return (dispatch: Dispatch<AppActions>) => {
		setTimeout(() => {
			dispatch(addContact(contact));
		}, 820);
	};
};
