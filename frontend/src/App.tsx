import Cookies from 'js-cookie';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {TooltipProvider} from '@/components/ui/tooltip';
import {SigninPage, SignupPage, VerifyEmailPage} from '@/pages/auth';
import LandingPage from "@/pages/landing";
import {Toaster} from '@/components/ui/toaster';
import {NotFound} from "@/components";
import {useAppDispatch} from "@/redux/hooks.ts";
import {setTokenFromCookie} from '@/redux/slices/auth-slice';
import {useEffect} from "react";

function App() {
    const token = Cookies.get('token')
    const dispatch = useAppDispatch()

    // useEffect(() = {
    //
    // }, [])
    if (token) dispatch(setTokenFromCookie(token));
    return (
        <TooltipProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LandingPage/>}/>
                    <Route path="/signin" element={<SigninPage/>}/>
                    <Route path="/signup" element={<SignupPage/>}/>
                    <Route path="/verify-email" element={<VerifyEmailPage/>}/>



                    <Route index path="/*" element={<Navigate to="/404"/>}/>
                    <Route index path="/404" element={<NotFound/>}/>
                </Routes>
            </BrowserRouter>
            <Toaster/>
        </TooltipProvider>
    );
}

export default App;
