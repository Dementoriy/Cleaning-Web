import axios from 'axios';
import authHeader from '../AuthHeader';
import {Answer} from "../../models/RequestModels";
import {Address} from "../../models/AddressModel";
const API_URL = "http://localhost:8080/address/";

class AddressService {

	delClientAddress(address: Address){
		return axios.post(API_URL + 'del-address', address, {headers: authHeader()})
			.then((res) => {
				const data: Answer = res.data;
				if (data.status){
					const addresses : Address = data.answer.addresses;
					return addresses;
				}
				return [];
			}).catch((error) => {
				console.log(error);
				return [];
			  });		
	}
	
	addAddress(address: Address){
		return axios.post(API_URL + 'add-address', address, {headers: authHeader()})
			.then((res) => {
				const data: Answer = res.data;
				if (data.status){
					const addresses : Address = data.answer.addresses;
					return addresses;
				}
				return [];
			}).catch((error) => {
				console.log(error);
				return [];
			  });		
	}

	changeAddress(address: Address){
		return axios.post(API_URL + 'change-address', address, {headers: authHeader()})
			.then((res) => {
				const data: Answer = res.data;
				if (data.status){
					const addresses : Address = data.answer.addresses;
					return addresses;
				}
				return [];
			}).catch((error) => {
				console.log(error);
				return [];
			  });		
	}

	GetAddresses() {
		return axios.get(API_URL + "get-address", {headers: authHeader()})
        .then((response) => {
            const data: Answer = response.data;
            if (data.status)
            {
              console.log(data.answer);
              const addresses : Address = data.answer.addresses; 
              return {addresses : addresses}
            }  
            return { addresses : []};
          })
          .catch((error) => {
            console.log(error);
            return {addresses : []}
          });
	}
}

export default new AddressService();