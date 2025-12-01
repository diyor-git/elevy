export type TaskStatus = 'todo' | 'in-progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high' | 'critical';
export type StartupStage = 'mvp' | 'idea' | 'growth' | 'early-stage';
export type UserRole = 'CEO' | 'CTO' | 'Designer' | 'Developer' | 'Marketing' | 'Product Manager';
export type FundingStage = 'pre-seed' | 'seed' | 'series-a' | 'series-b' | 'series-c' | 'growth';

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatar: string;
    bio?: string;
    location?: string;
    linkedIn?: string;
    joinedDate?: Date;
}

export interface Comment {
    id: string;
    author: string;
    text: string;
    timestamp: Date;
}

export interface Activity {
    id: string;
    author: string;
    action: string;
    timestamp: Date;
}

export interface Task {
    id: string;
    title: string;
    status: TaskStatus;
    assignee: string;
    priority?: TaskPriority;
    description?: string;
    deadline?: Date;
    comments?: Comment[];
    activity?: Activity[];
}

export interface Message {
    id: string;
    author: string;
    message: string;
    timestamp: Date;
}

export interface Investor {
    id: string;
    name: string;
    type: 'Angel' | 'VC' | 'Corporate' | 'Strategic';
    invested: number;
    date: Date;
    contact?: string;
    notes?: string;
}

export interface JobApplicant {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    position: string;
    appliedDate: Date;
    status: 'pending' | 'reviewing' | 'accepted' | 'rejected';
    resume?: string;
    bio?: string;
    experience?: string;
    skills?: string[];
}

export interface JobPosting {
    id: string;
    title: string;
    role: UserRole;
    description: string;
    location: string;
    salary?: { min: number; max: number };
    type: 'Full-time' | 'Part-time' | 'Contract';
    posted: Date;
    status: 'open' | 'closed' | 'filled';
    applicants?: number;
    applicantsList?: JobApplicant[];
}

export interface Notification {
    id: string;
    type: 'message' | 'application' | 'view' | 'funding' | 'job';
    title: string;
    message: string;
    timestamp: Date;
    read: boolean;
    link?: string;
}

export interface FundingRound {
    id: string;
    stage: any;
    amount: number;
    date: any;
    investors: string[];
    description?: string;
}

export interface Startup {
    id: string
    name: string;
    description: string;
    description_long: string;
    image: string;
    category: string;
    stage: 'idea' | 'mvp' | 'early-stage' | 'growth' | 'scaling';
    teamSize: number;
    website: string;
    email: string;
    founded: string;
    techStack: string[];
    seekingInvestors: boolean;
    productLink: string;
    createdAt: string;
    creatorId: string;
    jobs: any[];
    teamMembers: any[];
}


export interface StartupSearchFilterProps {
    searchQuery: string;
    selectedCategory: string;
    selectedStage: string;
    onSearchChange: (query: string) => void;
    onCategoryChange: (category: string) => void;
    onStageChange: (stage: string) => void;
    onResetFilters: () => void;
}