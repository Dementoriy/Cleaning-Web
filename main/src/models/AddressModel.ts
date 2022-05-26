export interface Address {
	ID: number
	CityDistrict: string | null,
	Settlement: string | null,
    Street: string,
    HouseNumber: string,
    Block: string | null,
    ApartmentNumber: string, 
    RoomTypeID: string, 
    AddressName: string
}