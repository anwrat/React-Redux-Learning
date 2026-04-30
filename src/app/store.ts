import { configureStore } from "@reduxjs/toolkit";
import { omdbApi } from "../services/omdbApi";
import filterReducer from "../services/filterSlice"
import favouriteReducer from "../services/favouritesSlice"
import customMovieReducer from "../services/customMovieSlice"
import defaultFormReducer from "../services/defaultFormSlice"

export const store = configureStore({
    reducer:{
        [omdbApi.reducerPath] : omdbApi.reducer,
        searchFilter: filterReducer,
        favourites: favouriteReducer,
        customMovie: customMovieReducer,
        defaultForm: defaultFormReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(omdbApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>