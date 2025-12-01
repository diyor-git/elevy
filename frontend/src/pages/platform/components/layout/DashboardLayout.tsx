import {useCallback, useMemo, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {
    Bell,
    Briefcase,
    ChartNoAxesGantt,
    FolderDot,
    Menu,
    Plus,
    Rocket,
    Send,
    Sparkles,
    Target,
    Trophy,
    UserPen,
    X,
} from "lucide-react";

import {cn} from "@/lib/utils.ts";
import {Button} from "@/components/ui/button.tsx";
import SidebarItem from "@/pages/platform/components/layout/SidebarItem.tsx";
import {DashboardLayoutProps, NavItem} from "@/types/layout";


const navItems: NavItem[] = [
    {
        title: "Internships",
        href: "/dashboard/internships",
        icon: Briefcase,
        children: [
            {title: "Internships", href: "/internships", icon: ChartNoAxesGantt},
            {title: "Create", href: "/internships/create", icon: Plus},
        ],
    },
    {
        title: "Startups",
        href: "/dashboard/startups",
        icon: FolderDot,
    },
    {
        title: "My Startups",
        href: "/dashboard/my-startups",
        icon: Rocket,
        children: [
            {title: "Create Startup", href: "/dashboard/my-startups/create", icon: Plus},
            {title: "Projects", href: "/dashboard/my-startups", icon: Target},
        ],
    },
    {title: "AI Zone", href: "/dashboard/ai-zone", icon: Sparkles},
    {title: "Achievements", href: "/dashboard/achievements", icon: Trophy},
    {title: "Profile", href: "/dashboard/profile", icon: UserPen},
    {title: "Messages", href: "/dashboard/messages", icon: Send},
];

export default function DashboardLayout({children}: DashboardLayoutProps) {
    const location = useLocation();

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [expanded, setExpanded] = useState<string[]>(["My Startups"]);

    const toggleExpanded = useCallback(
        (title: string) => {
            setExpanded((prev) =>
                prev.includes(title)
                    ? prev.filter((i) => i !== title)
                    : [...prev, title]
            );
        },
        []
    );

    const activePath = location.pathname;

    const SidebarContent = useMemo(
        () => (
            <div className="flex flex-col h-full bg-white z-40">
                {/* Logo */}
                <div className="h-16 flex items-center px-6 border-b">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
                            <Rocket className="h-5 w-5"/>
                        </div>
                        {isSidebarOpen && <span className="font-bold text-xl">Elevy</span>}
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-4 px-3">
                    <ul className="space-y-1">
                        {navItems.map((item) => {
                            const active = activePath.startsWith(item.href);
                            const expandedState = expanded.includes(item.title);
                            return (
                                <SidebarItem
                                    key={item.title}
                                    item={item}
                                    isExpanded={expandedState}
                                    isSidebarOpen={isSidebarOpen}
                                    active={active}
                                    toggle={toggleExpanded}
                                />
                            );
                        })}
                    </ul>
                </nav>

                {/* User */}
                <div className="border-t p-4">
                    <Link to="/dashboard/profile">
                        <div className="flex items-center gap-3">
                            <div
                                className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
                                JD
                            </div>
                            {isSidebarOpen && (
                                <div>
                                    <p className="text-sm font-medium">John Doe</p>
                                    <p className="text-xs text-muted-foreground">john@elevy.com</p>
                                </div>
                            )}
                        </div>
                    </Link>
                </div>

            </div>
        ),
        [expanded, activePath, isSidebarOpen]
    );

    return (
        <div className="min-h-screen flex">
            {/* Desktop Sidebar */}
            <aside
                className={cn(
                    "hidden lg:flex flex-col border-r bg-sidebar-background transition-all",
                    isSidebarOpen ? "w-64" : "w-20"
                )}
            >
                {SidebarContent}
            </aside>

            {/* Mobile Sidebar */}
            {isMobileOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/50 z-40"
                        onClick={() => setIsMobileOpen(false)}
                    />
                    <aside className="fixed left-0 inset-y-0 w-64 bg-sidebar-background border-r z-50">
                        {SidebarContent}
                    </aside>
                </>
            )}

            {/* Main */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="h-16 border-b bg-card sticky top-0 flex items-center justify-between px-4">
                    <div className="flex items-center gap-2">
                        {/* Mobile toggle */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="lg:hidden"
                            onClick={() => setIsMobileOpen((s) => !s)}
                        >
                            {isMobileOpen ? <X/> : <Menu/>}
                        </Button>

                        {/* Desktop collapse */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="hidden lg:flex"
                            onClick={() => setIsSidebarOpen((s) => !s)}
                        >
                            <Menu/>
                        </Button>
                    </div>

                    <Button variant="ghost" size="icon" className="relative">
                        <Bell className="h-5 w-5"/>
                        <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"/>
                    </Button>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto">
                    <div className="container max-w-7xl mx-auto p-4">{children}</div>
                </main>
            </div>
        </div>
    );
}
