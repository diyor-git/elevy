import {Skeleton} from "@/components/ui/skeleton";

function StartupSkeleton() {
    return (
        <div className="space-y-6">
            <Skeleton className="h-10 w-64"/>
            <Skeleton className="h-6 w-full"/>
            <Skeleton className="h-6 w-2/3"/>
            <Skeleton className="h-40 w-full"/>
            <Skeleton className="h-40 w-full"/>
        </div>
    );
}

export default StartupSkeleton;