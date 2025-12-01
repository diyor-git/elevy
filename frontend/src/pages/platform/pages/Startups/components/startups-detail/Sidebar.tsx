import {Card} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Briefcase, Heart} from "lucide-react";

function Sidebar({teamSize, metrics, hiringStatus = false, isFavorite = false}) {
    return (
        <aside className="space-y-4">

            {/* METRICS */}
            {metrics?.users && (
                <Card className="p-6 space-y-4">
                    <h3 className="text-lg font-bold">Key Metrics</h3>

                    <div>
                        <p className="text-xs text-muted-foreground">Users</p>
                        <p className="text-2xl font-bold text-primary">{metrics.users.toLocaleString()}</p>
                    </div>

                    {metrics?.arr && (
                        <div>
                            <p className="text-xs text-muted-foreground">ARR</p>
                            <p className="text-2xl font-bold text-primary">
                                ${(metrics.arr / 1000).toFixed(0)}K
                            </p>
                        </div>
                    )}
                </Card>
            )}

            {/* STATUS */}

            {/* ACTIONS */}
            <Card className="p-4 space-y-3">
                <Button className="w-full gap-2">
                    <Briefcase className="w-4 h-4"/>
                    Apply to Join
                </Button>

                <Button
                    variant="outline"
                    // onClick={() => setIsFavorite(!isFavorite)}
                    className="w-full gap-2"
                >
                    <Heart
                        className={`w-4 h-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`}
                    />
                    {isFavorite ? "Saved" : "Save"}
                </Button>
            </Card>
        </aside>
    )
}

export default Sidebar;