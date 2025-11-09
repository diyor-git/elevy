import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {useEffect} from 'react';
import HomePage from '@/pages/HomePage'
import LoginPage from '@/pages/LoginPage'
import CoursesPage from '@/pages/CoursesPage'
import CourseDetailPage from '@/pages/CourseDetailPage'
import InternshipsPage from '@/pages/InternshipsPage'
import InternshipDetailPage from '@/pages/InternshipDetailPage'
import StartupsPage from '@/pages/StartupsPage'
import StartupDetailPage from "@/pages/StartupDetailPage";
import CommunityPage from '@/pages/CommunityPage'
import AIPage from '@/pages/AIPage'
import ProfilePage from '@/pages/ProfilePage';
import AdminDashboardPage from "@/pages/AdminDashboardPage";
import NotFoundPage from '@/pages/NotFoundPage'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AIAssistant from '@/components/AIAssistant'
import {Toaster} from '@/components/ui/toaster'
import {TooltipProvider} from '@/components/ui/tooltip'
import {useAppDispatch} from '@/store';
import {checkAuth} from '@/store/authSlice';
import CreateStartupPage from "@/pages/CreateStartupPage.tsx";

function App() {
    const dispatch = useAppDispatch();

    // Check authentication on mount
    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);

    return (
        <TooltipProvider>
            <BrowserRouter>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/courses" element={<CoursesPage/>}/>
                    <Route path="/courses/:id" element={<CourseDetailPage/>}/>
                    <Route path="/internships" element={<InternshipsPage/>}/>
                    <Route path="/internships/:id" element={<InternshipDetailPage/>}/>
                    <Route path="/startups" element={<StartupsPage/>}/>
                    <Route path="/startups/create" element={<CreateStartupPage/>}/>
                    <Route path="/community" element={<CommunityPage/>}/>
                    <Route path="/ai" element={<AIPage/>}/>
                    <Route path="*" element={<NotFoundPage/>}/>
                    <Route path="/startups" element={<StartupsPage/>}/>
                    <Route path="/startups/:id" element={<StartupDetailPage/>}/>
                    <Route
                        path="/admin"
                        element={
                            // <ProtectedRoute>
                            <AdminDashboardPage/>
                            // </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <ProfilePage/>
                        }
                    />
                </Routes>
                <Footer/>
                <AIAssistant/>
            </BrowserRouter>
            <Toaster/>
        </TooltipProvider>
    )
}

export default App;