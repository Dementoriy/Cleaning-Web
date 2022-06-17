import {createAction} from "@reduxjs/toolkit";
import {filtersState} from "../reducers/filterReducer";

//export const AddedFilter = createAction<Order[]>("ADDED_FILTER");
export const FiltersLoaded = createAction<filtersState>("FILTERS_LOADED");
export const FiltersNotLoaded = createAction("FILTERS_NOT_LOADED");
