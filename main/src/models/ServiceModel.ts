export interface Service {
	ID: number,
	ServiceName: string,
    Description: string,
	Price: number,
    Time: number,
    UnitsTitle: string,
    Image: string | null,
    IsMain: boolean,
    ApproximateTime: string
}