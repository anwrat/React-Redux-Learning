import { configureStore } from "@reduxjs/toolkit";
import { omdbApi } from "../services/omdbApi";
import filterReducer from "../services/filterSlice"

export const store = configureStore({
    reducer:{
        [omdbApi.reducerPath] : omdbApi.reducer,
        searchFilter: filterReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(omdbApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>