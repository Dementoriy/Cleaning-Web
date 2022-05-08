export interface Client {
	id: number
	surname: string,
	name: string,
	middleName: string | null,
	email: string,
	phone: string,
	login: string,
    isOld: boolean,
	avatar: string | undefined
}