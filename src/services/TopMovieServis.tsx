import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'

export const topMoviesApi = createApi({
  reducerPath: 'topMoviesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
  endpoints: (builder) => ({
    fetchTopMovies: builder.query({
      query: () => 'tv/top_rated?language=en-US&page=1',
    }),
  }),
})
 