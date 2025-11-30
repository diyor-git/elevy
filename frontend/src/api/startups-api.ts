import {AxiosResponse} from "axios";
import $instance from "@/api/index";


export const startupsAPI = {
    getAllStartups(params?: Record<string, any>): Promise<AxiosResponse<any>> {
        return $instance.get<any>(`startups`,  { params }).then((response) => {
            return response
        })
    },
    getStartupById(id: string): Promise<AxiosResponse<any>> {
        return $instance.get<any>(`startups/${id}`).then((response) => {
            return response
        })
    },
}

