import { createSlice } from "@reduxjs/toolkit";
import type{ Movie } from "../types/movie";

const defaultFieldValues: Movie = {
    imdbID:"",
    Title:"",
    Type: "",
    Year: "",
    Poster: ""
}

const defaultFormSlice = createSlice({
    name: "defaultForm",
    initialState: defaultFieldValues,
    reducers:{
        setFieldValues: (state,action)=>{
            return {...state, ...action.payload};
        },
        resetFields: () => defaultFieldValues,
    }
})

export const {setFieldValues, resetFields} = defaultFormSlice.actions;
export default defaultFormSlice.reducer;