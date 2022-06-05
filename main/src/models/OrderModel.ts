import {Address} from "./AddressModel";
import {Service} from "./ServiceModel";

export interface Order {
        ID: number,
        Status: string,
        Address: Address,
        Date: Date,
        FinalPrice: number,
        ApproximateTime: string,
        Comment: string,
        Rating: number | null,

        ProvidedServices : {
            Id: number,
            Amount: number,
            Service: Service,
        }[]
        
}