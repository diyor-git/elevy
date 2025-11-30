import {Button} from '@/components/ui/button.tsx';
import {Card, CardContent} from '@/components/ui/card.tsx';
import {Badge} from '@/components/ui/badge.tsx';
import {Link} from 'react-router-dom';
import {
    ArrowRight,
    Briefcase,
    CheckCircle2,
    Globe,
    GraduationCap,
    Heart,
    MessageSquare,
    Rocket,
    Sparkles,
    Target,
    TrendingUp,
    Trophy,
    Users,
    Zap,
} from 'lucide-react';

export default function LandingPage() {
    const features = [
        {
            icon: Briefcase,
            title: 'Internships',
            description: 'Find real-world opportunities with innovative companies',
        },
        {
            icon: Rocket,
            title: 'Launch Startups',
            description: 'Build and manage your projects from idea to execution',
        },
        {
            icon: Users,
            title: 'Find Teams',
            description: 'Connect with like-minded collaborators and mentors',
        },
        {
            icon: GraduationCap,
            title: 'Learn & Grow',
            description: 'Access courses and resources tailored to your goals',
        },
        {
            icon: MessageSquare,
            title: 'Community Forum',
            description: 'Share knowledge and get support from peers',
        },
        {
            icon: Sparkles,
            title: 'AI Assistant',
            description: 'Get personalized guidance powered by AI',
        },
    ];

    const benefits = [
        {text: 'All-in-one platform for students and young professionals'},
        {text: 'Real opportunities with verified companies'},
        {text: 'Built-in project management tools'},
        {text: 'Active community of innovators'},
        {text: 'Track your achievements and growth'},
        {text: 'Free to start, no hidden fees'},
    ];

    const stats = [
        {number: '10K+', label: 'Active Users'},
        {number: '500+', label: 'Companies'},
        {number: '1,200+', label: 'Startups'},
        {number: '95%', label: 'Success Rate'},
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Navigation */}
            <nav
                className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg ">
                            <GraduationCap className="h-8 w-8 text-primary"/>
                        </div>
                        <span
                            className="text-2xl font-bold">Elevy</span>
                    </div>
                    <div className="hidden md:flex items-center gap-6">
                        <a href="#features"
                           className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                            Features
                        </a>
                        <a href="#benefits"
                           className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                            Benefits
                        </a>
                        <a href="#community"
                           className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                            Community
                        </a>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="sm" asChild>
                            <Link to="/signin">Sign In</Link>
                        </Button>
                        <Button variant="ghost" size="sm" asChild>
                            <Link to="/signup">Sign Up</Link>
                        </Button>
                        <Button size="sm" className="bg-gradient-to-r from-primary to-accent hover:opacity-90" asChild>
                            <Link to="/dashboard">Get Started</Link>
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative overflow-hidden py-20 md:py-32">
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10"/>
                <div
                    className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"/>

                <div className="container">
                    <div className="mx-auto max-w-4xl text-center">
                        <Badge
                            className="mb-6 bg-gradient-to-r from-primary/20 to-accent/20 text-primary border-primary/20"
                            variant="outline">
                            <Sparkles className="mr-1 h-3 w-3"/>
                            Your Future Starts Here
                        </Badge>

                        <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl">
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Learn. Build. Connect.
              </span>
                            <br/>
                            <span className="text-foreground">All In One Place</span>
                        </h1>

                        <p className="mb-10 text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto">
                            Elevy empowers students and young professionals to learn new skills,
                            complete internships, launch startups, and find collaborators — without ever leaving the
                            platform.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button size="lg"
                                    className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white px-8"
                                    asChild>
                                <Link to="/dashboard">
                                    Start Your Journey
                                    <ArrowRight className="ml-2 h-4 w-4"/>
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline">
                                Watch Demo
                            </Button>
                        </div>

                        {/* Stats */}
                        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
                            {stats.map((stat, index) => (
                                <div key={index} className="flex flex-col items-center">
                                    <div
                                        className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                        {stat.number}
                                    </div>
                                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 bg-muted/30">
                <div className="container">
                    <div className="text-center mb-16">
                        <Badge className="mb-4 bg-primary/10 text-primary border-primary/20" variant="outline">
                            <Target className="mr-1 h-3 w-3"/>
                            Features
                        </Badge>
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">
                            Everything You Need to{' '}
                            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Succeed
              </span>
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            A comprehensive platform designed for ambitious students and young professionals
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <Card
                                    key={index}
                                    className="group relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
                                >
                                    <CardContent className="p-6">
                                        <div
                                            className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
                                            <Icon className="h-6 w-6 text-white"/>
                                        </div>
                                        <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                                        <p className="text-muted-foreground">{feature.description}</p>
                                    </CardContent>
                                    <div
                                        className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity"/>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section id="benefits" className="py-20">
                <div className="container">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <Badge className="mb-4 bg-secondary/10 text-secondary border-secondary/20"
                                   variant="outline">
                                <TrendingUp className="mr-1 h-3 w-3"/>
                                Why Elevy?
                            </Badge>
                            <h2 className="text-3xl md:text-5xl font-bold mb-6">
                                Your All-in-One Platform for{' '}
                                <span
                                    className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                  Career Growth
                </span>
                            </h2>
                            <p className="text-muted-foreground text-lg mb-8">
                                Stop juggling multiple platforms. Elevy brings together learning,
                                collaboration, and opportunity in one seamless experience.
                            </p>

                            <div className="space-y-4">
                                {benefits.map((benefit, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <div
                                            className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent shrink-0">
                                            <CheckCircle2 className="h-4 w-4 text-white"/>
                                        </div>
                                        <p className="text-foreground">{benefit.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div
                                className="absolute -inset-4 bg-gradient-to-r from-primary to-accent opacity-20 blur-3xl"/>
                            <Card className="relative border-2">
                                <CardContent className="p-8">
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-4">
                                            <div
                                                className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
                                                <Rocket className="h-8 w-8 text-white"/>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-lg">Launch Your Ideas</h3>
                                                <p className="text-sm text-muted-foreground">Turn concepts into
                                                    reality</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div
                                                className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-secondary to-primary">
                                                <Users className="h-8 w-8 text-white"/>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-lg">Build Your Network</h3>
                                                <p className="text-sm text-muted-foreground">Connect with innovators</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div
                                                className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-accent to-secondary">
                                                <Trophy className="h-8 w-8 text-white"/>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-lg">Track Your Progress</h3>
                                                <p className="text-sm text-muted-foreground">Celebrate achievements</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Community Section */}
            <section id="community" className="py-20 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10">
                <div className="container">
                    <div className="mx-auto max-w-3xl text-center">
                        <Badge className="mb-4 bg-accent/10 text-accent border-accent/20" variant="outline">
                            <Heart className="mr-1 h-3 w-3"/>
                            Community
                        </Badge>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            Join Thousands of{' '}
                            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Innovators
              </span>
                        </h2>
                        <p className="text-muted-foreground text-lg mb-8">
                            Be part of a vibrant community where students and young professionals
                            support each other's growth and success.
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-8 mb-12">
                            <div className="flex items-center gap-2">
                                <Globe className="h-5 w-5 text-primary"/>
                                <span className="text-sm font-medium">50+ Countries</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="h-5 w-5 text-secondary"/>
                                <span className="text-sm font-medium">10K+ Members</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MessageSquare className="h-5 w-5 text-accent"/>
                                <span className="text-sm font-medium">Active Daily</span>
                            </div>
                        </div>

                        <Button size="lg"
                                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white px-8"
                                asChild>
                            <Link to="/dashboard">
                                Join the Community
                                <ArrowRight className="ml-2 h-4 w-4"/>
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20">
                <div className="container">
                    <Card className="relative overflow-hidden border-2 border-primary/20">
                        <div
                            className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10"/>
                        <CardContent className="relative p-12 text-center">
                            <h2 className="text-3xl md:text-5xl font-bold mb-4">
                                Ready to{' '}
                                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Transform Your Future?
                </span>
                            </h2>
                            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                                Join Elevy today and start your journey towards professional success.
                                It's free to get started!
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Button size="lg"
                                        className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white px-8"
                                        asChild>
                                    <Link to="/dashboard">
                                        Get Started Free
                                        <ArrowRight className="ml-2 h-4 w-4"/>
                                    </Link>
                                </Button>
                                <Button size="lg" variant="outline">
                                    Learn More
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t py-12 bg-muted/30">
                <div className="container">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <h3 className="font-semibold mb-3">Product</h3>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
                                <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
                                <li><a href="#" className="hover:text-foreground transition-colors">FAQ</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-3">Company</h3>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                                <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-3">Resources</h3>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li><a href="#" className="hover:text-foreground transition-colors">Documentation</a>
                                </li>
                                <li><a href="#" className="hover:text-foreground transition-colors">Support</a></li>
                                <li><a href="#" className="hover:text-foreground transition-colors">Community</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-3">Legal</h3>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
                                <li><a href="#" className="hover:text-foreground transition-colors">Terms</a></li>
                                <li><a href="#" className="hover:text-foreground transition-colors">Security</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t gap-4">
                        <div className="flex items-center gap-2">
                            <div
                                className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
                                <Zap className="h-5 w-5 text-white"/>
                            </div>
                            <span
                                className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Elevy
              </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            © 2024 Elevy. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
