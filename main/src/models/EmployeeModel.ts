import {Position} from "./PositionModel";
import {Brigade} from "./BrigadeModel";

export interface Employee {
	id: number
    PassportData: string,
    PositionID: Position,
    BrigadeID: Brigade | null,
    EmploymentDate: Date,
	surname: string,
	name: string,
	middleName: string | null,
	PhoneNumber: string,
	Login: string | null,
    Password: string | null
}