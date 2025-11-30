import {Card} from "@/components/ui/card";

function StartupsPageSkeleton() {
    return (

        <div className="max-w-7xl mx-auto px-4">
            {/* STARTUP CARDS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({length: 6}).map((_, i) => (
                    <Card
                        key={i}
                        className="p-4 rounded-xl border animate-pulse space-y-4"
                    >
                        {/* Image */}
                        <div className="w-full h-40 bg-muted rounded"/>

                        {/* Title */}
                        <div className="h-5 w-3/4 bg-muted rounded"/>

                        {/* Short description */}
                        <div className="h-4 w-full bg-muted rounded"/>
                        <div className="h-4 w-5/6 bg-muted rounded"/>

                        {/* Category + Stage */}
                        <div className="flex gap-3 pt-2">
                            <div className="h-6 w-16 bg-muted rounded"/>
                            <div className="h-6 w-20 bg-muted rounded"/>
                        </div>

                        {/* Team */}
                        <div className="flex items-center gap-3 pt-2">
                            <div className="h-8 w-8 bg-muted rounded-full"/>
                            <div className="h-8 w-8 bg-muted rounded-full"/>
                            <div className="h-8 w-8 bg-muted rounded-full"/>
                        </div>
                    </Card>
                ))}
            </div>

            {/* PAGINATION */}
            <div className="flex items-center justify-center gap-4 mt-12 pb-12">
                <div className="h-10 w-24 bg-muted rounded animate-pulse"/>
                <div className="h-10 w-10 bg-muted rounded animate-pulse"/>
                <div className="h-10 w-24 bg-muted rounded animate-pulse"/>
            </div>
        </div>
    );
}

export default StartupsPageSkeleton;