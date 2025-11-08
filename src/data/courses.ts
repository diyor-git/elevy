import { Course } from '@/types/course';

export const coursesData: Course[] = [
  {
    id: '1',
    title: 'Full-Stack Web Development',
    description: 'Освойте современную веб-разработку от основ до профессионального уровня. Изучите React, Node.js, TypeScript, базы данных и деплой приложений.',
    shortDescription: 'Станьте Full-Stack разработчиком за 12 недель',
    instructor: {
      name: 'Александр Петров',
      title: 'Senior Full-Stack Developer в Яндекс',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      bio: '10+ лет опыта в веб-разработке. Работал в Яндекс, Mail.ru Group. Автор 15+ курсов с 50,000+ студентами.'
    },
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    category: 'programming',
    level: 'intermediate',
    duration: '12 недель',
    durationHours: 120,
    rating: 4.9,
    reviewsCount: 2847,
    studentsCount: 15420,
    price: 0,
    isFree: true,
    company: 'Яндекс',
    skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker', 'Git'],
    curriculum: [
      {
        module: 'Модуль 1: Основы HTML, CSS и JavaScript',
        lessons: [
          { title: 'Введение в веб-разработку', duration: '15 мин' },
          { title: 'HTML5 семантика и структура', duration: '30 мин' },
          { title: 'CSS Grid и Flexbox', duration: '45 мин' },
          { title: 'JavaScript ES6+', duration: '60 мин' },
          { title: 'Практика: Создание лендинга', duration: '90 мин' }
        ]
      },
      {
        module: 'Модуль 2: React и современный Frontend',
        lessons: [
          { title: 'React компоненты и хуки', duration: '50 мин' },
          { title: 'State management с Zustand', duration: '40 мин' },
          { title: 'React Router и навигация', duration: '35 мин' },
          { title: 'Работа с API', duration: '45 мин' },
          { title: 'Практика: TODO-приложение', duration: '120 мин' }
        ]
      },
      {
        module: 'Модуль 3: Backend с Node.js',
        lessons: [
          { title: 'Node.js и Express.js', duration: '45 мин' },
          { title: 'RESTful API дизайн', duration: '40 мин' },
          { title: 'Аутентификация и JWT', duration: '50 мин' },
          { title: 'Работа с базами данных', duration: '60 мин' },
          { title: 'Практика: Backend для приложения', duration: '100 мин' }
        ]
      },
      {
        module: 'Модуль 4: Деплой и DevOps',
        lessons: [
          { title: 'Docker контейнеризация', duration: '45 мин' },
          { title: 'CI/CD с GitHub Actions', duration: '40 мин' },
          { title: 'Деплой на VPS', duration: '50 мin' },
          { title: 'Мониторинг и логирование', duration: '35 мин' },
          { title: 'Финальный проект', duration: '180 мин' }
        ]
      }
    ],
    learningOutcomes: [
      'Создавать современные веб-приложения с React',
      'Разрабатывать RESTful API с Node.js и Express',
      'Работать с PostgreSQL и MongoDB',
      'Деплоить приложения на production',
      'Использовать Git и GitHub для командной работы',
      'Применять TypeScript для типобезопасного кода'
    ],
    requirements: [
      'Базовые знания программирования',
      'Компьютер с доступом в интернет',
      'Желание учиться и практиковаться'
    ],
    reviews: [
      {
        id: 'r1',
        userName: 'Мария Иванова',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
        rating: 5,
        date: '2025-01-15',
        comment: 'Лучший курс по веб-разработке! Всё понятно объясняется, много практики. За 3 месяца прошла путь от новичка до Junior разработчика.'
      },
      {
        id: 'r2',
        userName: 'Дмитрий Смирнов',
        userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
        rating: 5,
        date: '2025-01-10',
        comment: 'Отличная структура курса и проекты. Александр - супер преподаватель, всё разжёвывает. Получил оффер после прохождения!'
      },
      {
        id: 'r3',
        userName: 'Анна Козлова',
        userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
        rating: 4,
        date: '2024-12-20',
        comment: 'Очень насыщенный курс, иногда не хватало времени на практику. Но материал отличный, рекомендую!'
      }
    ],
    certificate: true
  },
  {
    id: '2',
    title: 'UI/UX Design: От основ до профи',
    description: 'Полный курс по UI/UX дизайну. Освойте Figma, создавайте интерфейсы, проводите исследования и тестирования.',
    shortDescription: 'Создавайте красивые и удобные интерфейсы',
    instructor: {
      name: 'Елена Морозова',
      title: 'Lead Product Designer в VK',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
      bio: '8 лет в дизайне продуктов. Создавала интерфейсы для VK, Авито, Тинькофф. Ментор 200+ дизайнеров.'
    },
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
    category: 'design',
    level: 'beginner',
    duration: '8 недель',
    durationHours: 80,
    rating: 4.8,
    reviewsCount: 1523,
    studentsCount: 8940,
    price: 0,
    isFree: true,
    company: 'VK',
    skills: ['Figma', 'UI Design', 'UX Research', 'Prototyping', 'Design Systems'],
    curriculum: [
      {
        module: 'Модуль 1: Основы дизайна',
        lessons: [
          { title: 'Принципы дизайна', duration: '25 мин' },
          { title: 'Типографика и цвет', duration: '35 мин' },
          { title: 'Композиция и сетки', duration: '30 мин' },
          { title: 'Основы Figma', duration: '45 мин' }
        ]
      },
      {
        module: 'Модуль 2: UX исследования',
        lessons: [
          { title: 'User research методы', duration: '40 мин' },
          { title: 'Создание персон', duration: '35 мин' },
          { title: 'User journey mapping', duration: '45 мин' },
          { title: 'Практика: UX анализ', duration: '90 мин' }
        ]
      },
      {
        module: 'Модуль 3: Создание интерфейсов',
        lessons: [
          { title: 'Wireframing', duration: '30 мин' },
          { title: 'UI компоненты', duration: '40 мин' },
          { title: 'Прототипирование', duration: '50 мин' },
          { title: 'Design системы', duration: '45 мин' }
        ]
      }
    ],
    learningOutcomes: [
      'Создавать современные UI интерфейсы',
      'Проводить UX исследования',
      'Работать в Figma профессионально',
      'Создавать прототипы и тестировать',
      'Разрабатывать дизайн-системы'
    ],
    requirements: [
      'Компьютер (Mac или PC)',
      'Желание создавать красивые вещи',
      'Никакого опыта не требуется'
    ],
    reviews: [
      {
        id: 'r4',
        userName: 'Ольга Петрова',
        userAvatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop',
        rating: 5,
        date: '2025-01-12',
        comment: 'Елена - потрясающий преподаватель! После курса начала работать дизайнером в стартапе.'
      }
    ],
    certificate: true
  },
  {
    id: '3',
    title: 'Data Science и Machine Learning',
    description: 'Погрузитесь в мир данных и искусственного интеллекта. Изучите Python, pandas, scikit-learn и создавайте ML модели.',
    shortDescription: 'Станьте Data Scientist и создавайте ML модели',
    instructor: {
      name: 'Игорь Волков',
      title: 'Lead ML Engineer в Сбер',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      bio: 'PhD в Computer Science. 12 лет в ML. Работал в Сбер, Яндекс. Опубликовал 20+ научных статей.'
    },
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    category: 'data-science',
    level: 'intermediate',
    duration: '16 недель',
    durationHours: 160,
    rating: 4.9,
    reviewsCount: 3241,
    studentsCount: 12800,
    price: 0,
    isFree: true,
    company: 'Сбер',
    skills: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'TensorFlow', 'SQL'],
    curriculum: [
      {
        module: 'Модуль 1: Python для Data Science',
        lessons: [
          { title: 'Python основы', duration: '40 мин' },
          { title: 'NumPy и массивы', duration: '45 мин' },
          { title: 'Pandas для данных', duration: '60 мин' },
          { title: 'Визуализация с Matplotlib', duration: '50 мин' }
        ]
      },
      {
        module: 'Модуль 2: Machine Learning',
        lessons: [
          { title: 'Введение в ML', duration: '35 мин' },
          { title: 'Supervised Learning', duration: '50 мин' },
          { title: 'Unsupervised Learning', duration: '45 мин' },
          { title: 'Model evaluation', duration: '40 мин' }
        ]
      },
      {
        module: 'Модуль 3: Deep Learning',
        lessons: [
          { title: 'Neural Networks', duration: '60 мин' },
          { title: 'TensorFlow и Keras', duration: '55 мин' },
          { title: 'CNN для изображений', duration: '50 мин' },
          { title: 'Практика: Image classifier', duration: '120 мин' }
        ]
      }
    ],
    learningOutcomes: [
      'Анализировать данные с Python',
      'Создавать ML модели',
      'Работать с нейросетями',
      'Визуализировать результаты',
      'Деплоить ML модели'
    ],
    requirements: [
      'Базовые знания Python',
      'Математика (алгебра, статистика)',
      'Мощный компьютер (желательно с GPU)'
    ],
    reviews: [
      {
        id: 'r5',
        userName: 'Сергей Новиков',
        userAvatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop',
        rating: 5,
        date: '2025-01-08',
        comment: 'Глубокий курс с отличными практическими заданиями. Игорь объясняет сложные концепции просто и понятно.'
      }
    ],
    certificate: true
  },
  {
    id: '4',
    title: 'Digital Marketing: SEO, SMM, контекст',
    description: 'Освойте все инструменты digital-маркетинга. SEO оптимизация, SMM стратегии, контекстная реклама, аналитика.',
    shortDescription: 'Станьте востребованным digital-маркетологом',
    instructor: {
      name: 'Татьяна Белова',
      title: 'Head of Marketing в Ozon',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
      bio: '9 лет в digital. Управляла маркетингом в Ozon, Wildberries. Эксперт по перформанс-маркетингу.'
    },
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    category: 'marketing',
    level: 'beginner',
    duration: '10 недель',
    durationHours: 100,
    rating: 4.7,
    reviewsCount: 1876,
    studentsCount: 10250,
    price: 0,
    isFree: true,
    company: 'Ozon',
    skills: ['SEO', 'SMM', 'Google Ads', 'Yandex.Direct', 'Google Analytics', 'Content Marketing'],
    curriculum: [
      {
        module: 'Модуль 1: Основы digital-маркетинга',
        lessons: [
          { title: 'Введение в digital', duration: '30 мин' },
          { title: 'Маркетинговые воронки', duration: '35 мин' },
          { title: 'Целевая аудитория', duration: '40 мин' }
        ]
      },
      {
        module: 'Модуль 2: SEO оптимизация',
        lessons: [
          { title: 'SEO основы', duration: '45 мин' },
          { title: 'Keyword research', duration: '40 мин' },
          { title: 'On-page SEO', duration: '50 мин' },
          { title: 'Link building', duration: '45 мин' }
        ]
      },
      {
        module: 'Модуль 3: Контекстная реклама',
        lessons: [
          { title: 'Google Ads', duration: '50 мин' },
          { title: 'Yandex.Direct', duration: '45 мин' },
          { title: 'Ретаргетинг', duration: '40 мин' }
        ]
      }
    ],
    learningOutcomes: [
      'Проводить SEO оптимизацию сайтов',
      'Настраивать рекламу в Google и Яндекс',
      'Разрабатывать SMM стратегии',
      'Анализировать метрики и ROI',
      'Создавать контент-стратегии'
    ],
    requirements: [
      'Базовое понимание интернета',
      'Желание работать с цифрами',
      'Креативное мышление'
    ],
    reviews: [
      {
        id: 'r6',
        userName: 'Максим Орлов',
        userAvatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop',
        rating: 5,
        date: '2025-01-05',
        comment: 'Практичный курс с реальными кейсами. После прохождения устроился маркетологом в e-commerce компанию.'
      }
    ],
    certificate: true
  },
  {
    id: '5',
    title: 'Основы Product Management',
    description: 'Научитесь создавать успешные продукты. Product discovery, roadmapping, работа с командой, метрики, A/B тесты.',
    shortDescription: 'Станьте Product Manager и создавайте продукты',
    instructor: {
      name: 'Андрей Соколов',
      title: 'Product Director в Авито',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
      bio: '11 лет в product management. Запустил 10+ продуктов в Авито, Яндекс.Маркет. Ментор для PM.'
    },
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    category: 'business',
    level: 'intermediate',
    duration: '8 недель',
    durationHours: 80,
    rating: 4.8,
    reviewsCount: 2156,
    studentsCount: 7890,
    price: 0,
    isFree: true,
    company: 'Авито',
    skills: ['Product Strategy', 'Roadmapping', 'User Research', 'A/B Testing', 'Analytics', 'Agile'],
    curriculum: [
      {
        module: 'Модуль 1: Роль Product Manager',
        lessons: [
          { title: 'Что делает PM', duration: '30 мин' },
          { title: 'Product lifecycle', duration: '35 мин' },
          { title: 'Работа с командой', duration: '40 мин' }
        ]
      },
      {
        module: 'Модуль 2: Product Discovery',
        lessons: [
          { title: 'Customer development', duration: '45 мин' },
          { title: 'Jobs to be done', duration: '40 мин' },
          { title: 'Product vision', duration: '35 мин' }
        ]
      },
      {
        module: 'Модуль 3: Execution',
        lessons: [
          { title: 'Roadmapping', duration: '50 мин' },
          { title: 'Приоритизация', duration: '45 мин' },
          { title: 'A/B тестирование', duration: '55 мин' }
        ]
      }
    ],
    learningOutcomes: [
      'Создавать product strategy',
      'Проводить customer research',
      'Приоритизировать фичи',
      'Работать с командой разработки',
      'Анализировать продуктовые метрики'
    ],
    requirements: [
      'Опыт работы в IT (желательно)',
      'Аналитическое мышление',
      'Желание создавать продукты'
    ],
    reviews: [
      {
        id: 'r7',
        userName: 'Екатерина Лебедева',
        userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
        rating: 5,
        date: '2024-12-28',
        comment: 'Андрей делится реальным опытом и кейсами. Курс помог мне перейти из аналитиков в PM.'
      }
    ],
    certificate: true
  },
  {
    id: '6',
    title: 'Mobile Development: iOS и Android',
    description: 'Разработка мобильных приложений для iOS и Android. React Native, Swift, Kotlin. От идеи до публикации в сторах.',
    shortDescription: 'Создавайте мобильные приложения',
    instructor: {
      name: 'Владимир Кузнецов',
      title: 'Senior Mobile Developer в Тинькофф',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      bio: '9 лет в mobile dev. Разработал 30+ приложений для iOS и Android в Тинькофф, Сбер.'
    },
    thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
    category: 'programming',
    level: 'intermediate',
    duration: '14 недель',
    durationHours: 140,
    rating: 4.9,
    reviewsCount: 1987,
    studentsCount: 9340,
    price: 0,
    isFree: true,
    company: 'Тинькофф',
    skills: ['React Native', 'Swift', 'Kotlin', 'Firebase', 'App Store', 'Google Play'],
    curriculum: [
      {
        module: 'Модуль 1: React Native',
        lessons: [
          { title: 'Введение в React Native', duration: '40 мин' },
          { title: 'Components и Navigation', duration: '50 мин' },
          { title: 'State management', duration: '45 мин' },
          { title: 'Работа с API', duration: '55 мин' }
        ]
      },
      {
        module: 'Модуль 2: Нативная разработка',
        lessons: [
          { title: 'iOS с Swift', duration: '60 мин' },
          { title: 'Android с Kotlin', duration: '60 мин' },
          { title: 'Native modules', duration: '50 мин' }
        ]
      },
      {
        module: 'Модуль 3: Публикация',
        lessons: [
          { title: 'App Store guidelines', duration: '40 мин' },
          { title: 'Google Play publishing', duration: '40 мин' },
          { title: 'App monetization', duration: '45 мин' }
        ]
      }
    ],
    learningOutcomes: [
      'Создавать приложения на React Native',
      'Разрабатывать нативные модули',
      'Интегрировать Firebase',
      'Публиковать в App Store и Google Play',
      'Монетизировать приложения'
    ],
    requirements: [
      'Знание JavaScript/React',
      'Mac для iOS разработки (опционально)',
      'Базовые знания мобильных платформ'
    ],
    reviews: [
      {
        id: 'r8',
        userName: 'Никита Федоров',
        userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
        rating: 5,
        date: '2024-12-15',
        comment: 'Отличный курс! Создал своё первое приложение и опубликовал в App Store за время обучения.'
      }
    ],
    certificate: true
  }
];

// Helper functions
export const getCourseById = (id: string): Course | undefined => {
  return coursesData.find(course => course.id === id);
};

export const getCoursesByCategory = (category: string): Course[] => {
  if (category === 'all') return coursesData;
  return coursesData.filter(course => course.category === category);
};

export const getCoursesByLevel = (level: string): Course[] => {
  if (level === 'all') return coursesData;
  return coursesData.filter(course => course.level === level);
};

export const searchCourses = (query: string): Course[] => {
  const lowerQuery = query.toLowerCase();
  return coursesData.filter(course => 
    course.title.toLowerCase().includes(lowerQuery) ||
    course.description.toLowerCase().includes(lowerQuery) ||
    course.skills.some(skill => skill.toLowerCase().includes(lowerQuery))
  );
};
