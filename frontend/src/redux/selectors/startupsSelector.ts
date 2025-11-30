import {RootState} from "@/redux/store";

export const getStartupsSelector = (state: RootState) => {
    return state.startups.startups
}