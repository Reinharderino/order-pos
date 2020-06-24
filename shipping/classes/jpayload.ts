export interface JPayload {
  currency: string;
  type: string;
  flow: string;
  from: From;
  to: From;
  internalCode: string;
  extra: Extra;
  conf: Conf;
}

export interface Conf {
  assurance: boolean;
  items: ItemElement[];
}

export interface ItemElement {
  item: ItemItem;
}

export interface ItemItem {
  description: string;
  price: number;
  weight: number;
  length: number;
  width: number;
  height: number;
  quantity: number;
}

export interface Extra {}

export interface From {
  street: string;
  number: string;
  floor: string;
  apartment: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  instructions: string;
  contact: Contact;
  message?: string;
}

export interface Contact {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}
