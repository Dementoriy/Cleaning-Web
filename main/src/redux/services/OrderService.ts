import axios from "axios";
import authHeader from '../AuthHeader';
import {Answer} from "../../models/RequestModels";
import {Order} from "../../models/OrderModel";

const API_URL = "http://localhost:8080/my-cleaning/";

class OrderService {
    GetOrder() {
		return axios.get(API_URL + "get" , {headers: authHeader()})
        .then((response) => {
            const data: Answer = response.data;
            if (data.status)
            {
              console.log(data.answer);
              return data.answer.objects as Order[];
            }
            return [];
          })
          .catch((error) => {
            console.log(error);
            return []
          });
	}
}

export default new OrderService();