import { useState, useMemo } from 'react';
import { coursesData } from '@/data/courses';
import CourseCard from '@/components/CourseCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  SlidersHorizontal, 
  GraduationCap,
  X
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedCompany, setSelectedCompany] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  // Get unique companies
  const companies = useMemo(() => {
    const uniqueCompanies = new Set(
      coursesData
        .filter(course => course.company)
        .map(course => course.company!)
    );
    return Array.from(uniqueCompanies);
  }, []);

  // Filter courses
  const filteredCourses = useMemo(() => {
    return coursesData.filter(course => {
      const matchesSearch = searchQuery === '' || 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
      const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
      const matchesCompany = selectedCompany === 'all' || course.company === selectedCompany;

      return matchesSearch && matchesCategory && matchesLevel && matchesCompany;
    });
  }, [searchQuery, selectedCategory, selectedLevel, selectedCompany]);

  // Count active filters
  const activeFiltersCount = [
    selectedCategory !== 'all',
    selectedLevel !== 'all',
    selectedCompany !== 'all'
  ].filter(Boolean).length;

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedLevel('all');
    setSelectedCompany('all');
    setSearchQuery('');
  };

  const categoryLabels: Record<string, string> = {
    all: 'Все категории',
    programming: 'Программирование',
    design: 'Дизайн',
    business: 'Бизнес',
    'data-science': 'Data Science',
    marketing: 'Маркетинг',
    other: 'Другое'
  };

  const levelLabels: Record<string, string> = {
    all: 'Все уровни',
    beginner: 'Начальный',
    intermediate: 'Средний',
    advanced: 'Продвинутый'
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
            <GraduationCap className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Онлайн-курсы от лучших компаний
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Учитесь у экспертов из Яндекс, VK, Сбер и других топовых компаний
          </p>
        </div>

        {/* Search & Filters Bar */}
        <div className="mb-8">
          <div className="bg-card border rounded-xl p-4 shadow-sm">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Поиск курсов по названию, навыкам..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>

              {/* Filters Toggle Button (Mobile) */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden h-12"
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Фильтры
                {activeFiltersCount > 0 && (
                  <Badge className="ml-2">{activeFiltersCount}</Badge>
                )}
              </Button>

              {/* Filters (Desktop) */}
              <div className="hidden md:flex gap-3">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px] h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(categoryLabels).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger className="w-[150px] h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(levelLabels).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                  <SelectTrigger className="w-[150px] h-12">
                    <SelectValue placeholder="Компания" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все компании</SelectItem>
                    {companies.map((company) => (
                      <SelectItem key={company} value={company}>
                        {company}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {activeFiltersCount > 0 && (
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={resetFilters}
                    className="h-12 w-12"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="md:hidden mt-4 pt-4 border-t space-y-3">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(categoryLabels).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger className="h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(levelLabels).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Компания" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все компании</SelectItem>
                    {companies.map((company) => (
                      <SelectItem key={company} value={company}>
                        {company}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {activeFiltersCount > 0 && (
                  <Button 
                    variant="outline" 
                    onClick={resetFilters}
                    className="w-full"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Сбросить фильтры
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Active Filters Summary */}
          {activeFiltersCount > 0 && (
            <div className="flex items-center gap-2 mt-4 flex-wrap">
              <span className="text-sm text-muted-foreground">Активные фильтры:</span>
              {selectedCategory !== 'all' && (
                <Badge variant="secondary" className="gap-1">
                  {categoryLabels[selectedCategory]}
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => setSelectedCategory('all')}
                  />
                </Badge>
              )}
              {selectedLevel !== 'all' && (
                <Badge variant="secondary" className="gap-1">
                  {levelLabels[selectedLevel]}
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => setSelectedLevel('all')}
                  />
                </Badge>
              )}
              {selectedCompany !== 'all' && (
                <Badge variant="secondary" className="gap-1">
                  {selectedCompany}
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => setSelectedCompany('all')}
                  />
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Найдено курсов: <span className="font-semibold text-foreground">{filteredCourses.length}</span>
          </p>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-6">
              <Search className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">Курсы не найдены</h3>
            <p className="text-muted-foreground mb-6">
              Попробуйте изменить параметры поиска или фильтры
            </p>
            <Button onClick={resetFilters}>
              Сбросить все фильтры
            </Button>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-20 text-center bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/10 rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">
            Не нашли подходящий курс?
          </h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Расскажите нам, чему вы хотите научиться, и мы поможем подобрать идеальный курс
          </p>
          <Button size="lg" className="h-12">
            Связаться с нами
          </Button>
        </div>
      </div>
    </div>
  );
}
