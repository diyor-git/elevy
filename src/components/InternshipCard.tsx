import { Internship } from "@/types/internship";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MapPin, Clock, DollarSign, Users, Star } from "lucide-react";
import { Link } from "react-router-dom";

interface InternshipCardProps {
  internship: Internship;
}

export function InternshipCard({ internship }: InternshipCardProps) {
  const avgRating = internship.reviews.length > 0
    ? internship.reviews.reduce((sum, r) => sum + r.rating, 0) / internship.reviews.length
    : 0;

  return (
    <Card className="group p-6 hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/20 bg-white">
      <Link to={`/internships/${internship.id}`}>
      {internship.featured && (
        <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
          Featured
        </Badge>
      )}
      
      <div className="flex items-start gap-4 mb-4">
        <img
          src={internship.company.logo}
          alt={internship.company.name}
          className="w-16 h-16 rounded-lg object-cover border border-border/50"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors mb-1 line-clamp-1">
            {internship.title}
          </h3>
          <p className="text-sm font-medium text-muted-foreground mb-2">
            {internship.company.name}
          </p>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            {avgRating > 0 && (
              <>
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium text-foreground">{avgRating.toFixed(1)}</span>
                <span className="mx-1">•</span>
              </>
            )}
            <span>{internship.reviews.length} reviews</span>
          </div>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {internship.description}
      </p>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 text-primary/70" />
          <span className="truncate">{internship.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4 text-primary/70" />
          <span>{internship.duration}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <DollarSign className="w-4 h-4 text-primary/70" />
          <span className="font-medium text-foreground">
            {internship.pay === "Paid" ? internship.salary : internship.pay}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="w-4 h-4 text-primary/70" />
          <span>{internship.applicants} applicants</span>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <Badge variant="secondary" className="text-xs">
          {internship.category}
        </Badge>
        <Badge variant="outline" className="text-xs">
          {internship.format}
        </Badge>
        {internship.skills.slice(0, 2).map((skill, idx) => (
          <Badge key={idx} variant="outline" className="text-xs">
            {skill}
          </Badge>
        ))}
        {internship.skills.length > 2 && (
          <Badge variant="outline" className="text-xs">
            +{internship.skills.length - 2} more
          </Badge>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border/50">
        <div className="text-xs text-muted-foreground">
          Deadline: <span className="font-medium text-foreground">{internship.deadline}</span>
        </div>
        <Link to={`/internships/${internship.id}`}>
          <Button size="sm" className="group-hover:shadow-md transition-all" variant="secondary">
            View Details
          </Button>
        </Link>
      </div>
      </Link>
    </Card>
  );
}
