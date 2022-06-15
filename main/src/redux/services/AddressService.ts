import axios from 'axios';
import authHeader from '../AuthHeader';
import {Answer} from "../../models/RequestModels";
import {Address} from "../../models/AddressModel";
const API_URL = "http://localhost:8080/address/";

class AddressService {

	addAddress(address: Address){
		return axios.post(API_URL + 'add-address', address, {headers: authHeader()})
			.then((res) => {
				const data: Answer = res.data;
				if (data.status){
					const newAddress : Address = data.answer.newAddress;
					localStorage.setItem('newAddress', JSON.stringify(address));
					return newAddress;
				}
				return address;
			}).catch((error) => {
				console.log(error);
				return address;
			  });		
	}
}

export default new AddressService();