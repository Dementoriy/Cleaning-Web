import {Client} from "./ClientModel";
import {Address} from "./AddressModel";
import {Employee} from "./EmployeeModel";
import {Brigade} from "./BrigadeModel";
import {Contract} from "./ContractModel";

export interface Order {
	ID: number
	Status: string,
    ClientID: Client,
    Address: Address,
    EmployeeID: Employee,
    BrigadeID: Brigade,
    Date: Date,
    FinalPrice: number,
    ApproximateTime: number,
    Comment: string,
    ContractID: Contract,
    Rating: number
}