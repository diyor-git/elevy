

import { Internship } from "@/types/internship";

export const internships: Internship[] = [
  {
    id: "1",
    title: "Full-Stack Developer Intern",
    company: {
      id: "google",
      name: "Google",
      logo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=100&h=100&fit=crop",
      description: "Google LLC is an American multinational technology company that specializes in Internet-related services and products.",
      industry: "Technology",
      size: "10,000+ employees",
      location: "Mountain View, CA",
      website: "https://google.com",
      culture: ["Innovation-driven", "Collaborative", "Global impact", "20% time policy"],
      benefits: ["Health insurance", "Free meals", "Gym membership", "Learning budget", "Remote work options"]
    },
    category: "Software Development",
    format: "Hybrid",
    location: "Mountain View, CA",
    duration: "3 months",
    pay: "Paid",
    salary: "$8,000/month",
    description: "Join Google's engineering team to build products that impact billions of users worldwide. Work on cutting-edge technologies with experienced mentors.",
    responsibilities: [
      "Develop and maintain web applications using modern frameworks",
      "Collaborate with cross-functional teams on product features",
      "Write clean, maintainable, and well-documented code",
      "Participate in code reviews and technical discussions",
      "Contribute to internal tools and infrastructure improvements"
    ],
    requirements: {
      required: [
        "Currently pursuing Computer Science degree or related field",
        "Strong foundation in JavaScript, React, and Node.js",
        "Understanding of RESTful APIs and database design",
        "Excellent problem-solving skills"
      ],
      preferred: [
        "Previous internship experience",
        "Open source contributions",
        "Experience with TypeScript and cloud platforms",
        "Knowledge of CI/CD pipelines"
      ]
    },
    skills: ["React", "Node.js", "TypeScript", "PostgreSQL", "Docker", "Git"],
    startDate: "June 2025",
    deadline: "March 15, 2025",
    openings: 10,
    applicants: 245,
    reviews: [
      {
        id: "1",
        author: "Alex Chen",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
        role: "Former Intern (2024)",
        rating: 5,
        date: "2 months ago",
        text: "Amazing experience! The mentorship was incredible and I learned so much about scalable systems. The team treats interns like full members.",
        helpful: 24
      },
      {
        id: "2",
        author: "Sarah Williams",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
        role: "Former Intern (2023)",
        rating: 5,
        date: "6 months ago",
        text: "Best internship I've ever had. Real impact on products, great culture, and amazing learning opportunities.",
        helpful: 18
      }
    ],
    benefits: ["Health insurance", "Free meals", "Gym", "Learning budget"],
    featured: true
  },
  {
    id: "2",
    title: "Machine Learning Research Intern",
    company: {
      id: "openai",
      name: "OpenAI",
      logo: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=100&h=100&fit=crop",
      description: "OpenAI is an AI research and deployment company dedicated to ensuring artificial general intelligence benefits all of humanity.",
      industry: "Artificial Intelligence",
      size: "500-1000 employees",
      location: "San Francisco, CA",
      website: "https://openai.com",
      culture: ["Research excellence", "Safety-first", "Open collaboration", "Cutting-edge AI"],
      benefits: ["Competitive salary", "Health coverage", "Research resources", "Conference attendance", "Publication support"]
    },
    category: "Data Science",
    format: "Hybrid",
    location: "San Francisco, CA",
    duration: "6 months",
    pay: "Paid",
    salary: "$10,000/month",
    description: "Conduct cutting-edge research in machine learning and artificial intelligence. Work alongside world-class researchers on projects that push the boundaries of AI.",
    responsibilities: [
      "Design and implement novel machine learning algorithms",
      "Conduct experiments and analyze results",
      "Write research papers and technical documentation",
      "Collaborate with research scientists on AI safety projects",
      "Present findings at team meetings and conferences"
    ],
    requirements: {
      required: [
        "Currently pursuing PhD or Master's in Computer Science, ML, or related field",
        "Strong background in deep learning and neural networks",
        "Proficiency in Python and ML frameworks (PyTorch, TensorFlow)",
        "Published research papers (preferred but not required)"
      ],
      preferred: [
        "Experience with large language models",
        "Familiarity with reinforcement learning",
        "Strong mathematical background",
        "Previous research internship experience"
      ]
    },
    skills: ["Python", "PyTorch", "TensorFlow", "Deep Learning", "NLP", "Research"],
    startDate: "July 2025",
    deadline: "April 1, 2025",
    openings: 5,
    applicants: 412,
    reviews: [
      {
        id: "3",
        author: "Michael Zhang",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
        role: "Research Intern (2024)",
        rating: 5,
        date: "1 month ago",
        text: "Incredible opportunity to work on frontier AI research. The team is brilliant and the problems are fascinating.",
        helpful: 31
      }
    ],
    benefits: ["Competitive salary", "Health coverage", "Research resources", "Publications"],
    featured: true
  },
  {
    id: "3",
    title: "Product Design Intern",
    company: {
      id: "figma",
      name: "Figma",
      logo: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?w=100&h=100&fit=crop",
      description: "Figma is a collaborative web application for interface design, with additional offline features enabled by desktop applications.",
      industry: "Design Tools",
      size: "500-1000 employees",
      location: "San Francisco, CA",
      website: "https://figma.com",
      culture: ["Design-driven", "User-first", "Collaborative", "Innovation"],
      benefits: ["Health insurance", "Design tools stipend", "Professional development", "Flexible hours"]
    },
    category: "Design",
    format: "Remote",
    location: "Remote (US)",
    duration: "4 months",
    pay: "Paid",
    salary: "$7,000/month",
    description: "Design beautiful and functional user experiences for millions of designers worldwide. Work on features that redefine how teams collaborate on design.",
    responsibilities: [
      "Create wireframes, mockups, and interactive prototypes",
      "Conduct user research and usability testing",
      "Collaborate with engineers and product managers",
      "Design UI components and design systems",
      "Present design solutions to stakeholders"
    ],
    requirements: {
      required: [
        "Currently pursuing degree in Design, HCI, or related field",
        "Strong portfolio demonstrating UI/UX design skills",
        "Proficiency in Figma and design tools",
        "Understanding of design principles and user-centered design"
      ],
      preferred: [
        "Experience with design systems",
        "Knowledge of HTML/CSS",
        "Previous design internship",
        "Motion design skills"
      ]
    },
    skills: ["Figma", "UI/UX Design", "Prototyping", "User Research", "Design Systems"],
    startDate: "May 2025",
    deadline: "February 28, 2025",
    openings: 8,
    applicants: 189,
    reviews: [
      {
        id: "4",
        author: "Emma Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
        role: "Design Intern (2024)",
        rating: 5,
        date: "3 weeks ago",
        text: "Dream internship for any designer. You get to work on real features and your designs actually ship!",
        helpful: 27
      }
    ],
    benefits: ["Health insurance", "Design stipend", "Professional development", "Flexible hours"],
    featured: false
  },
  {
    id: "4",
    title: "Digital Marketing Intern",
    company: {
      id: "spotify",
      name: "Spotify",
      logo: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=100&h=100&fit=crop",
      description: "Spotify is a digital music, podcast, and video service that gives you access to millions of songs and other content from creators all over the world.",
      industry: "Music Streaming",
      size: "5,000-10,000 employees",
      location: "New York, NY",
      website: "https://spotify.com",
      culture: ["Music-driven", "Creative freedom", "Data-informed", "Global mindset"],
      benefits: ["Premium subscription", "Concert tickets", "Health coverage", "Wellness stipend"]
    },
    category: "Marketing",
    format: "Hybrid",
    location: "New York, NY",
    duration: "3 months",
    pay: "Paid",
    salary: "$6,500/month",
    description: "Help shape marketing campaigns that reach millions of music lovers worldwide. Learn digital marketing strategies from industry leaders.",
    responsibilities: [
      "Support digital marketing campaigns across channels",
      "Analyze campaign performance and create reports",
      "Create content for social media and email marketing",
      "Conduct market research and competitor analysis",
      "Assist with influencer partnerships and brand collaborations"
    ],
    requirements: {
      required: [
        "Currently pursuing Marketing, Communications, or Business degree",
        "Strong written and verbal communication skills",
        "Familiarity with social media platforms",
        "Basic understanding of digital marketing metrics"
      ],
      preferred: [
        "Experience with marketing tools (Hootsuite, Google Analytics)",
        "Content creation skills (photo/video editing)",
        "Previous marketing internship",
        "Passion for music and entertainment"
      ]
    },
    skills: ["Digital Marketing", "Social Media", "Analytics", "Content Creation", "SEO"],
    startDate: "June 2025",
    deadline: "March 20, 2025",
    openings: 6,
    applicants: 156,
    reviews: [
      {
        id: "5",
        author: "David Martinez",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
        role: "Marketing Intern (2023)",
        rating: 4,
        date: "8 months ago",
        text: "Great experience learning modern digital marketing. Fast-paced environment with lots of creative freedom.",
        helpful: 15
      }
    ],
    benefits: ["Spotify Premium", "Concert tickets", "Health coverage", "Wellness stipend"],
    featured: false
  },
  {
    id: "5",
    title: "Business Analyst Intern",
    company: {
      id: "mckinsey",
      name: "McKinsey & Company",
      logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop",
      description: "McKinsey & Company is a global management consulting firm that serves leading businesses, governments, and institutions.",
      industry: "Consulting",
      size: "30,000+ employees",
      location: "Boston, MA",
      website: "https://mckinsey.com",
      culture: ["Excellence-driven", "Problem-solving", "Client-first", "Global impact"],
      benefits: ["Competitive salary", "Travel opportunities", "Mentorship", "Professional development"]
    },
    category: "Business",
    format: "On-site",
    location: "Boston, MA",
    duration: "10 weeks",
    pay: "Paid",
    salary: "$9,000/month",
    description: "Work on real client projects solving complex business problems. Gain exposure to multiple industries and develop strategic thinking skills.",
    responsibilities: [
      "Conduct research and data analysis for client projects",
      "Build financial models and presentations",
      "Interview stakeholders and gather insights",
      "Support senior consultants in problem-solving",
      "Present findings to client teams"
    ],
    requirements: {
      required: [
        "Currently pursuing MBA or Bachelor's in Business, Economics",
        "Strong analytical and problem-solving skills",
        "Excellent Excel and PowerPoint skills",
        "Outstanding communication abilities"
      ],
      preferred: [
        "Previous consulting or business experience",
        "Leadership roles in student organizations",
        "Case competition experience",
        "Proficiency in additional languages"
      ]
    },
    skills: ["Business Analysis", "Excel", "PowerPoint", "Financial Modeling", "Strategy"],
    startDate: "June 2025",
    deadline: "February 15, 2025",
    openings: 20,
    applicants: 523,
    reviews: [
      {
        id: "6",
        author: "Jennifer Lee",
        avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop",
        role: "Analyst Intern (2024)",
        rating: 5,
        date: "2 months ago",
        text: "Intense but incredibly rewarding. You learn more in 10 weeks than a full semester. Amazing mentorship.",
        helpful: 42
      }
    ],
    benefits: ["Competitive salary", "Travel opportunities", "Mentorship", "Development"],
    featured: true
  },
  {
    id: "6",
    title: "Product Management Intern",
    company: {
      id: "stripe",
      name: "Stripe",
      logo: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=100&h=100&fit=crop",
      description: "Stripe is a technology company that builds economic infrastructure for the internet.",
      industry: "FinTech",
      size: "5,000-10,000 employees",
      location: "San Francisco, CA",
      website: "https://stripe.com",
      culture: ["Product excellence", "User-focused", "Technical depth", "Move fast"],
      benefits: ["Health insurance", "Learning budget", "Home office setup", "Commuter benefits"]
    },
    category: "Product Management",
    format: "Hybrid",
    location: "San Francisco, CA",
    duration: "4 months",
    pay: "Paid",
    salary: "$8,500/month",
    description: "Drive product strategy for internet economy infrastructure. Work with engineering and design teams to ship features that empower businesses globally.",
    responsibilities: [
      "Define product requirements and roadmaps",
      "Conduct user research and competitive analysis",
      "Work closely with engineering teams on implementation",
      "Analyze product metrics and user feedback",
      "Present product updates to leadership"
    ],
    requirements: {
      required: [
        "Currently pursuing degree in Computer Science, Business, or related field",
        "Strong technical understanding and business acumen",
        "Excellent communication and collaboration skills",
        "Data-driven decision making"
      ],
      preferred: [
        "Previous PM or technical internship",
        "Understanding of payment systems",
        "Experience with product analytics tools",
        "Coding experience"
      ]
    },
    skills: ["Product Management", "Analytics", "User Research", "SQL", "Roadmapping"],
    startDate: "May 2025",
    deadline: "March 10, 2025",
    openings: 4,
    applicants: 298,
    reviews: [
      {
        id: "7",
        author: "Ryan Patel",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
        role: "PM Intern (2024)",
        rating: 5,
        date: "1 month ago",
        text: "Incredible PM internship. You own real features and work with world-class teams. Highly technical environment.",
        helpful: 33
      }
    ],
    benefits: ["Health insurance", "Learning budget", "Home office setup", "Commuter benefits"],
    featured: false
  }
];
