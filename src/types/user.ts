export interface User {
    projectId: string;
    uid: string;
    name: string;
    email: string;
    createdTime: number;
    lastLoginTime: number;
}

export interface UserProfile {
    _uid: string;
    _id: string;
    name: string;
    email: string;
    bio?: string;
    avatar?: string;
    location?: string;
    phone?: string;
    website?: string;
    linkedin?: string;
    github?: string;
    twitter?: string;
    skills: Skill[];
    education: Education[];
    experience: Experience[];
    createdAt: number;
    updatedAt: number;
}

export interface Skill {
    id: string;
    name: string;
    level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    endorsements: number;
}

export interface Education {
    id: string;
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    description?: string;
}

export interface Experience {
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    description?: string;
    location?: string;
}

export interface EnrolledCourse {
    _uid: string;
    _id: string;
    courseId: string;
    courseName: string;
    instructor: string;
    thumbnail: string;
    enrolledAt: number;
    progress: number;
    completedLessons: number;
    totalLessons: number;
    status: 'in-progress' | 'completed' | 'paused';
    certificateIssued?: boolean;
    certificateUrl?: string;
}

export interface Application {
    _uid: string;
    _id: string;
    type: 'internship' | 'job';
    itemId: string;
    companyName: string;
    position: string;
    appliedAt: number;
    status: 'pending' | 'reviewing' | 'interviewed' | 'accepted' | 'rejected';
    notes?: string;
    resumeUrl?: string;
}

export interface StartupParticipation {
    _uid: string;
    _id: string;
    startupId: string;
    startupName: string;
    role: string;
    joinedAt: number;
    status: 'active' | 'left' | 'graduated';
    equity?: number;
    description?: string;
}
