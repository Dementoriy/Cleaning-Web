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

  GetOrderById(id: number){
		return axios.get(API_URL + "get-by-id?id=" + id )
        .then((response) => {
            const data: Answer = response.data;
            if (data.status)
            {
              console.log(data.answer);
              return data.answer.order as Order;
            }
            return null;
          })
          .catch((error) => {
            console.log(error);
            return null
          });
	}

  addRating(order: Order){
		return axios.post(API_URL + 'add-rating', order, {headers: authHeader()})
			.then((res) => {
				const data: Answer = res.data;
				if (data.status){
					const rating : Order = data.answer.rating;
					localStorage.setItem('newAddress', JSON.stringify(order));
					return rating;
				}
				return order;
			}).catch((error) => {
				console.log(error);
				return order;
			  });		
	}

  cancellOrder(order: Order){
    return axios.post(API_URL + 'cancell-Order', order, {headers: authHeader()})
			.then((res) => {
				const data: Answer = res.data;
				if (data.status)
          {
            console.log(data.answer);
            return data.answer.objects as Order[];
          }
				return [];
			}).catch((error) => {
				console.log(error);
				return [];
			  });	
  }
}

export default new OrderService();