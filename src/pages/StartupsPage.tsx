import { useState, useMemo } from 'react';
import { startups } from '@/data/startups';
import { StartupCard } from '@/components/StartupCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Rocket, X } from 'lucide-react';
import { StartupCategory, StartupStage } from '@/types/startup';

const categories: { value: StartupCategory; label: string }[] = [
    { value: 'edtech', label: 'EdTech' },
    { value: 'fintech', label: 'FinTech' },
    { value: 'healthtech', label: 'HealthTech' },
    { value: 'e-commerce', label: 'E-Commerce' },
    { value: 'saas', label: 'SaaS' },
    { value: 'ai-ml', label: 'AI/ML' },
    { value: 'social', label: 'Social' },
    { value: 'marketplace', label: 'Marketplace' },
];

const stages: { value: StartupStage; label: string }[] = [
    { value: 'idea', label: 'Idea Stage' },
    { value: 'mvp', label: 'MVP' },
    { value: 'early-stage', label: 'Early Stage' },
    { value: 'growth', label: 'Growth' },
    { value: 'scaling', label: 'Scaling' },
];

export default function StartupsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<StartupCategory[]>([]);
    const [selectedStages, setSelectedStages] = useState<StartupStage[]>([]);
    const [showFilters, setShowFilters] = useState(false);

    const filteredStartups = useMemo(() => {
        return startups.filter((startup) => {
            // Search filter
            const matchesSearch =
                searchQuery === '' ||
                startup.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                startup.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                startup.description.toLowerCase().includes(searchQuery.toLowerCase());

            // Category filter
            const matchesCategory =
                selectedCategories.length === 0 ||
                selectedCategories.includes(startup.category);

            // Stage filter
            const matchesStage =
                selectedStages.length === 0 || selectedStages.includes(startup.stage);

            return matchesSearch && matchesCategory && matchesStage;
        });
    }, [searchQuery, selectedCategories, selectedStages]);

    const toggleCategory = (category: StartupCategory) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category]
        );
    };

    const toggleStage = (stage: StartupStage) => {
        setSelectedStages((prev) =>
            prev.includes(stage) ? prev.filter((s) => s !== stage) : [...prev, stage]
        );
    };

    const clearFilters = () => {
        setSelectedCategories([]);
        setSelectedStages([]);
        setSearchQuery('');
    };

    const activeFiltersCount =
        selectedCategories.length + selectedStages.length;

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative pt-28 pb-20 bg-gradient-to-br from-primary/10 via-secondary/10 to-background">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                            <Rocket className="w-4 h-4" />
                            Startup Hub
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Discover & Join{' '}
                            <span className="gradient-text">Student Startups</span>
                        </h1>
                        <p className="text-lg text-muted-foreground mb-8">
                            Connect with ambitious founders, find co-founders, join exciting
                            projects, and build the future together.
                        </p>

                        {/* Search Bar */}
                        <div className="relative max-w-2xl mx-auto">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder="Search startups by name, description, or technology..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-12 pr-4 h-14 text-lg"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar - Desktop */}
                    <aside className="hidden lg:block w-64 flex-shrink-0">
                        <div className="sticky bg-white rounded-xl border border-border/50 p-6 shadow-sm top-24 space-y-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold text-lg">Filters</h3>
                                {activeFiltersCount > 0 && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={clearFilters}
                                        className="text-xs"
                                    >
                                        Clear all
                                    </Button>
                                )}
                            </div>

                            {/* Category Filter */}
                            <div>
                                <h4 className="font-medium mb-3 text-sm">Category</h4>
                                <div className="space-y-2 border-b-2">
                                    {categories.map((category) => (
                                        <button
                                            key={category.value}
                                            onClick={() => toggleCategory(category.value)}
                                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                                                selectedCategories.includes(category.value)
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'hover:bg-muted'
                                            }`}
                                        >
                                            {category.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Stage Filter */}
                            <div>
                                <h4 className="font-medium mb-3 text-sm">Stage</h4>
                                <div className="space-y-2">
                                    {stages.map((stage) => (
                                        <button
                                            key={stage.value}
                                            onClick={() => toggleStage(stage.value)}
                                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                                                selectedStages.includes(stage.value)
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'hover:bg-muted'
                                            }`}
                                        >
                                            {stage.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Mobile Filter Toggle */}
                        <div className="lg:hidden mb-6 flex items-center gap-3">
                            <Button
                                variant="outline"
                                onClick={() => setShowFilters(!showFilters)}
                                className="flex-1"
                            >
                                <Filter className="w-4 h-4 mr-2" />
                                Filters
                                {activeFiltersCount > 0 && (
                                    <Badge className="ml-2" variant="secondary">
                                        {activeFiltersCount}
                                    </Badge>
                                )}
                            </Button>
                            {activeFiltersCount > 0 && (
                                <Button variant="outline" size="icon" onClick={clearFilters}>
                                    <X className="w-4 h-4" />
                                </Button>
                            )}
                        </div>

                        {/* Mobile Filters */}
                        {showFilters && (
                            <div className="lg:hidden mb-6 p-4 border rounded-lg bg-card space-y-6">
                                {/* Category Filter */}
                                <div>
                                    <h4 className="font-medium mb-3 text-sm">Category</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {categories.map((category) => (
                                            <Badge
                                                key={category.value}
                                                variant={
                                                    selectedCategories.includes(category.value)
                                                        ? 'default'
                                                        : 'outline'
                                                }
                                                className="cursor-pointer"
                                                onClick={() => toggleCategory(category.value)}
                                            >
                                                {category.label}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                {/* Stage Filter */}
                                <div>
                                    <h4 className="font-medium mb-3 text-sm">Stage</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {stages.map((stage) => (
                                            <Badge
                                                key={stage.value}
                                                variant={
                                                    selectedStages.includes(stage.value)
                                                        ? 'default'
                                                        : 'outline'
                                                }
                                                className="cursor-pointer"
                                                onClick={() => toggleStage(stage.value)}
                                            >
                                                {stage.label}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Active Filters Display */}
                        {activeFiltersCount > 0 && (
                            <div className="mb-6 flex items-center gap-2 flex-wrap">
                <span className="text-sm text-muted-foreground">
                  Active filters:
                </span>
                                {selectedCategories.map((cat) => (
                                    <Badge
                                        key={cat}
                                        variant="secondary"
                                        className="cursor-pointer"
                                        onClick={() => toggleCategory(cat)}
                                    >
                                        {categories.find((c) => c.value === cat)?.label}
                                        <X className="w-3 h-3 ml-1" />
                                    </Badge>
                                ))}
                                {selectedStages.map((stage) => (
                                    <Badge
                                        key={stage}
                                        variant="secondary"
                                        className="cursor-pointer"
                                        onClick={() => toggleStage(stage)}
                                    >
                                        {stages.find((s) => s.value === stage)?.label}
                                        <X className="w-3 h-3 ml-1" />
                                    </Badge>
                                ))}
                            </div>
                        )}

                        {/* Results Count */}
                        <div className="mb-6">
                            <p className="text-sm text-muted-foreground">
                                Showing {filteredStartups.length} of {startups.length} startups
                            </p>
                        </div>

                        {/* Startups Grid */}
                        {filteredStartups.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredStartups.map((startup) => (
                                    <StartupCard key={startup.id} startup={startup} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <Rocket className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                                <h3 className="text-xl font-semibold mb-2">
                                    No startups found
                                </h3>
                                <p className="text-muted-foreground mb-6">
                                    Try adjusting your filters or search query
                                </p>
                                <Button onClick={clearFilters}>Clear Filters</Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
