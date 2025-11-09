
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/store';
import { logoutAsync } from '@/store/authSlice';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import {
    User,
    Mail,
    Calendar,
    LogOut,
    BookOpen,
    Briefcase,
    Rocket,
    Settings,
    Shield,
    Clock,
    Loader2,
} from 'lucide-react';

export default function ProfilePage() {
    const dispatch = useAppDispatch();
    let { user } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();
    const { toast } = useToast();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await dispatch(logoutAsync()).unwrap();
            toast({
                title: 'Logged Out',
                description: 'You have been successfully logged out.',
            });
            navigate('/', { replace: true });
        } catch (error: any) {
            toast({
                title: 'Error',
                description: error || 'Failed to logout.',
                variant: 'destructive',
            });
            setIsLoggingOut(false);
        }
    };

    if (!user) {
        user = {
            "createdTime": 1762589994,
            "email": "neznayudiyor@gmail.com",
            "lastLoginTime": 1762592986,
            "name": "Diyor Malikov",
            "uid": "ehir56wozoqo"
        }
    }

    const initials = user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    const formatDate = (timestamp: number) => {
        return new Date(timestamp).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 mt-35 pt-24">
            <div className="container mx-auto px-4 py-8 max-w-5xl">
                {/* Header Card */}
                <Card className="mb-6">
                    <CardContent className="pt-6">
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                            <Avatar className="w-24 h-24">
                                <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                                    {initials}
                                </AvatarFallback>
                            </Avatar>

                            <div className="flex-1">
                                <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                                <div className="flex flex-col gap-2 mt-3 text-sm text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-4 h-4" />
                                        <span>{user.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        <span>Member since {formatDate(user.createdTime)}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        <span>Last login: {formatDate(user.lastLoginTime)}</span>
                                    </div>
                                </div>
                            </div>

                            <Button variant="destructive" onClick={handleLogout} disabled={isLoggingOut}>
                                {isLoggingOut ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Logging out...
                                    </>
                                ) : (
                                    <>
                                        <LogOut className="w-4 h-4 mr-2" />
                                        Logout
                                    </>
                                )}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Profile Tabs */}
                <Tabs defaultValue="overview" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-5">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="learning">Learning</TabsTrigger>
                        <TabsTrigger value="applications">Applications</TabsTrigger>
                        <TabsTrigger value="startups">Startups</TabsTrigger>
                        <TabsTrigger value="settings">Settings</TabsTrigger>
                    </TabsList>

                    {/* Overview Tab */}
                    <TabsContent value="overview" className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-3">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
                                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">0</div>
                                    <p className="text-xs text-muted-foreground">Start learning today</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Applications</CardTitle>
                                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">0</div>
                                    <p className="text-xs text-muted-foreground">No applications yet</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Startups Joined</CardTitle>
                                    <Rocket className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">0</div>
                                    <p className="text-xs text-muted-foreground">Explore startup hub</p>
                                </CardContent>
                            </Card>
                        </div>

                        <Card>
                            <CardHeader>
                                <CardTitle>Account Information</CardTitle>
                                <CardDescription>Your Elevy account details</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between py-3 border-b">
                                    <div className="flex items-center gap-3">
                                        <User className="w-5 h-5 text-gray-400" />
                                        <div>
                                            <p className="font-medium">User ID</p>
                                            <p className="text-sm text-gray-500">{user.uid}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between py-3 border-b">
                                    <div className="flex items-center gap-3">
                                        <Shield className="w-5 h-5 text-gray-400" />
                                        <div>
                                            <p className="font-medium">Authentication Method</p>
                                            <p className="text-sm text-gray-500">Email OTP Verification</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Learning Tab */}
                    <TabsContent value="learning">
                        <Card>
                            <CardHeader>
                                <CardTitle>My Learning Journey</CardTitle>
                                <CardDescription>Track your courses and progress</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center py-12">
                                    <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No courses yet</h3>
                                    <p className="text-gray-500 mb-6">
                                        Browse our course catalog and start your learning journey
                                    </p>
                                    <Button onClick={() => navigate('/courses')}>Browse Courses</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Applications Tab */}
                    <TabsContent value="applications">
                        <Card>
                            <CardHeader>
                                <CardTitle>My Applications</CardTitle>
                                <CardDescription>Track your internship applications</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center py-12">
                                    <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No applications yet</h3>
                                    <p className="text-gray-500 mb-6">
                                        Explore internship opportunities and apply to positions
                                    </p>
                                    <Button onClick={() => navigate('/internships')}>View Internships</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Startups Tab */}
                    <TabsContent value="startups">
                        <Card>
                            <CardHeader>
                                <CardTitle>Startups</CardTitle>
                                <CardDescription>Track your Startups</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center py-12">
                                    <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Startups yet</h3>
                                    <Button onClick={() => navigate('/startups/create')}>Create Startup</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Settings Tab */}
                    <TabsContent value="settings">
                        <Card>
                            <CardHeader>
                                <CardTitle>Account Settings</CardTitle>
                                <CardDescription>Manage your account preferences</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center py-12">
                                    <Settings className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Settings coming soon</h3>
                                    <p className="text-gray-500">Additional account settings will be available soon</p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
