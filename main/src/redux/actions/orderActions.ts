import {createAction} from "@reduxjs/toolkit";
import {Order} from "../../models/OrderModel"

export const AddedFilter = createAction<Order[]>("ADDED_FILTER");
export const OrderLoaded = createAction<Order[]>("ORDER_LOADED");
export const OrderNotLoaded = createAction("ORDER_NOT_LOADED");
