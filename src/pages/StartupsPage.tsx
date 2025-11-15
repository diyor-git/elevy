import { useMemo, useState } from 'react';
import { startups } from '@/data/startups';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building2, Search, SlidersHorizontal, X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {StartupCard} from '@/components/StartupCard.tsx';
import {NDAModal} from "@/components/NDAModal.tsx"; // You’ll need a card similar to CourseCard

export default function StartupsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [selectedStage, setSelectedStage] = useState<string>('all');
    const [showFilters, setShowFilters] = useState(false);

    // Get unique categories
    const categories = useMemo(() => {
        const unique = new Set(startups.map(s => s.category));
        return Array.from(unique);
    }, []);

    // Get unique stages
    const stages = useMemo(() => {
        const unique = new Set(startups.map(s => s.stage));
        return Array.from(unique);
    }, []);

    // Filter startups
    const filteredStartups = useMemo(() => {
        return startups.filter(startup => {
            const matchesSearch =
                searchQuery === '' ||
                startup.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                startup.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                startup.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                startup.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));

            const matchesCategory = selectedCategory === 'all' || startup.category === selectedCategory;
            const matchesStage = selectedStage === 'all' || startup.stage === selectedStage;

            return matchesSearch && matchesCategory && matchesStage;
        });
    }, [searchQuery, selectedCategory, selectedStage]);

    // Active filters count
    const activeFiltersCount = [selectedCategory !== 'all', selectedStage !== 'all'].filter(Boolean).length;

    const resetFilters = () => {
        setSelectedCategory('all');
        setSelectedStage('all');
        setSearchQuery('');
    };

    const categoryLabels: Record<string, string> = {
        all: 'Все категории',
        edtech: 'EdTech',
        fintech: 'FinTech',
        'healthtech': 'HealthTech',
        'e-commerce': 'E-Commerce',
        'saas': 'SaaS',
        'ai-ml': 'AI / ML',
    };

    const stageLabels: Record<string, string> = {
        all: 'Все стадии',
        idea: 'Идея',
        mvp: 'MVP',
        'early-stage': 'Ранняя стадия',
        growth: 'Рост',
    };

    return (
        <div className="min-h-screen pt-24 pb-20 bg-gradient-to-b from-background to-muted/20">
            <NDAModal open={false} onOpenChange={() => {}} onSign={() => {}} startupName={"startup"}/>
            <div className="container-custom">
                {/* Header */}
                <div className="mb-12 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                        <Building2 className="w-4 h-4" />
                        Startup Hub
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        Discover Innovative <span className="gradient-text">Startups</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Explore the most promising startups in AI, FinTech, HealthTech, and beyond.
                    </p>
                </div>

                {/* Search & Filters */}
                <div className="mb-8">
                    <div className="bg-card border rounded-xl p-4 shadow-sm">
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Search */}
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <Input
                                    type="text"
                                    placeholder="Поиск стартапов по названию, технологии, описанию..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 h-12"
                                />
                            </div>

                            {/* Filters toggle (mobile) */}
                            <Button
                                variant="outline"
                                onClick={() => setShowFilters(!showFilters)}
                                className="md:hidden h-12"
                            >
                                <SlidersHorizontal className="w-4 h-4 mr-2" />
                                Фильтры
                                {activeFiltersCount > 0 && <Badge className="ml-2">{activeFiltersCount}</Badge>}
                            </Button>

                            {/* Filters desktop */}
                            <div className="hidden md:flex gap-3">
                                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                    <SelectTrigger className="w-[180px] h-12">
                                        <SelectValue placeholder="Категория" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(categoryLabels).map(([value, label]) => (
                                            <SelectItem key={value} value={value}>
                                                {label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Select value={selectedStage} onValueChange={setSelectedStage}>
                                    <SelectTrigger className="w-[150px] h-12">
                                        <SelectValue placeholder="Стадия" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(stageLabels).map(([value, label]) => (
                                            <SelectItem key={value} value={value}>
                                                {label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                {activeFiltersCount > 0 && (
                                    <Button variant="ghost" size="icon" onClick={resetFilters} className="h-12 w-12">
                                        <X className="w-4 h-4" />
                                    </Button>
                                )}
                            </div>
                        </div>

                        {/* Mobile filters */}
                        {showFilters && (
                            <div className="md:hidden mt-4 pt-4 border-t space-y-3">
                                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                    <SelectTrigger className="h-12">
                                        <SelectValue placeholder="Категория" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(categoryLabels).map(([value, label]) => (
                                            <SelectItem key={value} value={value}>
                                                {label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Select value={selectedStage} onValueChange={setSelectedStage}>
                                    <SelectTrigger className="h-12">
                                        <SelectValue placeholder="Стадия" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(stageLabels).map(([value, label]) => (
                                            <SelectItem key={value} value={value}>
                                                {label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                {activeFiltersCount > 0 && (
                                    <Button variant="outline" onClick={resetFilters} className="w-full">
                                        <X className="w-4 h-4 mr-2" />
                                        Сбросить фильтры
                                    </Button>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Active filters summary */}
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
                            {selectedStage !== 'all' && (
                                <Badge variant="secondary" className="gap-1">
                                    {stageLabels[selectedStage]}
                                    <X
                                        className="w-3 h-3 cursor-pointer"
                                        onClick={() => setSelectedStage('all')}
                                    />
                                </Badge>
                            )}
                        </div>
                    )}
                </div>

                {/* Results count */}
                <div className="mb-6">
                    <p className="text-muted-foreground">
                        Найдено стартапов:{' '}
                        <span className="font-semibold text-foreground">{filteredStartups.length}</span>
                    </p>
                </div>

                {/* Startups grid */}
                {filteredStartups.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredStartups.map((startup) => (
                            <StartupCard key={startup.id} startup={startup} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-6">
                            <Search className="w-10 h-10 text-muted-foreground" />
                        </div>
                        <h3 className="text-2xl font-semibold mb-2">Стартапы не найдены</h3>
                        <p className="text-muted-foreground mb-6">
                            Попробуйте изменить параметры поиска или фильтры
                        </p>
                        <Button onClick={resetFilters}>Сбросить все фильтры</Button>
                    </div>
                )}
            </div>
        </div>
    );
}
