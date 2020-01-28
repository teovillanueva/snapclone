export interface IContact {
	id: number;
	name: string;
	avatar: string;
}

export const SET_CONTACTS = "SET_CONTACTS";
export const ADD_CONTACT = "ADD_CONTACT";

export interface ISetContactsAction {
	type: typeof SET_CONTACTS;
	contacts: IContact[];
}

export interface IAddContactAction {
	type: typeof ADD_CONTACT;
	contact: IContact;
}

export type ContactsActionTypes = ISetContactsAction | IAddContactAction;
