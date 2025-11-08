import { Course } from '@/types/course';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Clock, Users, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const categoryLabels: Record<Course['category'], string> = {
    programming: 'Программирование',
    design: 'Дизайн',
    business: 'Бизнес',
    'data-science': 'Data Science',
    marketing: 'Маркетинг',
    other: 'Другое'
  };

  const levelLabels: Record<Course['level'], string> = {
    beginner: 'Начальный',
    intermediate: 'Средний',
    advanced: 'Продвинутый'
  };

  return (
    <Link to={`/courses/${course.id}`}>
      <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden bg-muted">
          <img 
            src={course.thumbnail} 
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop';
            }}
          />
          {course.isFree && (
            <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
              Бесплатно
            </div>
          )}
        </div>

        <div className="p-5">
          {/* Category & Level */}
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="secondary" className="text-xs">
              {categoryLabels[course.category]}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {levelLabels[course.level]}
            </Badge>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {course.title}
          </h3>

          {/* Instructor */}
          <div className="flex items-center gap-2 mb-3">
            <img 
              src={course.instructor.avatar} 
              alt={course.instructor.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{course.instructor.name}</p>
              {course.company && (
                <p className="text-xs text-muted-foreground truncate">{course.company}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {course.shortDescription}
          </p>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{course.rating}</span>
                <span className="text-muted-foreground">({course.reviewsCount})</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{course.duration}</span>
              </div>
            </div>
          </div>

          {/* Students Count */}
          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-3 pt-3 border-t">
            <Users className="w-4 h-4" />
            <span>{course.studentsCount.toLocaleString()} студентов</span>
            {course.certificate && (
              <>
                <span className="mx-2">•</span>
                <Award className="w-4 h-4" />
                <span>Сертификат</span>
              </>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
