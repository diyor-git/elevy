import {Navigate, Outlet} from "react-router-dom";
import Cookies from "js-cookie";
import {useGetProfileQuery} from "@/api/auth-api";

function ProtectedRoute() {
    const token = Cookies.get("token");
    const {data: user, isLoading, isError} = useGetProfileQuery(undefined, {
        skip: !token, // если токена нет, не делать запрос
    });

    if (!token) {
        return <Navigate to="/signin" replace/>;
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (isError || !user) {
        return <Navigate to="/signin" replace/>;
    }

    return <Outlet/>;
}

export default ProtectedRoute;
