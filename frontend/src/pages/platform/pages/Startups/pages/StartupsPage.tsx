import {Skeleton, StartupPagination, StartupsList, StatCard} from "@/pages/platform/pages/Startups/components";
import {useStartups} from "@/pages/platform/hooks/use-startups.tsx";
import SearchFilters from "@/pages/platform/pages/Startups/components/startups/SearchFilters.tsx";
import {Loader} from "@/components";

function StartupsPage() {
    const {
        searchQuery,
        selectedCategory,
        selectedStage,
        loading,
        startups,
        totalPages,
        stats,
        page,
        setSearchQuery,
        setSelectedCategory,
        setSelectedStage,
        resetFilters,
        setCurrentPage
    } = useStartups();

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    return (
        <div className="min-h-screen bg-background">
            <main className="max-w-7xl mx-auto">
                {/* Title */}
                <div className="space-y-2 mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground">Startup Hub</h1>
                    <p className="text-lg text-muted-foreground">Explore new Startups and teams with AI-powered
                        tools</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-8">
                    {stats.map((stat) => (
                        <StatCard
                            key={stat.label}
                            label={stat.label}
                            value={stat.value}
                            icon={stat.icon}
                        />
                    ))}
                </div>

                <SearchFilters
                    searchQuery={searchQuery}
                    selectedCategory={selectedCategory}
                    selectedStage={selectedStage}
                    onSearchChange={(query) => setSearchQuery(query)}
                    onCategoryChange={(category) => setSelectedCategory(category)}
                    onStageChange={(stage) => setSelectedStage(stage)}
                    onResetFilters={() => resetFilters()}
                />

                {loading ? (
                    <Skeleton/>
                ) : startups.projects && startups.projects.length > 0 ? (
                    <>
                        <StartupsList startups={startups.projects}/>

                        {totalPages > 1 && (
                            <StartupPagination
                                currentPage={page}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        )}
                    </>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground text-lg">No startups found.</p>
                    </div>
                )}

            </main>
        </div>
    );
}

export default StartupsPage;