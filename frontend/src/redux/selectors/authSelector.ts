import {RootState} from "@/redux/store";

export const getAuthLoading = (state: RootState) => {
    return state.auth.loading
}
export const getAuthError = (state: RootState) => {
    return state.auth.error
}
export const getUser = (state: RootState) => {
    return state.auth.user
}
export const isAuthenticated = (state: RootState) => {
    return state.auth.isAuthenticated
}