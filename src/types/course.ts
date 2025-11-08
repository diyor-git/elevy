export interface Course {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  instructor: {
    name: string;
    title: string;
    avatar: string;
    bio: string;
  };
  thumbnail: string;
  videoUrl?: string;
  category: 'programming' | 'design' | 'business' | 'data-science' | 'marketing' | 'other';
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string; // e.g., "6 weeks", "40 hours"
  durationHours: number;
  rating: number;
  reviewsCount: number;
  studentsCount: number;
  price: number;
  isFree: boolean;
  company?: string;
  skills: string[];
  curriculum: {
    module: string;
    lessons: {
      title: string;
      duration: string;
      isCompleted?: boolean;
    }[];
  }[];
  learningOutcomes: string[];
  requirements: string[];
  reviews: {
    id: string;
    userName: string;
    userAvatar: string;
    rating: number;
    date: string;
    comment: string;
  }[];
  enrollmentCount?: number;
  certificate: boolean;
}
