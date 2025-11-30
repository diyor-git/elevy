import {Badge} from '@/components/ui/badge.tsx';
import {Lightbulb, Rocket, Target, TrendingUp, Users} from 'lucide-react';
import type {Startup} from '@/types/startup.ts';
import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";

interface StartupsListProps {
    startups: Startup[];
}

const stageConfig = {
    'idea': {label: 'Idea Stage', icon: Lightbulb, color: 'bg-yellow-100 text-yellow-700'},
    'mvp': {label: 'MVP', icon: Rocket, color: 'bg-blue-100 text-blue-700'},
    'early-stage': {label: 'Early Stage', icon: Target, color: 'bg-purple-100 text-purple-700'},
    'growth': {label: 'Growth', icon: TrendingUp, color: 'bg-green-100 text-green-700'},
    'scaling': {label: 'Scaling', icon: Users, color: 'bg-orange-100 text-orange-700'},
};

function StartupsList({startups}: StartupsListProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {startups.map(startup => {
                const stageInfo = stageConfig[startup.stage];
                const StageIcon = stageInfo.icon;

                return (
                    <div key={startup.id}
                         className="group bg-card border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                        <div className="relative h-40 overflow-hidden bg-muted">
                            <img
                                src={startup.image}
                                alt={startup.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                loading="lazy"
                            />
                        </div>

                        <div className="p-5 flex flex-col flex-1">
                            <div className="flex items-start gap-3 mb-3">
                                <img
                                    src={startup.image || "https://innovation.gov.uz/media/post_images/0fbdc5e8af37709994fa4652b7c3ac37.jpg"}
                                    alt={`${startup.name} logo`}
                                    className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                                />
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-1">
                                        {startup.name}
                                    </h3>
                                    <p className="text-sm text-muted-foreground line-clamp-1">
                                        {stageInfo.label}
                                    </p>
                                </div>
                            </div>

                            <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
                                {startup.description}
                            </p>

                            <div className="flex items-center gap-2 mb-4">
                                <Badge className={stageInfo.color}>
                                    <StageIcon className="w-3 h-3 mr-1"/>
                                    {stageInfo.label}
                                </Badge>
                                <Badge variant="outline" className="capitalize">
                                    {startup.category}
                                </Badge>
                            </div>

                            <span className="text-xs text-muted-foreground mb-4">{startup.teamSize} team members</span>

                            <Button asChild className="w-full" variant="default">
                                <Link to={`${startup.id}`}>View Details</Link>
                            </Button>
                        </div>
                    </div>
                )
            })}
        </div>

    );
}

export default StartupsList;
