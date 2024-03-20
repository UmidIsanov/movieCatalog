import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query';
import { popularMovieAPI } from "../services/PopularMovieService";

const store = configureStore({
    reducer: { 
        [popularMovieAPI.reducerPath]: popularMovieAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(popularMovieAPI.middleware),
});
setupListeners(store.dispatch);
export default store;
