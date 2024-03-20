import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPopularMovie } from "../types/movieTypes";

export const popularMovieAPI = createApi({
    reducerPath: 'popularMovieAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
    endpoints: (builder) => ({
        fetchPopularMovies: builder.query< IPopularMovie, void>({
            query: () => ({
                url: "/movie/popular",
                method: 'GET', 
                headers: {
                    Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
                }
            })
        })
    })
});

export const { useFetchPopularMoviesQuery } = popularMovieAPI;
