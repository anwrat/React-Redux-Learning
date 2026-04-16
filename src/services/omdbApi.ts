import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = import.meta.env.VITE_OMDB_KEY;

export const omdbApi = createApi({
    reducerPath: "omdbApi",
    baseQuery: fetchBaseQuery({baseUrl: "https://www.omdbapi.com/"}),
    endpoints: (builder) =>({
        searchMovies: builder.query<any,string>({
            query: (searchTerm) => `?apikey=${API_KEY}&s=${searchTerm}`,
        }),
    }),
})

export const { useSearchMoviesQuery } = omdbApi;