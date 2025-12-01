import { configureStore } from "@reduxjs/toolkit";
import {authApi} from "@/api/auth-api.ts";
import {startupsApi} from "@/api/startups-api.ts";


export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [startupsApi.reducerPath]: startupsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(startupsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
