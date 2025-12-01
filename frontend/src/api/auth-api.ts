import {createApi} from "@reduxjs/toolkit/query/react";
import {SignInDataTypes, SignUpDataTypes, UserData} from "@/types/auth-types";
import axiosBaseQuery from "@/api/axiosBaseQuery";
import Cookies from "js-cookie";

interface AuthResponse {
    token: string;
    user: UserData;
}

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        signIn: builder.mutation<AuthResponse, SignInDataTypes>({
            query: (data) => ({url: "auth/signin", method: "POST", data}),
            async onQueryStarted(arg, {queryFulfilled}) {
                try {
                    const {data} = await queryFulfilled;
                    Cookies.set("token", data.token, {expires: 1});
                } catch {
                }
            },
        }),
        signUp: builder.mutation<AuthResponse, SignUpDataTypes>({
            query: (data) => ({url: "auth/signup", method: "POST", data}),
            async onQueryStarted(arg, {queryFulfilled}) {
                try {
                    const {data} = await queryFulfilled;
                    Cookies.set("token", data.token, {expires: 1});
                } catch {
                }
            },
        }),
        getProfile: builder.query<AuthResponse, void>({
            query: () => ({url: "auth/profile", method: "GET"}),
        }),
    }),
});

export const {useSignInMutation, useSignUpMutation, useGetProfileQuery,} = authApi;
