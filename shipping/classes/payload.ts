export interface Payload {
    client_sender:    string;
    order_number:     string;
    delivery_date:    string;
    delivery_service: string;
    notes:            string;
    pickup:           Dropoff;
    dropoff:          Dropoff;
    packages:         Package[];
    tags:             Tags;
}

export interface Dropoff {
    contact:  Contact;
    location: Location;
}

export interface Contact {
    name:     string;
    lastname: string;
    email:    string;
    phone:    string;
    id:       string;
}

export interface Location {
    street:       string;
    number:       string;
    floor:        string;
    apartment:    string;
    city:         string;
    state:        string;
    postalCode:   string;
    instructions: string;
    country:      string;
    latitude:     number;
    longitude:    number;
}

export interface Package {
    item: Item;
}

export interface Item {
    description: string;
    price:       number;
    weight:      number;
    length:      number;
    width:       number;
    height:      number;
    quantity:    number;
}

export interface Tags {
    brand: string;
}
