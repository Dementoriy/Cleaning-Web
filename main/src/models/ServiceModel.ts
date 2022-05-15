export interface Service {
	ID: number
	ServiceName: string,
    Description: string,
	Price: number,
    InventoryTypeID: {ID: number, Name: string},
    Time: number,
    UnitsID: {ID: number, Unit: string, Description: string},
    Image: string
}