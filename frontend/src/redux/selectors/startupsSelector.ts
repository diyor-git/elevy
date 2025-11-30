import {RootState} from "@/redux/store";

export const getStartups = (state: RootState) => {
    return state.startups.startups
}
export const getStartup = (state: RootState) => {
    return state.startups.startup
}

export const getStartupsLoading = (state: RootState) => {
    return state.startups.loading
}
export const getStartupsQuery = (state: RootState) => {
    return state.startups.searchQuery
}
export const getStartupsSelectedCategory = (state: RootState) => {
    return state.startups.selectedCategory
}
export const getStartupsSelectedStage = (state: RootState) => {
    return state.startups.selectedStage
}
export const getStartupsCurrentPage = (state: RootState) => {
    return state.startups.currentPage
}