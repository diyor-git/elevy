import {Link, useParams} from "react-router-dom";
import {Button} from "@/components/ui/button";
import {ArrowLeft} from "lucide-react";

import {useAppDispatch, useAppSelector} from "@/redux/hooks.ts";
import {useEffect, useState} from "react";
import {getStartup} from "@/redux/selectors/startupsSelector.ts";
import {getStartupById} from "@/redux/thunks/startups-thunk.ts";
import {
    FundingTimeline, Hero,
    JobsList,
    StartupSkeleton,
    Team,
    TechStack,
    UpdatesList
} from "@/pages/platform/pages/Startups/components";

function StartupDetailsPage() {
    const {id} = useParams();
    const dispatch = useAppDispatch();
    const startup = useAppSelector(getStartup);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) dispatch(getStartupById(id)).then()
            .finally(() => setLoading(false));
    }, [id]);
    if (loading) return <StartupSkeleton/>;

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
                        <TechStack stack={startup.techStack}/>
                        <FundingTimeline rounds={startup.fundingRounds}/>
                        <JobsList jobs={startup.jobs}/>
                        <UpdatesList updates={startup.recentUpdates}/>
                        <Team members={startup.teamMembers} teamSize={startup.teamSize} onClick={() => {}}/>
                    </div>

                    {/* SIDEBAR */}
                    <Sidebar startup={startup}/>
                </div>
            </main>
        </div>
    );
}

export default StartupDetailsPage;
