import {createReducer, PayloadAction} from "@reduxjs/toolkit";
import {Address} from '../../models/AddressModel';
import {Consumable} from '../../models/ConsumableModel';
import {FiltersLoaded, FiltersNotLoaded} from "../actions/filtersActions";

export interface filtersState {
    address: Address[];
    consumables : Consumable[];
    dateOt: string;
    dateDo: string;
}

const state : filtersState = {address: [], consumables: [], dateOt: "", dateDo: ""}

export const filterReducer = createReducer(state, (builder) => {
	builder.addCase(FiltersLoaded, (state, action: PayloadAction<filtersState>) => {
		return action.payload;
    }).addCase(FiltersNotLoaded, (state, action: PayloadAction<any>) => {
        return state;
    })});

