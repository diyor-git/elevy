import {Link, useParams} from "react-router-dom";
import {Button} from "@/components/ui/button";
import {ArrowLeft} from "lucide-react";
import {
    About,
    FundingTimeline,
    Hero,
    JobsList,
    Sidebar,
    StartupSkeleton,
    Team,
    TechStack,
    UpdatesList
} from "@/pages/platform/pages/Startups/components";
import {useGetStartupByIdQuery} from "@/api/startups-api.ts";

function StartupDetailsPage() {
    const {id} = useParams();

    const {data: startup, isLoading, isError} = useGetStartupByIdQuery(id!)

    if (isLoading) return <StartupSkeleton/>;

    if (!startup)
        return (
            <div className="pt-24 text-center text-muted-foreground">
                Startup not found
            </div>
        );

    return (
        <div className="min-h-screen bg-background">
            <main className="max-w-7xl mx-auto">
                <Link to="/dashboard/startups">
                    <Button className="flex items-center gap-2 mb-8">
                        <ArrowLeft className="w-4 h-4"/> Back to Startups
                    </Button>
                </Link>

                <Hero startup={startup}/>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* MAIN COLUMN */}
                    <div className="lg:col-span-2 space-y-8">
                        <About description_long={startup.description_long}/>
                        <TechStack stack={startup.techStack}/>
                        <FundingTimeline rounds={[]}/>
                        <JobsList jobs={startup.jobs}/>
                        <UpdatesList updates={[]}/>
                        <Team members={startup.teamMembers} teamSize={startup.teamSize} onClick={() => {
                        }}/>
                    </div>

                    <Sidebar teamSize={startup.teamSize} metrics={[]}/>
                </div>
            </main>
        </div>
    );
}

export default StartupDetailsPage;
