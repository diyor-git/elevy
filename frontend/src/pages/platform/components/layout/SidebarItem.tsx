import {cn} from "@/lib/utils.ts";
import {ChevronDown, ChevronRight} from "lucide-react";
import {Link} from "react-router-dom";
import {NavChild} from "@/types/layout";
import SidebarChildList from "@/pages/platform/components/layout/SidebarChildList";

interface NavItem {
    title: string;
    href: string;
    icon: React.ElementType;
    children?: NavChild[];
}

const SidebarItem = ({item, isExpanded, isSidebarOpen, active, toggle}: {
    item: NavItem;
    isExpanded: boolean;
    isSidebarOpen: boolean;
    active: boolean;
    toggle: (t: string) => void;
}) => {
    const hasChildren = !!item.children?.length;

    return (
        <li>
            <div className="flex flex-col">
                {hasChildren ? (
                    <button
                        onClick={() => toggle(item.title)}
                        className={cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-lg transition w-full group",
                            active
                                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                                : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                        )}
                    >
                        <item.icon className="h-5 w-5"/>
                        {isSidebarOpen && (
                            <>
                                <span className="text-sm font-medium">{item.title}</span>
                                {isExpanded ? (
                                    <ChevronDown className="h-4 w-4"/>
                                ) : (
                                    <ChevronRight className="h-4 w-4"/>
                                )}
                            </>
                        )}
                    </button>
                ) : (
                    <Link
                        to={item.href}
                        className={cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-lg transition group",
                            active
                                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                                : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                        )}
                    >
                        <item.icon className="h-5 w-5"/>
                        {isSidebarOpen && (
                            <span className="text-sm font-medium">{item.title}</span>
                        )}
                    </Link>
                )}

                {hasChildren && isExpanded && isSidebarOpen && (
                    <SidebarChildList
                        children={item.children!}
                        activeHref={active ? item.href : ""}
                    />
                )}
            </div>
        </li>
    );
};

export default SidebarItem;