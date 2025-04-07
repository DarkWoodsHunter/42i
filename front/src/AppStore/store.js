import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./ApiSlice";

//Create a Redux Store

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath] : apiSlice.reducer
    },
    middleware : (getDefaulftMiddleware) => getDefaulftMiddleware().concat(apiSlice.middleware)
})