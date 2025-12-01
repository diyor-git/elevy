import {useMemo, useState} from "react";
import {Briefcase, Users} from "lucide-react";
import {useGetStartupsListQuery} from "@/api/startups-api.ts";

interface UseStartupsOptions {
    initialCategory?: string;
    initialStage?: string;
    initialSearch?: string;
    initialPage?: number;
}

export const useStartups = ({
                                initialCategory = "all",
                                initialStage = "all",
                                initialSearch = "",
                                initialPage = 1,
                            }: UseStartupsOptions = {}) => {
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [selectedStage, setSelectedStage] = useState(initialStage);
    const [searchQuery, setSearchQuery] = useState(initialSearch);
    const [currentPage, setCurrentPage] = useState(initialPage);

    const {data: startups, isLoading, refetch} = useGetStartupsListQuery(
        {
            category: selectedCategory !== "all" ? selectedCategory : undefined,
            stage: selectedStage !== "all" ? selectedStage : undefined,
            search: searchQuery.trim() || undefined,
            page: currentPage,
        },
        {refetchOnMountOrArgChange: true}
    );

    const stats = useMemo(
        () => [
            {label: "Count of all startups", value: startups?.total ?? 0, icon: Briefcase},
            {label: "Number of users", value: 2, icon: Users}, // здесь можно подставить реальное значение
        ],
        [startups]
    );

    const resetFilters = () => {
        setSelectedCategory("all");
        setSelectedStage("all");
        setSearchQuery("");
        setCurrentPage(1);
    };

    return {
        startups,
        page: startups?.page ?? 1,
        totalPages: startups?.totalPages ?? 1,
        loading: isLoading,
        stats,
        selectedCategory,
        selectedStage,
        searchQuery,
        setSearchQuery,
        setSelectedCategory,
        setSelectedStage,
        setCurrentPage,
        resetFilters,
        refetch,
    };
};
