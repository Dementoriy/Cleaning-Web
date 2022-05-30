import {Client} from "./ClientModel";
import {Employee} from "./EmployeeModel";

export interface Contract {
	id: number,
	EmployeeID: Employee,
    ClientID: Client,
    DateOfContract: string
}