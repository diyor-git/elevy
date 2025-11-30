import {Card} from "@/components/ui/card.tsx";

function UpdatesList({updates = []}) {
    if (!updates.length) return null;

    return (
        <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">Recent Updates</h2>

            <div className="space-y-4">
                {updates.map((update, idx) => (
                    <div key={idx} className="border-b pb-4 last:border-b-0">
                        <div className="flex items-start justify-between mb-2">
                            <p className="font-semibold">{update.title}</p>
                            <span
                                className="text-xs text-muted-foreground">{new Date(update.date).toLocaleDateString()}</span>
                        </div>

                        <p className="text-sm text-muted-foreground">{update.content}</p>
                    </div>
                ))}
            </div>
        </Card>
    );
}

export default UpdatesList;