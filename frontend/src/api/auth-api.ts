import {AxiosResponse} from "axios";
import $instance from "@/api";
import {SignInDataTypes, SignUpDataTypes, UserData} from "@/types/auth-types";


export const authApi = {
    signIn(data: SignInDataTypes): Promise<AxiosResponse<{ token: string, user: UserData }>> {
        return $instance.post(`auth/signin`, data).then((response) => {
            return response
        })
    },
    signUp(data: SignUpDataTypes): Promise<AxiosResponse<{ token: string, user: UserData }>> {
        return $instance.post(`auth/signup`, data).then((response) => {
            return response
        })
    },
    getUser(): Promise<AxiosResponse<{ token: string, user: UserData }>> {
        return $instance.post(`auth/profile`).then((response) => {
            return response
        })
    },
}

