import { configureStore } from "@reduxjs/toolkit";
import { omdbApi } from "../services/omdbApi";
import filterReducer from "../services/filterSlice"
import favouriteReducer from "../services/favouritesSlice"

export const store = configureStore({
    reducer:{
        [omdbApi.reducerPath] : omdbApi.reducer,
        searchFilter: filterReducer,
        favourites: favouriteReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(omdbApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>