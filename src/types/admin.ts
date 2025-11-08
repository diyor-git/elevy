
export interface AdminUser {
    _uid: string;
    _id: string;
    role: 'admin' | 'super_admin';
    permissions: AdminPermission[];
    createdAt: number;
}

export type AdminPermission =
    | 'users_view'
    | 'users_edit'
    | 'users_delete'
    | 'content_view'
    | 'content_edit'
    | 'content_delete'
    | 'content_moderate'
    | 'analytics_view'
    | 'settings_manage';

export interface Course {
    _uid: string; // admin who created
    _id: string;
    title: string;
    description: string;
    instructor: string;
    thumbnail: string;
    category: string;
    level: 'beginner' | 'intermediate' | 'advanced';
    duration: number; // in hours
    lessons: number;
    price: number;
    rating: number;
    studentsCount: number;
    curriculum: CourseLesson[];
    status: 'draft' | 'published' | 'archived';
    createdAt: number;
    updatedAt: number;
}

export interface CourseLesson {
    id: string;
    title: string;
    duration: number; // in minutes
    type: 'video' | 'reading' | 'quiz' | 'assignment';
}

export interface Internship {
    _uid: string; // admin who created
    _id: string;
    title: string;
    companyName: string;
    companyLogo: string;
    location: string;
    locationType: 'remote' | 'onsite' | 'hybrid';
    description: string;
    requirements: string[];
    responsibilities: string[];
    duration: string; // e.g., "3 months"
    stipend?: number;
    category: string;
    applicationDeadline: number;
    applicationsCount: number;
    status: 'draft' | 'published' | 'closed' | 'archived';
    createdAt: number;
    updatedAt: number;
}

export interface Startup {
    _uid: string; // admin who created
    _id: string;
    name: string;
    logo: string;
    tagline: string;
    description: string;
    industry: string;
    stage: 'idea' | 'mvp' | 'launched' | 'growing' | 'scaling';
    founded: number;
    teamSize: number;
    website?: string;
    lookingFor: string[]; // e.g., ['co-founder', 'interns', 'advisors']
    status: 'draft' | 'published' | 'archived';
    createdAt: number;
    updatedAt: number;
}

export interface ContentReport {
    _uid: string; // user who reported
    _id: string;
    contentType: 'course' | 'internship' | 'startup' | 'user_profile';
    contentId: string;
    reason: string;
    description?: string;
    status: 'pending' | 'reviewing' | 'resolved' | 'dismissed';
    reviewedBy?: string; // admin uid
    reviewedAt?: number;
    createdAt: number;
}

export interface AnalyticsData {
    totalUsers: number;
    newUsersThisMonth: number;
    totalCourses: number;
    totalInternships: number;
    totalStartups: number;
    totalApplications: number;
    activeUsers: number; // logged in last 30 days
    userGrowth: { month: string; count: number }[];
    topCourses: { id: string; name: string; enrollments: number }[];
    applicationStats: { status: string; count: number }[];
}
