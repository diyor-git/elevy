import {Card} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Code2} from "lucide-react";

function TechStack({stack}) {
    if (!stack?.length) return null;

    return (
        <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
                <Code2 className="w-5 h-5 text-primary"/>
                <h2 className="text-2xl font-bold">Tech Stack</h2>
            </div>

            <div className="flex flex-wrap gap-2">
                {stack.map((tech) => (
                    <Badge key={tech} variant="outline">{tech}</Badge>
                ))}
            </div>
        </Card>
    );
}

export default TechStack;