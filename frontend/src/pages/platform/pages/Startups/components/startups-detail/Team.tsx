import {Users} from "lucide-react";
import {Card} from "@/components/ui/card";

function Team({members = [], teamSize = 0, onClick}) {
    return (
        <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-primary"/>
                <h2 className="text-2xl font-bold">Team</h2>
            </div>

            <p className="text-muted-foreground mb-6">
                Team size: <span className="font-semibold">{teamSize}</span>
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {members.map((member) => (
                    <button
                        key={member.id}
                        onClick={() => onClick?.(member)}
                        className="p-4 rounded-lg border hover:shadow-lg hover:border-primary transition-all text-left"
                    >
                        <div className="text-3xl mb-2">{member.avatar}</div>
                        <p className="font-semibold text-sm line-clamp-1">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.role}</p>
                    </button>
                ))}
            </div>
        </Card>
    );
}

export default Team;