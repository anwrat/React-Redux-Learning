import { createSlice } from "@reduxjs/toolkit";
import type{ Movie } from "../types/movie";

interface CustomMovieState{
    movies: Movie[],
}

const initialState: CustomMovieState = {
    movies: [],
}

const customMovieSlice = createSlice({
    name: "customMovie",
    initialState,
    reducers:{
        addMovie:(state,action)=>{
            const exists = state.movies.find((m)=>m.imdbID === action.payload.imdbID);
            if(!exists){
                state.movies.push(action.payload);
            }
        },
        removeMovie:(state, action)=>{
            state.movies = state.movies.filter((m)=> m.imdbID !== action.payload);
        }
    }
});

export const {addMovie, removeMovie} = customMovieSlice.actions;
export default customMovieSlice.reducer;