import axios from "axios";
import authHeader from '../AuthHeader';
import {Answer} from "../../models/RequestModels";
import {Consumable} from "../../models/ConsumableModel";

const API_URL = "http://localhost:8080/consumable/";

class ConsumableService {
  //   GetConsumable() {
	// 	return axios.get(API_URL + "get", {headers: authHeader()})
  //       .then((response) => {
  //           const data: Answer = response.data;
  //           if (data.status)
  //           {
  //             return data.answer.consumables as Consumable[];
  //           }
  //           return [];
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //           return []
  //         });
	// }

}

export default new ConsumableService();