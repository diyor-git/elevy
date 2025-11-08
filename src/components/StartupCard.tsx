import { Link } from 'react-router-dom';
import { Startup } from '@/types/startup';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, TrendingUp, Rocket, Lightbulb, Target } from 'lucide-react';

interface StartupCardProps {
    startup: Startup;
}

const stageConfig = {
    idea: { label: 'Idea Stage', icon: Lightbulb, color: 'bg-yellow-100 text-yellow-700' },
    mvp: { label: 'MVP', icon: Rocket, color: 'bg-blue-100 text-blue-700' },
    'early-stage': { label: 'Early Stage', icon: Target, color: 'bg-purple-100 text-purple-700' },
    growth: { label: 'Growth', icon: TrendingUp, color: 'bg-green-100 text-green-700' },
    scaling: { label: 'Scaling', icon: Users, color: 'bg-orange-100 text-orange-700' },
};

const categoryLabels = {
    edtech: 'EdTech',
    fintech: 'FinTech',
    healthtech: 'HealthTech',
    'e-commerce': 'E-Commerce',
    saas: 'SaaS',
    'ai-ml': 'AI/ML',
    social: 'Social',
    marketplace: 'Marketplace',
};

export function StartupCard({ startup }: StartupCardProps) {
    const stageInfo = stageConfig[startup.stage];
    const StageIcon = stageInfo.icon;

    return (
        <Link to={`/startups/${startup.id}`}>
            <div className="group bg-card border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                {/* Cover Image */}
                <div className="relative h-40 overflow-hidden bg-muted">
                    <img
                        src={startup.coverImage}
                        alt={startup.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                    />
                    {startup.featured && (
                        <div className="absolute top-3 right-3">
                            <Badge className="bg-gradient-to-r from-primary to-secondary text-white border-0">
                                Featured
                            </Badge>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                    {/* Logo and Title */}
                    <div className="flex items-start gap-3 mb-3">
                        <img
                            src={startup.logo}
                            alt={`${startup.name} logo`}
                            className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-1">
                                {startup.name}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-1">
                                {startup.tagline}
                            </p>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
                        {startup.description}
                    </p>

                    {/* Stage and Category */}
                    <div className="flex items-center gap-2 mb-4">
                        <Badge className={stageInfo.color}>
                            <StageIcon className="w-3 h-3 mr-1" />
                            {stageInfo.label}
                        </Badge>
                        <Badge variant="outline">
                            {categoryLabels[startup.category]}
                        </Badge>
                    </div>

                    {/* Metrics */}
                    {/*<div className="grid grid-cols-2 gap-3 mb-4 pt-4 border-t">*/}
                    {/*    {startup.metrics.users && (*/}
                    {/*        <div className="text-center">*/}
                    {/*            <div className="text-lg font-semibold text-primary">*/}
                    {/*                {startup.metrics.users.toLocaleString()}*/}
                    {/*            </div>*/}
                    {/*            <div className="text-xs text-muted-foreground">Users</div>*/}
                    {/*        </div>*/}
                    {/*    )}*/}
                    {/*    {startup.metrics.funding && (*/}
                    {/*        <div className="text-center">*/}
                    {/*            <div className="text-lg font-semibold text-secondary">*/}
                    {/*                {startup.metrics.funding}*/}
                    {/*            </div>*/}
                    {/*            <div className="text-xs text-muted-foreground">Funding</div>*/}
                    {/*        </div>*/}
                    {/*    )}*/}
                    {/*    {!startup.metrics.users && !startup.metrics.funding && (*/}
                    {/*        <div className="col-span-2 text-center">*/}
                    {/*            <div className="text-lg font-semibold text-foreground">*/}
                    {/*                {startup.metrics.team_size} members*/}
                    {/*            </div>*/}
                    {/*            <div className="text-xs text-muted-foreground">Team</div>*/}
                    {/*        </div>*/}
                    {/*    )}*/}
                    {/*</div>*/}

                    {/* Team Preview */}
                    <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                            {startup.team.slice(0, 3).map((member) => (
                                <img
                                    key={member.id}
                                    src={member.avatar}
                                    alt={member.name}
                                    className="w-8 h-8 rounded-full border-2 border-background"
                                />
                            ))}
                        </div>
                        <span className="text-xs text-muted-foreground">
              {startup.team.length} team member{startup.team.length !== 1 ? 's' : ''}
            </span>
                    </div>

                    {/* CTA */}
                    <Button className="w-full mt-4" variant="secondary">
                        View Details
                    </Button>
                </div>
            </div>
        </Link>
    );
}
