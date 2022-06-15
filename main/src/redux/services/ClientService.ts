import axios from 'axios';
import authHeader from '../AuthHeader';
import {Answer} from "../../models/RequestModels";
import {Client} from "../../models/ClientModel";
import {AvatarError} from '../actions/clientActions'
import {clientActions} from "../slices/clientSlice";
const API_URL = "http://localhost:8080/profile/"

class ClientService {
	updateAvatar(avatar: string) {
		return axios.post(API_URL + 'avatar', {avatar: avatar}, {headers: authHeader()})
			.then((res) => {
				const data: Answer = res.data;
				if (data.status){
					return clientActions.addedAvatar(data.answer.user);
				}
				return AvatarError(data.errorText!);
		}).catch((err) => {
			return AvatarError(err);
			})
	}

	updateClientInfo(client: Client){
		return axios.post(API_URL + 'change-client-info', client, {headers: authHeader()})
			.then((res) => {
				const data: Answer = res.data;
				if (data.status){
					const user : Client = data.answer.user;
					localStorage.setItem('user', JSON.stringify(client));
					return user;
				}
				return client;
			}).catch((error) => {
				console.log(error);
				return client;
			  });
				
	}
}

export default new ClientService();