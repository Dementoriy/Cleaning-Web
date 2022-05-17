import axios from "axios";
import {Answer} from "../../models/RequestModels";
import {Service} from "../../models/ServiceModel";

const API_URL = "http://localhost:8080/service/";

class ServiceService {
    GetService() {
		return axios.get(API_URL + "get")
        .then((response) => {
            const data: Answer = response.data;
            if (data.status)
            {
              return data.answer.services as Service[];
            }
            return [];
          })
          .catch((error) => {
            console.log(error);
            return []
          });
	}
}

export default new ServiceService();