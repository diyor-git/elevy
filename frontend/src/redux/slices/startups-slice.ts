import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getAllStartups, getStartupById} from "@/redux/thunks/startups-thunk";
import {Startup} from '@/types/startup';

interface StartupsState {
    startups: {
        page: number,
        total: number,
        totalPages: number,
        projects: Startup[]
    };
    searchQuery: string;
    selectedCategory: string;
    selectedStage: string;
    loading: boolean;
    currentPage: number;
    startup: any
}

const initialState: StartupsState = {
    startups: {
        page: 0,
        total: 9,
        totalPages: 0,
        projects: null
    },
    currentPage: 1,
    searchQuery: undefined,
    selectedCategory: "all",
    selectedStage: "all",
    loading: true,
    startup: null
};

const startupsSlice = createSlice({
    name: 'startups',
    initialState,
    reducers: {
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
            state.currentPage = 1
        },
        setSelectedCategory: (state, action: PayloadAction<string>) => {
            state.selectedCategory = action.payload;
            state.currentPage = 1
        },
        setSelectedStage: (state, action: PayloadAction<string>) => {
            state.selectedStage = action.payload;
            state.currentPage = 1
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        resetFilters: (state) => {
            state.searchQuery = '';
            state.selectedCategory = 'all';
            state.selectedStage = 'all';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllStartups.fulfilled, (state, action) => {
                state.startups = action.payload
                state.loading = false
            })
            .addCase(getAllStartups.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getAllStartups.rejected, (state, _) => {
                state.loading = false
            })
            .addCase(getStartupById.fulfilled, (state, action) => {
                state.startup = action.payload
                state.loading = false
            })
            .addCase(getStartupById.pending, (state, _) => {
                state.loading = true
            })
    }
});


export const {
    setSearchQuery,
    setSelectedCategory,
    setSelectedStage,
    setCurrentPage,
    resetFilters,
} = startupsSlice.actions;

export default startupsSlice.reducer;
