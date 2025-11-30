import {Badge} from "@/components/ui/badge";
import {Globe, Mail, MapPin} from "lucide-react";

function Hero({startup}) {
    return (
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-8 mb-8 border border-border">
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-4xl font-bold mb-2">{startup.name}</h1>
                    <p className="text-lg text-muted-foreground mb-4">{startup.description}</p>

                    <div className="flex flex-wrap gap-4 text-sm">
                        {startup.location && (
                            <span className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4"/> {startup.location}
              </span>
                        )}

                        {startup.website && (
                            <a href={startup.website} target="_blank"
                               className="flex items-center gap-2 text-primary hover:underline">
                                <Globe className="w-4 h-4"/> Visit Website
                            </a>
                        )}

                        {startup.email && (
                            <a href={`mailto:${startup.email}`}
                               className="flex items-center gap-2 text-primary hover:underline">
                                <Mail className="w-4 h-4"/> Contact
                            </a>
                        )}
                    </div>
                </div>

                <Badge className="bg-blue-100 text-blue-800">
                    {startup.stage.toUpperCase()}
                </Badge>
            </div>
        </div>
    );
}

export default Hero;