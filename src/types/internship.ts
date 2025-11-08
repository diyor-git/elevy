export type InternshipCategory = 
  | "Software Development"
  | "Data Science"
  | "Design"
  | "Marketing"
  | "Business"
  | "Product Management";

export type InternshipFormat = "Remote" | "Hybrid" | "On-site";

export type InternshipPay = "Paid" | "Unpaid" | "Stipend";

export interface Company {
  id: string;
  name: string;
  logo: string;
  description: string;
  industry: string;
  size: string;
  location: string;
  website: string;
  culture: string[];
  benefits: string[];
}

export interface InternshipRequirement {
  required: string[];
  preferred: string[];
}

export interface InternshipReview {
  id: string;
  author: string;
  avatar: string;
  role: string;
  rating: number;
  date: string;
  text: string;
  helpful: number;
}

export interface Internship {
  id: string;
  title: string;
  company: Company;
  category: InternshipCategory;
  format: InternshipFormat;
  location: string;
  duration: string;
  pay: InternshipPay;
  salary?: string;
  description: string;
  responsibilities: string[];
  requirements: InternshipRequirement;
  skills: string[];
  startDate: string;
  deadline: string;
  openings: number;
  applicants: number;
  reviews: InternshipReview[];
  benefits: string[];
  featured: boolean;
}
