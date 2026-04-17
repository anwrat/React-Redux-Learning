import { createSlice } from "@reduxjs/toolkit";

interface FilterState{
    searchTerm: string,
    typeTerm: string,
}

const initialState: FilterState ={
    searchTerm: "",
    typeTerm: "",
}

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        setTypeTerm: (state, action) => {
            state.typeTerm = action.payload;
        }
    }
})

export const { setSearchTerm, setTypeTerm } = filterSlice.actions;
export default filterSlice.reducer;