import {useDispatch} from 'react-redux';
import {AppDispatch} from '@/redux/store';
import {useEffect, useMemo} from "react";
import {getAllStartups} from "@/redux/thunks/startups-thunk.ts";
import {useAppSelector} from "@/redux/hooks.ts";
import {
    getStartups,
    getStartupsCurrentPage,
    getStartupsLoading,
    getStartupsQuery,
    getStartupsSelectedCategory,
    getStartupsSelectedStage
} from "@/redux/selectors/startupsSelector";
import {Briefcase, Users} from "lucide-react";
import {
    resetFilters,
    setCurrentPage,
    setSearchQuery,
    setSelectedCategory,
    setSelectedStage
} from "@/redux/slices/startups-slice.ts";

export const useStartups = () => {

    const dispatch = useDispatch<AppDispatch>();

    const startups = useAppSelector(getStartups)
    const loading = useAppSelector(getStartupsLoading);
    const selectedCategory = useAppSelector(getStartupsSelectedCategory);
    const selectedStage = useAppSelector(getStartupsSelectedStage);
    const searchQuery = useAppSelector(getStartupsQuery);
    const currentPage = useAppSelector(getStartupsCurrentPage);

    useEffect(() => {
        const params: Record<string, string | number> = {};
        if (selectedCategory && selectedCategory !== 'all') params.category = selectedCategory;
        if (selectedStage && selectedStage !== 'all') params.stage = selectedStage;
        if (searchQuery && searchQuery.trim() !== '') params.search = searchQuery;
        params.page = currentPage;

        dispatch(getAllStartups(params));
    }, [selectedStage, selectedCategory, searchQuery, currentPage]);

    const stats = useMemo(
        () => [
            {label: "Count of all startups", value: startups.total, icon: Briefcase},
            {label: "Number of users", value: 2, icon: Users},
        ],
        []
    );
    return {
        startups, page: startups.page, totalPages: startups.totalPages,
        loading, stats, selectedCategory, selectedStage, searchQuery,
        setSearchQuery: (query: string) => dispatch(setSearchQuery(query)),
        setSelectedCategory: (category: string) => dispatch(setSelectedCategory(category)),
        setSelectedStage: (stage: string) => dispatch(setSelectedStage(stage)),
        setCurrentPage: (page: number) => dispatch(setCurrentPage(page)),
        resetFilters: () => dispatch(resetFilters()),
    };
};
