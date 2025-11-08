import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { table } from '@devvai/devv-code-backend';
import { Users, BookOpen, Briefcase, Rocket, TrendingUp, Activity } from 'lucide-react';
import type { AnalyticsData } from '@/types/admin';

export function Analytics() {
    const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadAnalytics();
    }, []);

    const loadAnalytics = async () => {
        try {
            setLoading(true);

            // Get all data
            const [usersRes, coursesRes, internshipsRes, startupsRes, applicationsRes, enrollmentsRes] = await Promise.all([
                table.getItems('f3i1mk4ppbls', { limit: 100 }),
                table.getItems('f3i2sdx35udc', { limit: 100 }),
                table.getItems('f3i2sdwj6nls', { limit: 100 }),
                table.getItems('f3i2sdwj6nlt', { limit: 100 }),
                table.getItems('f3i1mk4pp8g1', { limit: 100 }),
                table.getItems('f3i1mk4pp8g0', { limit: 100 }),
            ]);

            const users = usersRes.items || [];
            const courses = coursesRes.items || [];
            const internships = internshipsRes.items || [];
            const startups = startupsRes.items || [];
            const applications = applicationsRes.items || [];
            const enrollments = enrollmentsRes.items || [];

            // Calculate analytics
            const now = Date.now();
            const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;

            const newUsersThisMonth = users.filter((u: any) => u.createdAt > thirtyDaysAgo).length;
            const activeUsers = users.filter((u: any) => u.updatedAt > thirtyDaysAgo).length;

            // User growth by month (last 6 months)
            const userGrowth = calculateMonthlyGrowth(users);

            // Top courses by enrollments
            const courseEnrollments = enrollments.reduce((acc: any, enrollment: any) => {
                const courseId = enrollment.courseId;
                acc[courseId] = (acc[courseId] || 0) + 1;
                return acc;
            }, {});

            const topCourses = Object.entries(courseEnrollments)
                .sort(([, a]: any, [, b]: any) => b - a)
                .slice(0, 5)
                .map(([id, count]: any) => {
                    const course = courses.find((c: any) => c._id === id);
                    return {
                        id,
                        name: course?.title || 'Unknown Course',
                        enrollments: count,
                    };
                });

            // Application stats
            const applicationStats = ['pending', 'reviewing', 'interviewed', 'accepted', 'rejected'].map((status) => ({
                status,
                count: applications.filter((a: any) => a.status === status).length,
            }));

            setAnalytics({
                totalUsers: users.length,
                newUsersThisMonth,
                totalCourses: courses.length,
                totalInternships: internships.length,
                totalStartups: startups.length,
                totalApplications: applications.length,
                activeUsers,
                userGrowth,
                topCourses,
                applicationStats,
            });
        } catch (error) {
            console.error('Failed to load analytics:', error);
        } finally {
            setLoading(false);
        }
    };

    const calculateMonthlyGrowth = (users: any[]) => {
        const months = [];
        const now = new Date();

        for (let i = 5; i >= 0; i--) {
            const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const monthStart = date.getTime();
            const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0).getTime();

            const count = users.filter(u => u.createdAt >= monthStart && u.createdAt <= monthEnd).length;

            months.push({
                month: date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
                count,
            });
        }

        return months;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!analytics) {
        return (
            <div className="text-center py-12">
                <p className="text-muted-foreground">Failed to load analytics data</p>
            </div>
        );
    }

    const stats = [
        {
            title: 'Total Users',
            value: analytics.totalUsers,
            icon: Users,
            change: `+${analytics.newUsersThisMonth} this month`,
            color: 'text-blue-500',
        },
        {
            title: 'Active Users',
            value: analytics.activeUsers,
            icon: Activity,
            change: 'Last 30 days',
            color: 'text-green-500',
        },
        {
            title: 'Courses',
            value: analytics.totalCourses,
            icon: BookOpen,
            change: 'Total published',
            color: 'text-purple-500',
        },
        {
            title: 'Internships',
            value: analytics.totalInternships,
            icon: Briefcase,
            change: `${analytics.totalApplications} applications`,
            color: 'text-orange-500',
        },
        {
            title: 'Startups',
            value: analytics.totalStartups,
            icon: Rocket,
            change: 'Active startups',
            color: 'text-pink-500',
        },
        {
            title: 'Growth Rate',
            value: '+12%',
            icon: TrendingUp,
            change: 'vs last month',
            color: 'text-emerald-500',
        },
    ];

    return (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={stat.title}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                                <Icon className={`h-4 w-4 ${stat.color}`} />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Charts Row */}
            <div className="grid gap-4 md:grid-cols-2">
                {/* User Growth */}
                <Card>
                    <CardHeader>
                        <CardTitle>User Growth</CardTitle>
                        <CardDescription>New user registrations over time</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {analytics.userGrowth.map((month) => (
                                <div key={month.month} className="flex items-center">
                                    <div className="w-20 text-sm text-muted-foreground">{month.month}</div>
                                    <div className="flex-1">
                                        <div className="h-8 bg-muted rounded-md overflow-hidden">
                                            <div
                                                className="h-full bg-primary transition-all"
                                                style={{
                                                    width: `${(month.count / Math.max(...analytics.userGrowth.map(m => m.count))) * 100}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-12 text-right text-sm font-medium">{month.count}</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Top Courses */}
                <Card>
                    <CardHeader>
                        <CardTitle>Top Courses</CardTitle>
                        <CardDescription>Most enrolled courses</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {analytics.topCourses.length > 0 ? (
                                analytics.topCourses.map((course) => (
                                    <div key={course.id} className="flex items-center justify-between">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">{course.name}</p>
                                            <p className="text-xs text-muted-foreground">{course.enrollments} students</p>
                                        </div>
                                        <div className="ml-4 flex-shrink-0">
                                            <div className="text-right">
                                                <div className="text-sm font-bold text-primary">{course.enrollments}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-muted-foreground text-center py-4">No enrollment data yet</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Application Stats */}
            <Card>
                <CardHeader>
                    <CardTitle>Application Statistics</CardTitle>
                    <CardDescription>Breakdown of application statuses</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {analytics.applicationStats.map((stat) => (
                            <div key={stat.status} className="text-center p-4 rounded-lg border">
                                <div className="text-2xl font-bold mb-1">{stat.count}</div>
                                <div className="text-xs text-muted-foreground capitalize">{stat.status}</div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
