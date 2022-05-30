export interface Service {
	ID: number,
	ServiceName: string,
    Description: string,
	Price: number,
    InventoryTypeID: {ID: number, Name: string},
    Time: number,
    Units: {ID: number, Unit: string, Description: string},
    Image: string,
    IsMain: boolean,
    ApproximateTime: string
}