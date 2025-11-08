import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourseById } from '@/data/courses';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Star, 
  Clock, 
  Users, 
  Award,
  BookOpen,
  CheckCircle2,
  Play,
  ArrowLeft,
  Download,
  Share2,
  Bookmark,
  MessageSquare,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CourseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const course = id ? getCourseById(id) : undefined;

  const [isEnrolled, setIsEnrolled] = useState(false);
  const [expandedModules, setExpandedModules] = useState<number[]>([0]);
  const [userProgress, setUserProgress] = useState(0);

  if (!course) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Курс не найден</h2>
          <Button onClick={() => navigate('/courses')}>
            Вернуться к курсам
          </Button>
        </div>
      </div>
    );
  }

  const categoryLabels: Record<typeof course.category, string> = {
    programming: 'Программирование',
    design: 'Дизайн',
    business: 'Бизнес',
    'data-science': 'Data Science',
    marketing: 'Маркетинг',
    other: 'Другое'
  };

  const levelLabels: Record<typeof course.level, string> = {
    beginner: 'Начальный',
    intermediate: 'Средний',
    advanced: 'Продвинутый'
  };

  const toggleModule = (index: number) => {
    if (expandedModules.includes(index)) {
      setExpandedModules(expandedModules.filter(i => i !== index));
    } else {
      setExpandedModules([...expandedModules, index]);
    }
  };

  const handleEnroll = () => {
    setIsEnrolled(true);
    // In real app, this would call API
  };

  const totalLessons = course.curriculum.reduce((acc, module) => acc + module.lessons.length, 0);

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container-custom">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/courses')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          К списку курсов
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Video/Thumbnail */}
            <div className="relative aspect-video rounded-xl overflow-hidden bg-muted mb-6 group">
              <img 
                src={course.thumbnail} 
                alt={course.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="lg" className="rounded-full w-16 h-16">
                  <Play className="w-8 h-8" />
                </Button>
              </div>
            </div>

            {/* Title & Meta */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary">
                  {categoryLabels[course.category]}
                </Badge>
                <Badge variant="outline">
                  {levelLabels[course.level]}
                </Badge>
                {course.certificate && (
                  <Badge variant="outline" className="gap-1">
                    <Award className="w-3 h-3" />
                    Сертификат
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {course.title}
              </h1>

              <p className="text-lg text-muted-foreground mb-6">
                {course.description}
              </p>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{course.rating}</span>
                  <span className="text-muted-foreground">
                    ({course.reviewsCount} отзывов)
                  </span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Users className="w-5 h-5" />
                  <span>{course.studentsCount.toLocaleString()} студентов</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="w-5 h-5" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <BookOpen className="w-5 h-5" />
                  <span>{totalLessons} уроков</span>
                </div>
              </div>
            </div>

            {/* Instructor */}
            <Card className="p-6 mb-6">
              <h3 className="font-semibold text-lg mb-4">Преподаватель</h3>
              <div className="flex items-start gap-4">
                <img 
                  src={course.instructor.avatar} 
                  alt={course.instructor.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-lg mb-1">
                    {course.instructor.name}
                  </h4>
                  <p className="text-muted-foreground mb-2">
                    {course.instructor.title}
                  </p>
                  {course.company && (
                    <Badge variant="secondary" className="mb-3">
                      {course.company}
                    </Badge>
                  )}
                  <p className="text-sm text-muted-foreground">
                    {course.instructor.bio}
                  </p>
                </div>
              </div>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="curriculum" className="mb-8">
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="curriculum">Программа</TabsTrigger>
                <TabsTrigger value="outcomes">Чему научитесь</TabsTrigger>
                <TabsTrigger value="requirements">Требования</TabsTrigger>
                <TabsTrigger value="reviews">Отзывы</TabsTrigger>
              </TabsList>

              {/* Curriculum */}
              <TabsContent value="curriculum">
                <Card className="p-6">
                  <h3 className="font-semibold text-xl mb-4">
                    Программа курса
                  </h3>
                  <div className="space-y-3">
                    {course.curriculum.map((module, moduleIndex) => (
                      <div key={moduleIndex} className="border rounded-lg">
                        <button
                          onClick={() => toggleModule(moduleIndex)}
                          className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">
                              {moduleIndex + 1}
                            </div>
                            <span className="font-medium text-left">
                              {module.module}
                            </span>
                          </div>
                          {expandedModules.includes(moduleIndex) ? (
                            <ChevronUp className="w-5 h-5 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-muted-foreground" />
                          )}
                        </button>

                        {expandedModules.includes(moduleIndex) && (
                          <div className="border-t p-4 space-y-2">
                            {module.lessons.map((lesson, lessonIndex) => (
                              <div 
                                key={lessonIndex}
                                className="flex items-center justify-between py-2 px-3 rounded hover:bg-muted/50 transition-colors"
                              >
                                <div className="flex items-center gap-3">
                                  {lesson.isCompleted ? (
                                    <CheckCircle2 className="w-5 h-5 text-primary" />
                                  ) : (
                                    <Play className="w-5 h-5 text-muted-foreground" />
                                  )}
                                  <span className="text-sm">{lesson.title}</span>
                                </div>
                                <span className="text-sm text-muted-foreground">
                                  {lesson.duration}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              {/* Learning Outcomes */}
              <TabsContent value="outcomes">
                <Card className="p-6">
                  <h3 className="font-semibold text-xl mb-4">
                    Чему вы научитесь
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {course.learningOutcomes.map((outcome, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{outcome}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8">
                    <h4 className="font-semibold mb-3">Навыки</h4>
                    <div className="flex flex-wrap gap-2">
                      {course.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* Requirements */}
              <TabsContent value="requirements">
                <Card className="p-6">
                  <h3 className="font-semibold text-xl mb-4">
                    Требования
                  </h3>
                  <ul className="space-y-3">
                    {course.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </TabsContent>

              {/* Reviews */}
              <TabsContent value="reviews">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-xl">
                      Отзывы студентов
                    </h3>
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-lg">{course.rating}</span>
                      <span className="text-muted-foreground">
                        ({course.reviewsCount} отзывов)
                      </span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {course.reviews.map((review) => (
                      <div key={review.id} className="border-b pb-6 last:border-0">
                        <div className="flex items-start gap-4 mb-3">
                          <img 
                            src={review.userAvatar} 
                            alt={review.userName}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-medium">{review.userName}</h4>
                              <span className="text-sm text-muted-foreground">
                                {new Date(review.date).toLocaleDateString('ru-RU')}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 mb-2">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-4 h-4 ${
                                    i < review.rating 
                                      ? 'fill-yellow-400 text-yellow-400' 
                                      : 'text-muted-foreground'
                                  }`}
                                />
                              ))}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {review.comment}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button variant="outline" className="w-full mt-6">
                    Показать ещё отзывы
                  </Button>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <Card className="p-6">
                {/* Price */}
                <div className="mb-6">
                  {course.isFree ? (
                    <div className="text-3xl font-bold text-primary">
                      Бесплатно
                    </div>
                  ) : (
                    <div className="text-3xl font-bold">
                      {course.price.toLocaleString()} ₽
                    </div>
                  )}
                </div>

                {/* Progress (if enrolled) */}
                {isEnrolled && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Прогресс</span>
                      <span className="text-sm text-muted-foreground">
                        {userProgress}%
                      </span>
                    </div>
                    <Progress value={userProgress} className="h-2" />
                  </div>
                )}

                {/* CTA Button */}
                {isEnrolled ? (
                  <Button className="w-full h-12 mb-3" size="lg">
                    Продолжить обучение
                  </Button>
                ) : (
                  <Button 
                    className="w-full h-12 mb-3" 
                    size="lg"
                    onClick={handleEnroll}
                  >
                    Записаться на курс
                  </Button>
                )}

                {/* Actions */}
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" size="sm">
                    <Bookmark className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>

                {/* Course includes */}
                <div className="mt-6 pt-6 border-t space-y-3">
                  <h4 className="font-semibold mb-3">Этот курс включает:</h4>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{course.durationHours} часов видео</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <BookOpen className="w-4 h-4 text-muted-foreground" />
                    <span>{totalLessons} уроков</span>
                  </div>
                  {course.certificate && (
                    <div className="flex items-center gap-2 text-sm">
                      <Award className="w-4 h-4 text-muted-foreground" />
                      <span>Сертификат о прохождении</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm">
                    <Download className="w-4 h-4 text-muted-foreground" />
                    <span>Материалы для скачивания</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MessageSquare className="w-4 h-4 text-muted-foreground" />
                    <span>AI-ментор для вопросов</span>
                  </div>
                </div>
              </Card>

              {/* AI Mentor Card */}
              <Card className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">AI-ментор курса</h4>
                    <p className="text-sm text-muted-foreground">
                      Задавайте вопросы по материалам курса в любое время
                    </p>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Задать вопрос AI
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
