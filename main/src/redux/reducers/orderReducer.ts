import {createReducer, PayloadAction} from "@reduxjs/toolkit";
import {Order} from '../../models/OrderModel'
import {AddedFilter, OrderLoaded, OrderNotLoaded} from "../actions/orderActions";

const orders : Order[] = [];

export const orderReducer = createReducer(orders, (builder) => {
	builder.addCase(AddedFilter, (state, action: PayloadAction<Order[]>) => {
		return action.payload;
	}).addCase(OrderLoaded, (state, action: PayloadAction<Order[]>) => {
        return action.payload;
    }).addCase(OrderNotLoaded, (state, action: PayloadAction<any>) => {
        return state;
})});