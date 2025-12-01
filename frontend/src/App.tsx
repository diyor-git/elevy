import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {TooltipProvider} from '@/components/ui/tooltip';
import {SigninPage, SignupPage, VerifyEmailPage} from '@/pages/auth';
import LandingPage from "@/pages/landing";
import {NotFound} from "@/components";
import Dashboard from "@/pages/platform";
import {useEffect} from 'react';
import {useGetProfileQuery} from "@/api/auth-api.ts";
import {useToast} from "@/hooks/use-toast.ts";
import {Toaster} from "@/components/Toaster.tsx";

function App() {
    const {data: user, isLoading, isError} = useGetProfileQuery();
    const {toast} = useToast()

    useEffect(() => {
        if (!isLoading && !user || isError) {
        }
    }, []);
    return (
        <TooltipProvider>
            <BrowserRouter>
                {/*<Toast title={'asd'}/>*/}
                <Routes>
                    <Route path="/" element={<LandingPage/>}/>
                    <Route path="/signin" element={<SigninPage/>}/>
                    <Route path="/signup" element={<SignupPage/>}/>
                    <Route path="/verify-email" element={<VerifyEmailPage/>}/>

                    <Route path="/dashboard/*" element={<Dashboard/>}/>

                    <Route path="/*" element={<Navigate to="/404"/>}/>
                    <Route path="/404" element={<NotFound/>}/>
                </Routes>
            </BrowserRouter>
            <Toaster/>
        </TooltipProvider>
    );
}

export default App;
