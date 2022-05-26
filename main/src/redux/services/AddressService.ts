import axios from "axios";
import authHeader from '../AuthHeader';
import {Answer} from "../../models/RequestModels";
import {Address} from "../../models/AddressModel";

const API_URL = "http://localhost:8080/profile/";

class AddressService {
    GetAddress() {
		return axios.get(API_URL + "get", {headers: authHeader()})
        .then((response) => {
            const data: Answer = response.data;
            if (data.status)
            {
              console.log(data.answer);
              
              return data.answer.addresses as Address[];
            }
            return [];
          })
          .catch((error) => {
            console.log(error);
            return []
          });
	}
}

export default new AddressService();