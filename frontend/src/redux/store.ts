import {configureStore} from '@reduxjs/toolkit';
import startupsReducer from '@/redux/slices/startups-slice';
import authReducer from '@/redux/slices/auth-slice';

export const store = configureStore({
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    reducer: {
        startups: startupsReducer,
        auth: authReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
