import {startupsAPI} from "@/api/startups-api.ts";
import {createAsyncThunk} from '@reduxjs/toolkit';

interface GetAllStartupsParams {
    lang?: string;
    search?: string;

    [key: string]: any;
}

export const getAllStartups = createAsyncThunk(
    'startups/getAllStartups',
    async (params: GetAllStartupsParams = {}, thunkAPI) => {
        try {
            const response = await startupsAPI.getAllStartups(params)
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)
export const getStartupById = createAsyncThunk(
    'startups/getStartupById',
    async (id: string, thunkAPI) => {
        try {
            const response = await startupsAPI.getStartupById(id)
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)
