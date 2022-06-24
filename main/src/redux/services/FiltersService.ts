import axios from "axios";
import authHeader from '../AuthHeader';
import {Answer} from "../../models/RequestModels";
import {Address} from "../../models/AddressModel";
import {Consumable} from "../../models/ConsumableModel";
import {FiltersLoaded, FiltersNotLoaded} from "../actions/filtersActions";
import {filtersState} from "../reducers/filterReducer";
import {Filter} from "../../models/FilterModel";
import {OrderLoaded, OrderNotLoaded} from "../actions/orderActions";

const API_URL = "http://localhost:8080/filters/";

class FiltersService {
    GetFilters() {
		return axios.get(API_URL + "get", {headers: authHeader()})
        .then((response) => {
            const data: Answer = response.data;
            if (data.status)
            {
              console.log(data.answer);
              const consumables : Consumable[] = data.answer.consumables;
              const addresses : Address[] = data.answer.addresses;
              console.log(data.answer);
              // return {consumables : consumables, addresses : addresses}
              return FiltersLoaded({consumables : consumables, address : addresses} as filtersState)
            }  
            return FiltersNotLoaded;
          })
          .catch((error) => {
            console.log(error);
            return FiltersNotLoaded
          });
	  }

    GetOrder(filters: Filter){
      return axios.post(API_URL + 'get-order', filters, {headers: authHeader()})
        .then((res) => {
          const data: Answer = res.data;
          if (data.status)
            {
              console.log(data.answer);
              return OrderLoaded(data.answer.objects);
            }
            return OrderNotLoaded;
        }).catch((error) => {
          console.log(error);
          return OrderNotLoaded;
          });	
    }

  
}

export default new FiltersService();