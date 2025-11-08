import { Link } from 'react-router-dom'
import {
  BookOpen,
  Briefcase,
  Rocket,
  TrendingUp,
  Award,
  Users,
  Star,
  ArrowRight,
  CheckCircle2,
  Clock,
  MapPin,
  ChevronRight,
  DollarSign,
  GraduationCap,
  MessageSquare,
  Bot,
  Sparkles
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { internships } from '@/data/internships'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent" />
        <div className="container-custom relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
                🚀 Новая эра образования
              </Badge>
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
                Открой путь к{' '}
                <span className="gradient-text">знаниям, стажировкам</span> и стартапам
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl">
                Elevy — экосистема для студентов, которые хотят расти. Учись у лучших,
                находи возможности для карьеры и воплощай свои идеи в жизнь.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8 shadow-xl shadow-primary/25 group">
                  Начать обучение
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8">
                  Найти стажировку
                </Button>
              </div>
              <div className="flex items-center gap-8 mt-12 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-success" />
                  <span>Бесплатные курсы</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-success" />
                  <span>Реальные стажировки</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-success" />
                  <span>Активное комьюнити</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:block animate-fade-in">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-3xl" />
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop"
                  alt="Students learning"
                  className="relative rounded-3xl shadow-2xl w-full aspect-[4/3] object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need</h2>
            <p className="text-lg text-gray-600">
              A comprehensive platform for students to learn, work, and innovate
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                  <GraduationCap className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Education Hub</CardTitle>
                <CardDescription>
                  Access thousands of courses from top universities and industry experts
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-cyan-200 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-cyan-100 flex items-center justify-center mb-4">
                  <Briefcase className="w-6 h-6 text-cyan-600" />
                </div>
                <CardTitle>Internships</CardTitle>
                <CardDescription>
                  Discover internship opportunities at leading companies worldwide
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-purple-200 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                  <Rocket className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Startup Hub</CardTitle>
                <CardDescription>
                  Connect with innovative startups and entrepreneurial opportunities
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-green-200 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                  <MessageSquare className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>Community</CardTitle>
                <CardDescription>
                  Join a vibrant community of learners, professionals, and innovators
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-orange-200 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center mb-4">
                  <Bot className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle>AI Assistants</CardTitle>
                <CardDescription>
                  Get personalized guidance from AI mentors for learning and career
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-pink-200 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-pink-100 flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-pink-600" />
                </div>
                <CardTitle>Smart Features</CardTitle>
                <CardDescription>
                  Resume builder, skill tracking, and personalized recommendations
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 border-b border-border">
        <div className="container-custom">
          <p className="text-center text-xl text-muted-foreground font-medium mb-12 uppercase tracking-wider">
            Нам доверяют ведущие компании и университеты
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-60">
            {['Google', 'Microsoft', 'Tesla', 'Apple', 'Amazon', 'Meta'].map((company) => (
              <div
                key={company}
                className="text-center text-2xl font-bold text-muted-foreground hover:text-foreground transition-colors"
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="py-20 lg:py-32">
        <div className="container-custom">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Популярные курсы</h2>
              <p className="text-lg text-muted-foreground">
                Начни обучение с самых востребованных программ
              </p>
            </div>
            <Button variant="outline" className="hidden md:flex" asChild>
              <Link to="/courses">
                Все курсы
                <ChevronRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
          <div className="md:hidden mt-8">
            <Button variant="outline" className="w-full" asChild>
              <Link to="/courses">Все курсы</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Open Internships Section */}
      <section className="py-20 lg:py-32 bg-muted/50">
        <div className="container-custom">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Открытые стажировки</h2>
              <p className="text-lg text-muted-foreground">
                Найди стажировку мечты в лучших компаниях
              </p>
            </div>
            <Button variant="outline" className="hidden md:flex" asChild>
              <Link to="/internships">
                Все стажировки
                <ChevronRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {internships.slice(0, 4).map((internship) => (
              <InternshipPreviewCard key={internship.id} internship={internship} />
            ))}
          </div>
        </div>
      </section>

      {/* Top Startups Section */}
      <section className="py-20 lg:py-32">
        <div className="container-custom">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Топ стартапы недели</h2>
              <p className="text-lg text-muted-foreground">
                Присоединяйся к перспективным проектам
              </p>
            </div>
            <Button variant="outline" className="hidden md:flex" asChild>
              <Link to="/startups">
                Все стартапы
                <ChevronRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockStartups.map((startup) => (
              <StartupCard key={startup.id} startup={startup} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Отзывы студентов</h2>
            <p className="text-lg text-muted-foreground">
              Истории успеха тех, кто уже с нами
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {mockTestimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-card rounded-2xl p-8 shadow-sm border border-border hover-lift"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="container-custom">
          <div className="bg-gradient-to-br from-primary to-secondary rounded-3xl p-12 lg:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
            <div className="relative">
              <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                Готов начать свой путь?
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Присоединяйся к тысячам студентов, которые уже учатся, стажируются и
                создают будущее вместе с Elevy
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 shadow-xl bg-white text-primary hover:bg-white/90"
              >
                Присоединиться бесплатно
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Mock Data
const mockCourses = [
  {
    id: 1,
    title: 'Введение в Machine Learning',
    instructor: 'Анна Смирнова',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop',
    duration: '8 недель',
    rating: 4.9,
    students: 12543,
  },
  {
    id: 2,
    title: 'Full-Stack веб-разработка',
    instructor: 'Иван Петров',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
    duration: '12 недель',
    rating: 4.8,
    students: 8921,
  },
  {
    id: 3,
    title: 'UX/UI дизайн с нуля',
    instructor: 'Мария Козлова',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
    duration: '6 недель',
    rating: 5.0,
    students: 6734,
  },
]



const mockStartups = [
  {
    id: 1,
    name: 'EduTech Pro',
    description: 'AI-платформа для персонализированного обучения студентов',
    category: 'EdTech',
    stage: 'Рост',
    logo: '📚',
  },
  {
    id: 2,
    name: 'GreenEnergy',
    description: 'Решения для устойчивой энергетики и экологии',
    category: 'GreenTech',
    stage: 'Прототип',
    logo: '🌱',
  },
  {
    id: 3,
    name: 'HealthAI',
    description: 'Искусственный интеллект для диагностики заболеваний',
    category: 'HealthTech',
    stage: 'Инвестиции',
    logo: '🏥',
  },
]

const mockTestimonials = [
  {
    name: 'Алексей Соколов',
    role: 'Студент МГУ',
    text: 'Благодаря Elevy я нашел стажировку в Яндексе уже на втором курсе. Платформа действительно меняет жизнь студентов!',
  },
  {
    name: 'Екатерина Волкова',
    role: 'Выпускница СПбГУ',
    text: 'Курсы на Elevy помогли мне освоить UX-дизайн. Теперь я работаю в международной компании. Спасибо!',
  },
  {
    name: 'Дмитрий Новиков',
    role: 'Основатель стартапа',
    text: 'Здесь я нашел всю свою команду для стартапа. Комьюнити Elevy — это просто огонь! Рекомендую всем.',
  },
]

// Component Cards
function CourseCard({ course }: { course: typeof mockCourses[0] }) {
  return (
    <div className="group bg-card rounded-2xl overflow-hidden shadow-sm hover-lift border border-border">
      <div className="relative aspect-video bg-muted overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      <div className="p-6">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {course.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">{course.instructor}</p>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{course.rating}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>{course.students.toLocaleString()}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{course.duration}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function InternshipPreviewCard({ internship }: { internship: typeof internships[0] }) {
  return (
    <Link to={`/internships/${internship.id}`}>
      <div className="group bg-card rounded-2xl p-6 shadow-sm hover-lift border border-border h-full">
        <div className="flex items-start gap-4">
          <img 
            src={internship.company.logo} 
            alt={internship.company.name}
            className="w-12 h-12 rounded-lg object-cover border border-border/50"
          />
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors line-clamp-1">
                  {internship.title}
                </h3>
                <p className="text-muted-foreground">{internship.company.name}</p>
              </div>
            </div>
          <div className="flex flex-wrap items-center gap-3 mt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span className="truncate">{internship.location}</span>
            </div>
            <Badge variant="secondary" className="text-xs">
              {internship.format}
            </Badge>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{internship.duration}</span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
            <div className="flex items-center gap-1 text-sm">
              <DollarSign className="w-4 h-4 text-primary/70" />
              <span className="font-medium text-foreground">
                {internship.pay === "Paid" ? internship.salary : internship.pay}
              </span>
            </div>
            <Button size="sm" variant="outline" className="group-hover:shadow-md transition-all">
              Подробнее
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
    </Link>
  )
}

function StartupCard({ startup }: { startup: typeof mockStartups[0] }) {
  return (
    <div className="group bg-card rounded-2xl p-6 shadow-sm hover-lift border border-border">
      <div className="flex items-start gap-4 mb-4">
        <div className="text-4xl">{startup.logo}</div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
            {startup.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {startup.description}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 mb-4">
        <Badge variant="secondary" className="text-xs">
          {startup.category}
        </Badge>
        <Badge className="text-xs bg-success/10 text-success hover:bg-success/20 border-success/20">
          {startup.stage}
        </Badge>
      </div>
      <Button className="w-full" variant="outline">
        Узнать больше
      </Button>
    </div>
  )
}
