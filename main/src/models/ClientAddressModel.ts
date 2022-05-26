import {Client} from "./ClientModel";
import {Address} from "./AddressModel";

export interface ClientAddress {
	id: number
	AddressID: Address,
    ClientID: Client,
    Name: string
}