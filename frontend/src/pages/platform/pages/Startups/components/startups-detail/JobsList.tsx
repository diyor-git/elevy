import {Card} from "@/components/ui/card.tsx";
import {Briefcase} from "lucide-react";
import {Badge} from "@/components/ui/badge.tsx";

function JobsList({jobs = []}) {
    if (!jobs.length) return null;


    return (
        <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
                <Briefcase className="w-5 h-5 text-primary"/>
                <h2 className="text-2xl font-bold">Open Positions</h2>
            </div>

            <div className="space-y-4">
                {jobs.map((job, idx) => (
                    <div
                        key={idx}
                        className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-start justify-between mb-2">
                            <div>
                                <p className="font-semibold text-lg">{job.title}</p>
                                <p className="text-sm text-muted-foreground">{job.location}</p>
                            </div>
                            <Badge variant="outline">{job.type}</Badge>
                        </div>

                        <p className="text-sm text-muted-foreground mb-3">{job.description}</p>

                        {job.salary && (
                            <p className="text-sm font-semibold text-primary mb-2">
                                ${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()}
                            </p>
                        )}

                        <button className="mt-2 text-sm text-primary hover:underline">Apply Now</button>
                    </div>
                ))}
            </div>
        </Card>
    );
}

export default JobsList