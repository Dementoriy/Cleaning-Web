import {Address} from "./AddressModel";
import { ProvidedServices } from "./ProvidedServicesModel";
import {Consumable} from "./ConsumableModel";

export interface Order {
        ID: number,
        Status: string,
        Address: Address,
        Date: string,
        FinalPrice: number,
        ApproximateTime: string,
        Comment: string,
        Rating: number | null,
        ProvidedServices : ProvidedServices[],
        Consumables : Consumable[]
}