import { createSlice } from "@reduxjs/toolkit";
import type{ Movie } from "../types/movie";

interface FavouritesState{
    movies: Movie[],
}

const initialState: FavouritesState = {
    movies: [],
}

const favouritesSlice = createSlice({
    name: "favourites",
    initialState,
    reducers:{
        addFavourite: (state, action) =>{
            const exists = state.movies.find((m)=>m.imdbID === action.payload.imdbID);
            if(!exists){
                state.movies.push(action.payload);
            }
        },

        removeFavourite: (state, action) =>{
            state.movies = state.movies.filter((m)=>m.imdbID !== action.payload);
        }
    }
})

export const {addFavourite, removeFavourite} = favouritesSlice.actions;
export default favouritesSlice.reducer;