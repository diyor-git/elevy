import {createSlice} from '@reduxjs/toolkit';
import {getAllStartups} from "@/redux/thunks/startups-thunk";
import {Startup} from '@/types/startup';

interface StartupsState {
    startups: Startup[];
}

const initialState: StartupsState = {
    startups: [],
};

const startupsSlice = createSlice({
    name: 'startups',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllStartups.fulfilled, (state: any, action: any) => {
            state.startups = action.payload
        })
    }
});

export default startupsSlice.reducer;
