import {createReducer, PayloadAction} from "@reduxjs/toolkit";
import {Client} from '../../models/ClientModel'
import {UpdateUser} from "../actions/clientActions";

const client = localStorage.getItem('user') === null ? null : JSON.parse(localStorage.getItem('user')!) as Client


export const clientReducer = createReducer(client, (builder) => {
	builder.addCase(UpdateUser, (state, action: PayloadAction<string>) => {
		return localStorage.getItem('user') === null ? null : JSON.parse(localStorage.getItem('user')!) as Client
	})
});