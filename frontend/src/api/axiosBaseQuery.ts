import axios, {AxiosRequestConfig, Method} from "axios";
import Cookies from "js-cookie";
import {BaseQueryFn} from "@reduxjs/toolkit/query";

interface AxiosBaseQueryArgs {
    baseUrl?: string;
}

interface AxiosQueryArgs {
    url: string;
    method: Method;
    data?: unknown;
    params?: Record<string, any>;
    headers?: Record<string, string>;
}

export const axiosBaseQuery =
    ({baseUrl = "http://localhost:3000/"}: AxiosBaseQueryArgs = {}): BaseQueryFn<
        AxiosQueryArgs,
        unknown,
        unknown
    > =>
        async ({url, method, data, params, headers}) => {
            const token = Cookies.get("token");

            const axiosConfig: AxiosRequestConfig = {
                baseURL: baseUrl,
                url,
                method,
                data,
                params,
                headers: {
                    Authorization: token ? `Bearer ${token}` : "",
                    "Content-Type": "application/json;charset=UTF-8",
                    ...headers,
                },
            };

            try {
                const result = await axios(axiosConfig);
                return {data: result.data};
            } catch (error: any) {
                return {
                    error: {
                        status: error.response?.status,
                        data: error.response?.data || error.message,
                    },
                };
            }
        };

export default axiosBaseQuery;
