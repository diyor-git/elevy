import { useState, useMemo } from "react";
import { InternshipCard } from "@/components/InternshipCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { internships } from "@/data/internships";
import { InternshipCategory, InternshipFormat, InternshipPay } from "@/types/internship";
import {Search, Filter, MapPin, Briefcase, DollarSign, X, GraduationCap, Rocket} from "lucide-react";

const categories: InternshipCategory[] = [
  "Software Development",
  "Data Science",
  "Design",
  "Marketing",
  "Business",
  "Product Management"
];

const formats: InternshipFormat[] = ["Remote", "Hybrid", "On-site"];
const payTypes: InternshipPay[] = ["Paid", "Unpaid", "Stipend"];

export default function InternshipsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<InternshipCategory | "All">("All");
  const [selectedFormat, setSelectedFormat] = useState<InternshipFormat | "All">("All");
  const [selectedPay, setSelectedPay] = useState<InternshipPay | "All">("All");
  const [locationFilter, setLocationFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredInternships = useMemo(() => {
    return internships.filter(internship => {
      const matchesSearch =
        internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        internship.company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        internship.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === "All" || internship.category === selectedCategory;
      const matchesFormat = selectedFormat === "All" || internship.format === selectedFormat;
      const matchesPay = selectedPay === "All" || internship.pay === selectedPay;
      const matchesLocation = !locationFilter ||
        internship.location.toLowerCase().includes(locationFilter.toLowerCase());

      return matchesSearch && matchesCategory && matchesFormat && matchesPay && matchesLocation;
    });
  }, [searchQuery, selectedCategory, selectedFormat, selectedPay, locationFilter]);

  const activeFiltersCount = [
    selectedCategory !== "All",
    selectedFormat !== "All",
    selectedPay !== "All",
    locationFilter !== ""
  ].filter(Boolean).length;

  const clearFilters = () => {
    setSelectedCategory("All");
    setSelectedFormat("All");
    setSelectedPay("All");
    setLocationFilter("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="relative pt-28 pb-20 bg-gradient-to-br from-primary/10 via-secondary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Briefcase className="w-4 h-4" />
              Internship Hub
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Найдите идеальную{' '}
              <span className="gradient-text">стажировку</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Начните свою карьеру с возможностями от компаний мирового уровня.
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-80 shrink-0">
            <div className="sticky top-24">
              <div className="bg-white rounded-xl border border-border/50 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-semibold text-lg flex items-center gap-2">
                    <Filter className="w-5 h-5 text-primary" />
                    Filters
                    {activeFiltersCount > 0 && (
                      <Badge variant="secondary" className="ml-2">
                        {activeFiltersCount}
                      </Badge>
                    )}
                  </h2>
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
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Briefcase className="w-4 h-4 text-primary/70" />
                    <h3 className="font-medium text-sm">Category</h3>
                  </div>
                  <div className="space-y-2 border-b-2">
                    <button
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                            selectedCategory === "All"
                                ? 'bg-primary text-primary-foreground'
                                : 'hover:bg-muted'
                        }`}
                        onClick={() => setSelectedCategory("All")}
                    >
                      All Categories
                    </button>
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                                selectedCategory.includes(category)
                                    ? 'bg-primary text-primary-foreground'
                                    : 'hover:bg-muted'
                            }`}
                        >
                          {category}
                        </button>
                    ))}
                  </div>
                </div>

                {/* Format Filter */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Briefcase className="w-4 h-4 text-primary/70" />
                    <h3 className="font-medium text-sm">Format</h3>
                  </div>
                  <div className="space-y-2 border-b-2">
                    <button
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                            selectedFormat === "All"
                                ? 'bg-primary text-primary-foreground'
                                : 'hover:bg-muted'
                        }`}
                        onClick={() => setSelectedFormat("All")}
                    >
                      All Categories
                    </button>
                    {formats.map((format) => (
                        <button
                            key={format}
                            onClick={() => setSelectedFormat(format)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                                selectedFormat.includes(format)
                                    ? 'bg-primary text-primary-foreground'
                                    : 'hover:bg-muted'
                            }`}
                        >
                          {format}
                        </button>
                    ))}
                  </div>
                </div>

                {/* Pay Type Filter */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Briefcase className="w-4 h-4 text-primary/70" />
                    <h3 className="font-medium text-sm">Compensation</h3>
                  </div>
                  <div className="space-y-2 border-b-2">
                    <button
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                            selectedPay === "All"
                                ? 'bg-primary text-primary-foreground'
                                : 'hover:bg-muted'
                        }`}
                        onClick={() => setSelectedPay("All")}
                    >
                      All Categories
                    </button>
                    {payTypes.map((pay) => (
                        <button
                            key={pay}
                            onClick={() => setSelectedPay(pay)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                                selectedPay.includes(pay)
                                    ? 'bg-primary text-primary-foreground'
                                    : 'hover:bg-muted'
                            }`}
                        >
                          {pay}
                        </button>
                    ))}
                  </div>
                </div>

                {/* Location Filter */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-primary/70" />
                    <h3 className="font-medium text-sm">Location</h3>
                  </div>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="City, State, or Country"
                      value={locationFilter}
                      onChange={(e) => setLocationFilter(e.target.value)}
                      className="pr-8"
                    />
                    {locationFilter && (
                      <button
                        onClick={() => setLocationFilter("")}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Internships List */}
          <main className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  {filteredInternships.length} Opportunities
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {searchQuery && `Showing results for "${searchQuery}"`}
                </p>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="lg:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </div>

            {filteredInternships.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No internships found
                </h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Try adjusting your filters or search query to find more opportunities
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Clear all filters
                </Button>
              </div>
            ) : (
              <div className="grid gap-6">
                {filteredInternships.map((internship) => (
                  <InternshipCard key={internship.id} internship={internship} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
