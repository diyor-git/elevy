import Cookies from "js-cookie";
import {useGetProfileQuery, useSignInMutation, useSignUpMutation} from "@/api/auth-api.ts";
import {SignUpDataTypes} from "@/types/auth-types.ts";

export const useAuth = () => {
    const {data: profile, isLoading: profileLoading} = useGetProfileQuery();
    const [signIn, {isLoading: signInLoading, error: signInError}] = useSignInMutation();
    const [signUp, {isLoading: signUpLoading, error: signUpError}] = useSignUpMutation();

    const isAuthenticated = !!profile;

    const handleSignIn = async (payload: { email: string; password: string }) => {
        const res = await signIn(payload).unwrap();
        Cookies.set("token", res.token, {expires: 1});
        return res;
    };

    const handleSignUp = async (payload: SignUpDataTypes) => {
        const res = await signUp(payload).unwrap();
        Cookies.set("token", res.token, {expires: 1});
        return res;
    };

    const logout = () => {
        Cookies.remove("token");
        window.location.reload(); // простой способ очистки кэша и авторизации
    };

    return {
        profile,
        isAuthenticated,
        profileLoading,
        signInLoading,
        signUpLoading,
        signInError,
        signUpError,
        handleSignIn,
        handleSignUp,
        logout,
    };
};
