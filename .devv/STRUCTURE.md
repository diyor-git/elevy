# This file is only for editing file nodes, do not break the structure
## Project Description
Elevy is a comprehensive EdTech platform uniting education, career, and startups for students. Inspired by Notion, Coursera, Linear, and Y Combinator, it offers a clean, modern interface with courses, internships, startup hub, community forum, and AI assistants.

## Key Features
✅ Phase 1: Modern landing page with hero, features showcase, courses/internships/startups previews
✅ Phase 2: Education Hub - complete courses listing, search/filters, detail pages with curriculum
✅ Phase 3: Internships Section - advanced filters, company profiles, AI resume advisor integration
- Responsive navigation with floating header
- AI chat assistant (floating button)
- Clean, minimal design with blue/turquoise accents
- Multi-section homepage with testimonials and CTAs

## Data Storage
Tables: None yet (currently using mock data in src/data/)
Local: None
Mock data files:
- src/data/courses.ts - 6 sample courses with full details
- src/data/internships.ts - 6 sample internships with companies, reviews, requirements

## Devv SDK Integration
Built-in: None yet (planned for future phases - auth, database, AI)
External: None

## Special Requirements
- Modern Minimal design inspired by Notion × Coursera × Linear × Y Combinator
- Clean interface with generous whitespace
- Blue/turquoise color palette (HSL: 210 100% 50% primary, 195 85% 50% secondary)
- Inter font family throughout
- Smooth animations and hover effects
- Mobile-responsive design
- Multi-language support planned (RU/EN/UZ)

/src
├── assets/          # Static resources directory
│
├── components/      # Shared components
│   ├── ui/         # Pre-installed shadcn/ui components
│   ├── Navbar.tsx  # Main navigation with floating header
│   ├── Footer.tsx  # Site footer with links and social
│   ├── AIAssistant.tsx # Floating AI chat button and window
│   ├── CourseCard.tsx # Course card component with hover effects
│   └── InternshipCard.tsx # Internship card component with company info
│
├── hooks/          # Custom Hooks directory
│   ├── use-mobile.ts # Mobile detection Hook
│   └── use-toast.ts  # Toast notification system Hook
│
├── types/          # TypeScript type definitions
│   ├── course.ts   # Course and instructor types
│   └── internship.ts # Internship, company, and review types
│
├── data/           # Mock data files
│   ├── courses.ts  # 6 sample courses with full details
│   └── internships.ts # 6 sample internships with companies
│
├── lib/            # Utility library directory
│   └── utils.ts    # Utility functions, including cn function for merging Tailwind classes
│
├── pages/          # Page components directory (React Router structure)
│   ├── HomePage.tsx # Complete home page with all sections
│   ├── CoursesPage.tsx # Courses listing with search and filters
│   ├── CourseDetailPage.tsx # Course detail page with curriculum, reviews, enrollment
│   ├── InternshipsPage.tsx # Internships listing with advanced filters
│   ├── InternshipDetailPage.tsx # Internship detail with company info, AI resume advisor
│   ├── StartupsPage.tsx # Startups hub [next: implement Phase 4]
│   ├── CommunityPage.tsx # Community forum [next: implement Phase 5]
│   ├── AIPage.tsx # AI zone [next: implement Phase 6]
│   └── NotFoundPage.tsx # 404 error page
│
├── store/          # State management directory (Zustand)
│   └── [future auth and app state stores]
│
├── features/       # Feature modules directory
│   └── [future feature modules for complex functionality]
│
├── App.tsx         # Root component with React Router, Navbar, Footer, AI Assistant
│
├── main.tsx        # Entry file, renders root component and mounts to DOM
│
├── index.css       # Elevy design system with Inter font, blue/turquoise colors, animations
│
└── tailwind.config.js  # Tailwind CSS v3 configuration file