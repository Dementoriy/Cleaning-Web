import axios from "axios";
import authHeader from '../AuthHeader';
import {Answer} from "../../models/RequestModels";
import {Address} from "../../models/AddressModel";
import {Consumable} from "../../models/ConsumableModel";

const API_URL = "http://localhost:8080/filters/";

class FiltersService {
    GetFilters() {
		return axios.get(API_URL + "get", {headers: authHeader()})
        .then((response) => {
            const data: Answer = response.data;
            if (data.status)
            {
              console.log(data.answer);
              const consumables : Consumable = data.answer.consumables;
              const addresses : Address = data.answer.addresses; 
              return {consumables : consumables, addresses : addresses}
            }  
            return {consumables : [], addresses : []};
          })
          .catch((error) => {
            console.log(error);
            return {consumables : [], addresses : []}
          });
	}
}

export default new FiltersService();