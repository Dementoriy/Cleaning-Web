import axios from "axios";
import authHeader from '../AuthHeader';
import {Answer} from "../../models/RequestModels";
import {Order} from "../../models/OrderModel";
import {OrderLoaded, OrderNotLoaded} from "../actions/orderActions";
import {FinalOrderInfo} from '../../components/toOrder/StepThree';
import {Filter} from "../../models/FilterModel";

const API_URL = "http://localhost:8080/my-cleaning/";

class OrderService {
    GetOrder() {
		return axios.get(API_URL + "get" , {headers: authHeader()})
        .then((response) => {
            const data: Answer = response.data;
            if (data.status)
            {
              console.log(data.answer);
              // return data.answer.objects as Order[];
              return OrderLoaded(data.answer.objects);
            }
            return OrderNotLoaded;
          })
          .catch((error) => {
            console.log(error);
            return OrderNotLoaded
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
          return OrderLoaded(data.answer.objects);
				}
				return OrderNotLoaded;
			}).catch((error) => {
				console.log(error);
				return OrderNotLoaded;
			  });		
	}

  cancellOrder(order: Order){
    return axios.post(API_URL + 'cancell-Order', order, {headers: authHeader()})
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

  addOrder(finalOrderInfo: FinalOrderInfo){
    return axios.post(API_URL + 'add-order', finalOrderInfo, {headers: authHeader()})
    .then((res) => {
      const data: Answer = res.data;
      if (data.status)
        {
          return OrderLoaded(data.answer.objects);
        }
      return OrderNotLoaded;
    }).catch((error) => {
      console.log(error);
      return OrderNotLoaded;
      });	
  }

  addReport(filters: Filter){
    return axios.post(API_URL + 'add-report', filters, {headers: authHeader()})
    .then((res) => {
      const data: Answer = res.data;
      if (data.status)
        {
          return OrderLoaded(data.answer.objects);
        }
      return OrderNotLoaded;
    }).catch((error) => {
      console.log(error);
      return OrderNotLoaded;
      });	
  }
}

export default new OrderService();