import { useState } from "react";
import {useParams, Link, useNavigate} from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { internships } from "@/data/internships";
import {
  MapPin,
  Clock,
  DollarSign,
  Users,
  Calendar,
  Building2,
  Star,
  CheckCircle2,
  ArrowLeft,
  ExternalLink,
  Sparkles,
  ThumbsUp,
  Globe,
  Briefcase
} from "lucide-react";

export default function InternshipDetailPage() {
  const { id } = useParams();
  const internship = internships.find(i => i.id === id);
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  if (!internship) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Internship Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The internship you're looking for doesn't exist
          </p>
          <Button
              variant="ghost"
              onClick={() => navigate('/internships')}
              className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            К списку стажировок
          </Button>
        </div>
      </div>
    );
  }

  const avgRating = internship.reviews.length > 0
    ? internship.reviews.reduce((sum, r) => sum + r.rating, 0) / internship.reviews.length
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <div className="bg-white border-b border-border/50 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
          <Button
              variant="ghost"
              onClick={() => navigate('/internships')}
              className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            К списку стажировок
          </Button>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Company Logo */}
            <div className="shrink-0">
              <img
                src={internship.company.logo}
                alt={internship.company.name}
                className="w-24 h-24 md:w-32 md:h-32 rounded-xl object-cover border border-border/50 shadow-sm"
              />
            </div>

            {/* Header Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  {internship.featured && (
                    <Badge className="mb-2 bg-primary/10 text-primary hover:bg-primary/20">
                      Featured Position
                    </Badge>
                  )}
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                    {internship.title}
                  </h1>
                  <div className="flex items-center gap-2 text-lg text-muted-foreground mb-3">
                    <Building2 className="w-5 h-5" />
                    <span className="font-medium text-foreground">{internship.company.name}</span>
                    {avgRating > 0 && (
                      <>
                        <span className="mx-2">•</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium text-foreground">{avgRating.toFixed(1)}</span>
                          <span className="text-sm">({internship.reviews.length} reviews)</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Key Info Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-primary/70 shrink-0" />
                  <span className="text-muted-foreground truncate">{internship.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Briefcase className="w-4 h-4 text-primary/70 shrink-0" />
                  <span className="text-muted-foreground">{internship.format}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-primary/70 shrink-0" />
                  <span className="text-muted-foreground">{internship.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="w-4 h-4 text-primary/70 shrink-0" />
                  <span className="font-medium text-foreground">
                    {internship.pay === "Paid" ? internship.salary : internship.pay}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-white">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="requirements">Requirements</TabsTrigger>
                <TabsTrigger value="company">Company</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6 mt-6">
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">About This Internship</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {internship.description}
                  </p>

                  <h3 className="font-semibold text-foreground mb-3">Responsibilities</h3>
                  <ul className="space-y-3 mb-6">
                    {internship.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{resp}</span>
                      </li>
                    ))}
                  </ul>

                  <h3 className="font-semibold text-foreground mb-3">Skills You'll Learn</h3>
                  <div className="flex flex-wrap gap-2">
                    {internship.skills.map((skill, idx) => (
                      <Badge key={idx} variant="secondary" className="text-sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </Card>

                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Benefits & Perks</h2>
                  <div className="grid md:grid-cols-2 gap-3">
                    {internship.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                        <span className="text-sm text-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              {/* Requirements Tab */}
              <TabsContent value="requirements" className="space-y-6 mt-6">
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Required Qualifications</h2>
                  <ul className="space-y-3 mb-6">
                    {internship.requirements.required.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{req}</span>
                      </li>
                    ))}
                  </ul>

                  <h2 className="text-xl font-semibold text-foreground mb-4 mt-8">Preferred Qualifications</h2>
                  <ul className="space-y-3">
                    {internship.requirements.preferred.map((pref, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-muted-foreground/50 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{pref}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </TabsContent>

              {/* Company Tab */}
              <TabsContent value="company" className="space-y-6 mt-6">
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">About {internship.company.name}</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {internship.company.description}
                  </p>

                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Industry</div>
                      <div className="font-medium text-foreground">{internship.company.industry}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Company Size</div>
                      <div className="font-medium text-foreground">{internship.company.size}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Headquarters</div>
                      <div className="font-medium text-foreground">{internship.company.location}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Website</div>
                      <a
                        href={internship.company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-primary hover:underline flex items-center gap-1"
                      >
                        Visit Website
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  <h3 className="font-semibold text-foreground mb-3">Company Culture</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {internship.company.culture.map((trait, idx) => (
                      <Badge key={idx} variant="outline" className="text-sm">
                        {trait}
                      </Badge>
                    ))}
                  </div>

                  <h3 className="font-semibold text-foreground mb-3">Benefits Offered</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {internship.company.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              {/* Reviews Tab */}
              <TabsContent value="reviews" className="space-y-6 mt-6">
                {internship.reviews.length === 0 ? (
                  <Card className="p-12 text-center">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <Star className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">No Reviews Yet</h3>
                    <p className="text-muted-foreground">Be the first to review this internship</p>
                  </Card>
                ) : (
                  <>
                    <Card className="p-6">
                      <div className="flex items-center gap-6 mb-6">
                        <div className="text-center">
                          <div className="text-5xl font-bold text-foreground mb-1">{avgRating.toFixed(1)}</div>
                          <div className="flex items-center justify-center gap-1 mb-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.round(avgRating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-muted-foreground/30"
                                }`}
                              />
                            ))}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {internship.reviews.length} reviews
                          </div>
                        </div>
                        <div className="flex-1 space-y-2">
                          {[5, 4, 3, 2, 1].map((rating) => {
                            const count = internship.reviews.filter(r => r.rating === rating).length;
                            const percentage = (count / internship.reviews.length) * 100;
                            return (
                              <div key={rating} className="flex items-center gap-3">
                                <span className="text-sm text-muted-foreground w-12">{rating} star</span>
                                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-yellow-400 transition-all"
                                    style={{ width: `${percentage}%` }}
                                  />
                                </div>
                                <span className="text-sm text-muted-foreground w-8">{count}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </Card>

                    <div className="space-y-4">
                      {internship.reviews.map((review) => (
                        <Card key={review.id} className="p-6">
                          <div className="flex items-start gap-4 mb-4">
                            <img
                              src={review.avatar}
                              alt={review.author}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="font-semibold text-foreground">{review.author}</h4>
                                <span className="text-sm text-muted-foreground">{review.date}</span>
                              </div>
                              <div className="text-sm text-muted-foreground mb-2">{review.role}</div>
                              <div className="flex items-center gap-1 mb-3">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < review.rating
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-muted-foreground/30"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <p className="text-muted-foreground leading-relaxed mb-4">{review.text}</p>
                          <Button variant="ghost" size="sm" className="gap-2">
                            <ThumbsUp className="w-4 h-4" />
                            Helpful ({review.helpful})
                          </Button>
                        </Card>
                      ))}
                    </div>
                  </>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Apply Card */}
            <Card className="p-6 sticky top-24">
              <div className="space-y-4">
                <Button className="w-full h-12 text-base" size="lg">
                  Apply Now
                </Button>
                <Button variant="outline" className="w-full">
                  Save Internship
                </Button>

                <div className="pt-4 border-t border-border/50 space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Start Date</span>
                    <span className="font-medium text-foreground">{internship.startDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Deadline</span>
                    <span className="font-medium text-red-600">{internship.deadline}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Openings</span>
                    <span className="font-medium text-foreground">{internship.openings} positions</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Applicants</span>
                    <span className="font-medium text-foreground">{internship.applicants}</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* AI Resume Advisor Card */}
            <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">AI Resume Advisor</h3>
                  <p className="text-sm text-muted-foreground">
                    Get personalized tips to improve your resume for this position
                  </p>
                </div>
              </div>
              <Button variant="outline" className="w-full" size="sm">
                <Sparkles className="w-4 h-4 mr-2" />
                Optimize My Resume
              </Button>
            </Card>

            {/* Category Badge */}
            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-3">Category</h3>
              <Badge variant="secondary" className="text-sm">
                {internship.category}
              </Badge>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
