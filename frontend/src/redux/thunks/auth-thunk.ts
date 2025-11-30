import {createAsyncThunk} from '@reduxjs/toolkit';
import {SignInDataTypes, SignUpDataTypes} from "@/types/auth-types.ts";
import {authApi} from "@/api/auth-api.ts";


export const signUp = createAsyncThunk(
    'auth/signUp',
    async (data: SignUpDataTypes, {rejectWithValue}) => {
        try {
            const response = await authApi.signUp(data)
            return response.data
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Signup failed");
        }
    }
)

export const signIn = createAsyncThunk(
    'auth/signIn',
    async (data: SignInDataTypes, thunkAPI) => {
        try {
            const response = await authApi.signIn(data)
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)

export const getUser = createAsyncThunk(
    'auth/getUser',
    async (_, thunkAPI) => {
        try {
            const response = await authApi.getUser()
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)
