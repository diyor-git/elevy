export interface NavChild {
    title: string;
    href: string;
    icon: React.ElementType;
}

export interface NavItem {
    title: string;
    href: string;
    icon: React.ElementType;
    children?: NavChild[];
}

export interface DashboardLayoutProps {
    children: React.ReactNode;
}
