import axios from "axios";
import authHeader from '../AuthHeader';
import {Answer} from "../../models/RequestModels";
import {Service} from "../../models/ServiceModel";

const API_URL = "http://localhost:8080/service/";

class ServiceService {
    GetService() {
		return axios.get(API_URL + "get", {headers: authHeader()})
        .then((response) => {
            const data: Answer = response.data;
            if (data.status)
            {
              console.log(data.answer);
              return data.answer.services as Service[];
            }
            return [];
          })
          .catch((error) => {
            console.log(error);
            return []
          });
	}
  GetTime(timeValue: number){
		return axios.post(API_URL + 'get-time', {timeValue : timeValue}, {headers: authHeader()})
			.then((res) => {
				const data: Answer = res.data;
				if (data.status){
					const stringTime : string = data.answer.stringTime;
					return stringTime;
				}
				return ;
			}).catch((error) => {
				console.log(error);
				return ;
			  });		
	}
}

export default new ServiceService();