import {Link} from "react-router-dom";
import {cn} from "@/lib/utils.ts";

interface NavChild {
    title: string;
    href: string;
    icon: React.ElementType;
}


const SidebarChildList = ({children, activeHref}: {
    children: NavChild[];
    activeHref: string;
}) => (
    <ul className="ml-8 mt-1 space-y-1">
        {children.map((child) => {
            const active = activeHref === child.href;
            return (
                <li key={child.href}>
                    <Link
                        to={child.href}
                        className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all",
                            active
                                ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                                : "text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent/30"
                        )}
                    >
                        <child.icon className="h-4 w-4"/>
                        {child.title}
                    </Link>
                </li>
            );
        })}
    </ul>
);

export default SidebarChildList;