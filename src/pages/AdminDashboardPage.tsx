

import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppSelector, useAppDispatch } from '@/store';
import { checkAdminStatus } from '@/store/adminSlice';
import { Users, BookOpen, Briefcase, Rocket, Flag, BarChart3, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
// import { logout } from '@/store/authSlice';
import { UserManagement } from '@/components/admin/UserManagement';
import { CourseManagement } from '@/components/admin/CourseManagement';
import { InternshipManagement } from '@/components/admin/InternshipManagement';
import { StartupManagement } from '@/components/admin/StartupManagement';
import { ContentModeration } from '@/components/admin/ContentModeration';
import { Analytics } from '@/components/admin/Analytics';

export default function AdminDashboardPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAppSelector((state) => state.auth);
    const { isAdmin, loading } = useAppSelector((state) => state.admin);

    useEffect(() => {
        // if (isAuthenticated && user) {
        //     dispatch(checkAdminStatus(user.uid));
        // }
    }, [isAuthenticated, user, dispatch]);

    const handleLogout = () => {
        // dispatch(logout());
        // navigate('/login');
    };

    // if (!isAuthenticated) {
    //     return <Navigate to="/login" replace />;
    // }

    // if (loading) {
    //     return (
    //         <div className="min-h-screen flex items-center justify-center">
    //             <div className="text-center">
    //                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
    //                 <p className="text-muted-foreground">Checking admin access...</p>
    //             </div>
    //         </div>
    //     );
    // }

    // if (!isAdmin) {
    //     return (
    //         <div className="min-h-screen flex items-center justify-center">
    //             <div className="text-center max-w-md">
    //                 <div className="mb-6 text-6xl">🔒</div>
    //                 <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
    //                 <p className="text-muted-foreground mb-6">
    //                     You don't have permission to access the admin dashboard.
    //                 </p>
    //                 <Button onClick={() => navigate('/profile')}>
    //                     Go to Profile
    //                 </Button>
    //             </div>
    //         </div>
    //     );
    // }

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b bg-card sticky top-0 z-40">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                            <span className="text-primary-foreground font-bold text-sm">A</span>
                        </div>
                        <div>
                            <h1 className="font-semibold">Admin Dashboard</h1>
                            <p className="text-xs text-muted-foreground">Elevy Management</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="text-right">
                            <p className="text-sm font-medium">{user?.name}</p>
                            <p className="text-xs text-muted-foreground">{user?.email}</p>
                        </div>
                        <Button variant="outline" size="sm" onClick={handleLogout}>
                            <LogOut className="h-4 w-4 mr-2" />
                            Logout
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                <Tabs defaultValue="analytics" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:inline-grid">
                        <TabsTrigger value="analytics" className="flex items-center gap-2">
                            <BarChart3 className="h-4 w-4" />
                            <span className="hidden sm:inline">Analytics</span>
                        </TabsTrigger>
                        <TabsTrigger value="users" className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            <span className="hidden sm:inline">Users</span>
                        </TabsTrigger>
                        <TabsTrigger value="courses" className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4" />
                            <span className="hidden sm:inline">Courses</span>
                        </TabsTrigger>
                        <TabsTrigger value="internships" className="flex items-center gap-2">
                            <Briefcase className="h-4 w-4" />
                            <span className="hidden sm:inline">Internships</span>
                        </TabsTrigger>
                        <TabsTrigger value="startups" className="flex items-center gap-2">
                            <Rocket className="h-4 w-4" />
                            <span className="hidden sm:inline">Startups</span>
                        </TabsTrigger>
                        <TabsTrigger value="moderation" className="flex items-center gap-2">
                            <Flag className="h-4 w-4" />
                            <span className="hidden sm:inline">Moderation</span>
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="analytics" className="space-y-4">
                        <Analytics />
                    </TabsContent>

                    <TabsContent value="users" className="space-y-4">
                        <UserManagement />
                    </TabsContent>

                    <TabsContent value="courses" className="space-y-4">
                        <CourseManagement />
                    </TabsContent>

                    <TabsContent value="internships" className="space-y-4">
                        <InternshipManagement />
                    </TabsContent>

                    <TabsContent value="startups" className="space-y-4">
                        <StartupManagement />
                    </TabsContent>

                    <TabsContent value="moderation" className="space-y-4">
                        <ContentModeration />
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
}
