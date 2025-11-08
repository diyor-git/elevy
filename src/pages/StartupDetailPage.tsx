import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { startups } from '@/data/startups';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
    ArrowLeft,
    ExternalLink,
    Users,
    TrendingUp,
    Calendar,
    Globe,
    Linkedin,
    Twitter,
    Github,
    Heart,
    MessageCircle,
    Send,
    CheckCircle2,
    Lightbulb,
    Rocket,
    Target,
} from 'lucide-react';

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

export default function StartupDetailPage() {
    const { id } = useParams();
    const { toast } = useToast();
    const [newComment, setNewComment] = useState('');
    const [hasApplied, setHasApplied] = useState(false);
    const [selectedRole, setSelectedRole] = useState<string | null>(null);

    const startup = startups.find((s) => s.id === id);

    if (!startup) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Startup not found</h2>
                    <p className="text-muted-foreground mb-6">
                        The startup you're looking for doesn't exist.
                    </p>
                    <Link to="/startups">
                        <Button>
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Startups
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    const stageInfo = stageConfig[startup.stage];
    const StageIcon = stageInfo.icon;

    const handleJoin = (role: string) => {
        setSelectedRole(role);
        setHasApplied(true);
        toast({
            title: 'Application Submitted!',
            description: `Your interest in the ${role} position has been sent to the team.`,
        });
    };

    const handleSupport = () => {
        toast({
            title: 'Thank you for your support!',
            description: 'The team has been notified of your interest.',
        });
    };

    const handlePostComment = () => {
        if (newComment.trim()) {
            toast({
                title: 'Comment posted!',
                description: 'Your comment has been added to the discussion.',
            });
            setNewComment('');
        }
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Cover Image */}
            <div className="relative h-64 md:h-80 bg-muted">
                <img
                    src={startup.coverImage}
                    alt={startup.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />

                {/* Back Button */}
                <div className="absolute top-6 left-6">
                    <Link to="/startups">
                        <Button variant="secondary" size="sm">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-16 relative z-10 pb-16">
                <div className="max-w-6xl mx-auto">
                    {/* Header Card */}
                    <div className="bg-card border rounded-xl p-6 mb-8 shadow-lg">
                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Logo */}
                            <img
                                src={startup.logo}
                                alt={`${startup.name} logo`}
                                className="w-24 h-24 rounded-xl object-cover flex-shrink-0"
                            />

                            {/* Info */}
                            <div className="flex-1">
                                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                                    <div>
                                        <h1 className="text-3xl font-bold mb-2">{startup.name}</h1>
                                        <p className="text-lg text-muted-foreground">
                                            {startup.tagline}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        {startup.website && (
                                            <Button size="sm" variant="outline" asChild>
                                                <a
                                                    href={startup.website}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <Globe className="w-4 h-4 mr-2" />
                                                    Website
                                                </a>
                                            </Button>
                                        )}
                                        <Button size="sm" onClick={handleSupport}>
                                            <Heart className="w-4 h-4 mr-2" />
                                            Support
                                        </Button>
                                    </div>
                                </div>

                                {/* Badges */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <Badge className={stageInfo.color}>
                                        <StageIcon className="w-3 h-3 mr-1" />
                                        {stageInfo.label}
                                    </Badge>
                                    <Badge variant="outline">
                                        {categoryLabels[startup.category]}
                                    </Badge>
                                    <Badge variant="outline">
                                        <Calendar className="w-3 h-3 mr-1" />
                                        Founded {startup.founded}
                                    </Badge>
                                </div>

                                {/* Social Links */}
                                <div className="flex gap-2">
                                    {startup.social.twitter && (
                                        <Button size="icon" variant="ghost" asChild>
                                            <a
                                                href={startup.social.twitter}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Twitter className="w-4 h-4" />
                                            </a>
                                        </Button>
                                    )}
                                    {startup.social.linkedin && (
                                        <Button size="icon" variant="ghost" asChild>
                                            <a
                                                href={startup.social.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Linkedin className="w-4 h-4" />
                                            </a>
                                        </Button>
                                    )}
                                    {startup.social.github && (
                                        <Button size="icon" variant="ghost" asChild>
                                            <a
                                                href={startup.social.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Github className="w-4 h-4" />
                                            </a>
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Metrics */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t">
                            {startup.metrics.users && (
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-primary">
                                        {startup.metrics.users.toLocaleString()}
                                    </div>
                                    <div className="text-sm text-muted-foreground">Users</div>
                                </div>
                            )}
                            {startup.metrics.revenue && (
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-secondary">
                                        {startup.metrics.revenue}
                                    </div>
                                    <div className="text-sm text-muted-foreground">Revenue</div>
                                </div>
                            )}
                            {startup.metrics.funding && (
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-600">
                                        {startup.metrics.funding}
                                    </div>
                                    <div className="text-sm text-muted-foreground">Funding</div>
                                </div>
                            )}
                            <div className="text-center">
                                <div className="text-2xl font-bold text-foreground">
                                    {startup.metrics.team_size}
                                </div>
                                <div className="text-sm text-muted-foreground">Team Members</div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* About */}
                            <section className="bg-card border rounded-xl p-6">
                                <h2 className="text-2xl font-bold mb-4">About</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    {startup.description}
                                </p>
                            </section>

                            {/* Tech Stack */}
                            <section className="bg-card border rounded-xl p-6">
                                <h2 className="text-2xl font-bold mb-4">Tech Stack</h2>
                                <div className="flex flex-wrap gap-2">
                                    {startup.technologies.map((tech) => (
                                        <Badge key={tech} variant="secondary">
                                            {tech}
                                        </Badge>
                                    ))}
                                </div>
                            </section>

                            {/* Team Profiles */}
                            <section className="bg-card border rounded-xl p-6">
                                <h2 className="text-2xl font-bold mb-6">Meet the Team</h2>
                                <div className="space-y-6">
                                    {startup.team.map((member) => (
                                        <div
                                            key={member.id}
                                            className="flex gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors"
                                        >
                                            <img
                                                src={member.avatar}
                                                alt={member.name}
                                                className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-2 mb-2">
                                                    <div>
                                                        <h3 className="font-semibold text-lg">
                                                            {member.name}
                                                        </h3>
                                                        <Badge variant="outline" className="capitalize">
                                                            {member.role.replace('-', ' ')}
                                                        </Badge>
                                                    </div>
                                                    <div className="flex gap-1">
                                                        {member.linkedin && (
                                                            <Button size="icon" variant="ghost" asChild>
                                                                <a
                                                                    href={member.linkedin}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                >
                                                                    <Linkedin className="w-4 h-4" />
                                                                </a>
                                                            </Button>
                                                        )}
                                                        {member.twitter && (
                                                            <Button size="icon" variant="ghost" asChild>
                                                                <a
                                                                    href={member.twitter}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                >
                                                                    <Twitter className="w-4 h-4" />
                                                                </a>
                                                            </Button>
                                                        )}
                                                        {member.github && (
                                                            <Button size="icon" variant="ghost" asChild>
                                                                <a
                                                                    href={member.github}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                >
                                                                    <Github className="w-4 h-4" />
                                                                </a>
                                                            </Button>
                                                        )}
                                                    </div>
                                                </div>
                                                <p className="text-sm text-muted-foreground">
                                                    {member.bio}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Discussion Section */}
                            <section className="bg-card border rounded-xl p-6">
                                <h2 className="text-2xl font-bold mb-6">Discussion</h2>

                                {/* Post Comment */}
                                <div className="mb-6 p-4 bg-muted/30 rounded-lg">
                                    <Textarea
                                        placeholder="Ask a question or share your thoughts..."
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        className="mb-3"
                                        rows={3}
                                    />
                                    <Button onClick={handlePostComment} disabled={!newComment.trim()}>
                                        <Send className="w-4 h-4 mr-2" />
                                        Post Comment
                                    </Button>
                                </div>

                                {/* Comments */}
                                {startup.discussions.length > 0 ? (
                                    <div className="space-y-4">
                                        {startup.discussions.map((discussion) => (
                                            <div
                                                key={discussion.id}
                                                className="p-4 border rounded-lg hover:bg-muted/30 transition-colors"
                                            >
                                                <div className="flex gap-3">
                                                    <img
                                                        src={discussion.avatar}
                                                        alt={discussion.author}
                                                        className="w-10 h-10 rounded-full object-cover"
                                                    />
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-2">
                              <span className="font-semibold">
                                {discussion.author}
                              </span>
                                                            <span className="text-xs text-muted-foreground">
                                {discussion.timestamp}
                              </span>
                                                        </div>
                                                        <p className="text-sm mb-3">{discussion.content}</p>
                                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                            <button className="flex items-center gap-1 hover:text-primary transition-colors">
                                                                <Heart className="w-4 h-4" />
                                                                {discussion.likes}
                                                            </button>
                                                            <button className="flex items-center gap-1 hover:text-primary transition-colors">
                                                                <MessageCircle className="w-4 h-4" />
                                                                {discussion.replies}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-muted-foreground">
                                        <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                        <p>No discussions yet. Be the first to comment!</p>
                                    </div>
                                )}
                            </section>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Looking For */}
                            <div className="bg-card border rounded-xl p-6 sticky top-24">
                                <h3 className="text-xl font-bold mb-4">We're Looking For</h3>
                                <div className="space-y-3">
                                    {startup.lookingFor.map((role) => (
                                        <div
                                            key={role}
                                            className="p-4 border rounded-lg hover:border-primary transition-colors"
                                        >
                                            <div className="flex items-center justify-between gap-3 mb-3">
                                                <span className="font-medium">{role}</span>
                                                {hasApplied && selectedRole === role ? (
                                                    <Badge className="bg-green-100 text-green-700">
                                                        <CheckCircle2 className="w-3 h-3 mr-1" />
                                                        Applied
                                                    </Badge>
                                                ) : null}
                                            </div>
                                            <Button
                                                size="sm"
                                                className="w-full"
                                                onClick={() => handleJoin(role)}
                                                disabled={hasApplied && selectedRole === role}
                                            >
                                                {hasApplied && selectedRole === role
                                                    ? 'Application Sent'
                                                    : 'Express Interest'}
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
