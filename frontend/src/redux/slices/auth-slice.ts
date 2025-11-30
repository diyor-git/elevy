import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {signIn, signUp} from "@/redux/thunks/auth-thunk";
import {UserData} from "@/types/auth-types.ts";
import Cookies from 'js-cookie';

interface AuthState {
    user: UserData;
    loading: boolean;
    token: string;
    error: string | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    user: null,
    loading: false,
    token: null,
    error: null,
    isAuthenticated: false
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.error = null;
            state.isAuthenticated = false

            Cookies.remove('token');
        },
        setTokenFromCookie: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signUp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true

                Cookies.set('token', action.payload.token, {expires: 1});
            })
            .addCase(signUp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(signIn.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true

                Cookies.set('token', action.payload.token, {expires: 1});
            })
            .addCase(signIn.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const {logout, setTokenFromCookie} = authSlice.actions;
export default authSlice.reducer;