import {Card} from "@/components/ui/card.tsx";
import {DollarSign} from "lucide-react";

function FundingTimeline({rounds = []}) {
    if (!rounds.length) return null;

    return (
        <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
                <DollarSign className="w-5 h-5 text-primary"/>
                <h2 className="text-2xl font-bold">Funding Timeline</h2>
            </div>

            <div className="space-y-4">
                {rounds.map((round, idx) => (
                    <div key={idx} className="border-l-2 border-primary/50 pl-4 pb-4 last:pb-0">
                        <div className="flex items-start justify-between mb-2">
                            <div>
                                <p className="font-semibold text-lg capitalize">{round.stage}</p>
                                <p className="text-sm text-muted-foreground">
                                    {new Date(round.date).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                    })}
                                </p>
                            </div>
                            <p className="font-bold text-primary text-lg">
                                ${(round.amount / 1_000_000).toFixed(1)}M
                            </p>
                        </div>

                        {round.investors?.length ? (
                            <p className="text-sm text-muted-foreground">
                                Investors: {round.investors.join(", ")}
                            </p>
                        ) : null}

                        {round.description && (
                            <p className="text-sm text-muted-foreground mt-2">{round.description}</p>
                        )}
                    </div>
                ))}
            </div>
        </Card>
    );
}

export default FundingTimeline;