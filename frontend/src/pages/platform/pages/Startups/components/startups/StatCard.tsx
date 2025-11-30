import {Card} from '@/components/ui/card.tsx';
import type {LucideIcon} from 'lucide-react';
import {cn} from '@/lib/utils.ts';

interface StatCardProps {
    label: string;
    value: number | string;
    icon: LucideIcon;
    className?: string;
}

function StatCard({label, value, icon: Icon, className}: StatCardProps) {
    return (
        <Card className={cn('p-6 border border-border bg-card hover:shadow-md transition-shadow', className)}>
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm text-muted-foreground mb-2 font-medium">{label}</p>
                    <p className="text-3xl font-bold text-foreground">{value}</p>
                </div>
                <Icon className="w-5 h-5 text-muted-foreground flex-shrink-0"/>
            </div>
        </Card>
    );
}

export default StatCard;