export type StartupStage =
    | 'idea'
    | 'mvp'
    | 'early-stage'
    | 'growth'
    | 'scaling';

export type StartupCategory =
    | 'edtech'
    | 'fintech'
    | 'healthtech'
    | 'e-commerce'
    | 'saas'
    | 'ai-ml'
    | 'social'
    | 'marketplace';

export type TeamMemberRole =
    | 'founder'
    | 'co-founder'
    | 'cto'
    | 'ceo'
    | 'designer'
    | 'developer'
    | 'marketer';

export interface TeamMember {
    id: string;
    name: string;
    role: TeamMemberRole;
    avatar: string;
    bio: string;
    linkedin?: string;
    twitter?: string;
    github?: string;
}

export interface StartupMetrics {
    users?: number;
    revenue?: string;
    funding?: string;
    team_size: number;
}

export interface Discussion {
    id: string;
    author: string;
    avatar: string;
    content: string;
    timestamp: string;
    likes: number;
    replies: number;
}

export interface Startup {
    id: string;
    name: string;
    tagline: string;
    description: string;
    logo: string;
    coverImage: string;
    category: StartupCategory;
    stage: StartupStage;
    founded: string;
    website?: string;
    team: TeamMember[];
    metrics: StartupMetrics;
    lookingFor: string[];
    technologies: string[];
    social: {
        twitter?: string;
        linkedin?: string;
        github?: string;
    };
    featured: boolean;
    discussions: Discussion[];
}
