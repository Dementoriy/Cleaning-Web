import axios from "axios";
import {Answer} from "../../models/RequestModels";
import {Service} from "../../models/ServiceModel";

const API_URL = "http://localhost:8080/service/";

class ServiceService {
    GetService() {
		return axios.get(API_URL + "get")
        .then((response) => {
            console.log(response.data);
            const data: Answer = response.data;
            const service: Service[] = data.answer.routes
            return service;
          })
          .catch((error) => {
            console.log(error);
            return []
          });
	}
}

export default new ServiceService();