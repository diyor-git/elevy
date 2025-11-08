export interface ForumPost {
  _id: string;
  _uid: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    email: string;
  };
  likes: number;
  likedBy: string[];
  replyCount: number;
  views: number;
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ForumReply {
  _id: string;
  _uid: string;
  postId: string;
  content: string;
  author: {
    name: string;
    email: string;
  };
  likes: number;
  likedBy: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ForumCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  postCount: number;
}

export const FORUM_CATEGORIES: ForumCategory[] = [
  {
    id: 'general',
    name: 'General Discussion',
    description: 'General topics and conversations',
    icon: 'MessageSquare',
    postCount: 0,
  },
  {
    id: 'education',
    name: 'Education',
    description: 'Courses, learning tips, and study resources',
    icon: 'GraduationCap',
    postCount: 0,
  },
  {
    id: 'career',
    name: 'Career & Internships',
    description: 'Job opportunities, career advice, and internships',
    icon: 'Briefcase',
    postCount: 0,
  },
  {
    id: 'startups',
    name: 'Startups & Innovation',
    description: 'Entrepreneurship, startups, and innovation',
    icon: 'Rocket',
    postCount: 0,
  },
  {
    id: 'tech',
    name: 'Tech & Development',
    description: 'Programming, tech discussions, and development',
    icon: 'Code',
    postCount: 0,
  },
  {
    id: 'help',
    name: 'Help & Support',
    description: 'Platform help and technical support',
    icon: 'HelpCircle',
    postCount: 0,
  },
];

export const POPULAR_TAGS = [
  'beginner',
  'interview-prep',
  'python',
  'web-development',
  'machine-learning',
  'career-advice',
  'remote-work',
  'startup-ideas',
  'freelancing',
  'project-showcase',
  'networking',
  'resume-help',
];
