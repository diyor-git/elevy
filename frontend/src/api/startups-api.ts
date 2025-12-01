import {createApi} from "@reduxjs/toolkit/query/react";
import {Startup} from "@/types/startup";
import axiosBaseQuery from "@/api/axiosBaseQuery.ts";

interface StartupsQueryParams {
    category?: string;
    stage?: string;
    search?: string;
    page?: number;
    limit?: number;
}

interface PaginatedStartups {
    projects: Startup[];
    page: number;
    total: number;
    totalPages: number;
}

export const startupsApi = createApi({
    reducerPath: "startupsApi",
    baseQuery: axiosBaseQuery(),
    tagTypes: ["Startup"],
    endpoints: (builder) => ({
        getStartupById: builder.query<Startup, string>({
            query: (id) => ({
                url: `startups/${id}`,
                method: "GET"
            }),
            providesTags: (result, error, id) => [{type: "Startup", id}],
        }),
        getStartupsList: builder.query<PaginatedStartups, StartupsQueryParams>({
            query: ({category, stage, search, page = 1, limit = 9}) => {
                const params: Record<string, any> = {};
                if (category) params.category = category;
                if (stage) params.stage = stage;
                if (search) params.search = search;
                params.page = page;
                params.limit = limit;

                return {
                    url: "startups",
                    method: "GET",
                    params,
                };
            },
            providesTags: (result) =>
                result
                    ? [
                        ...result.projects.map(({id}) => ({type: "Startup" as const, id})),
                        {type: "Startup", id: "LIST"},
                    ]
                    : [{type: "Startup", id: "LIST"}],
        }),
        // можно добавить create/update/delete
    }),
});

export const {useGetStartupByIdQuery, useGetStartupsListQuery} = startupsApi;
