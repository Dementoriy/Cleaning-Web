import {configureStore} from '@reduxjs/toolkit'
import {clientReducer} from './slices/clientSlice'
import { orderReducer } from './reducers/orderReducer'
import {filterReducer} from './reducers/filterReducer'

export const store = configureStore({
	reducer: {
		client: clientReducer,
		orders: orderReducer,
		filterReducer: filterReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
