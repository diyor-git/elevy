import {Button} from '@/components/ui/button.tsx';
import {Dialog, DialogContent, DialogHeader, DialogTitle} from '@/components/ui/dialog.tsx';
import {User} from '@/types/startup.ts';

interface TeamMemberModalProps {
    member: User | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onRemove?: (memberId: string) => void;
    isOwner?: boolean;
}

function TeamMemberModal({member, open, onOpenChange, onRemove, isOwner = false}: TeamMemberModalProps) {
    if (!member) return null;

    const {id, name, avatar, role, email, location, bio, joinedDate, linkedIn} = member;

    const handleSendMessage = () => {
        // router.push(`/messages?recipient=${id}&name=${encodeURIComponent(name)}`);
        onOpenChange(false);
    };

    const infoFields = [
        {label: 'Email', value: email, type: 'link', href: `mailto:${email}`},
        {label: 'Location', value: location},
        {label: 'Bio', value: bio},
        {label: 'Joined', value: joinedDate ? new Date(joinedDate).toLocaleDateString() : undefined},
        {label: 'LinkedIn', value: linkedIn, type: 'link', href: linkedIn},
    ];

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Team Member Details</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col items-center gap-6">
                    {/* Avatar */}
                    <div
                        className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center text-6xl border-2 border-primary">
                        {avatar}
                    </div>

                    {/* Member Info */}
                    <div className="w-full text-center">
                        <h2 className="text-2xl font-bold mb-1">{name}</h2>
                        <p className="text-primary font-semibold mb-4">{role}</p>

                        <div className="bg-muted rounded-lg p-4 space-y-3 text-left">
                            {infoFields.map((field, idx) => {
                                if (!field.value) return null;
                                return (
                                    <div key={idx}>
                                        <p className="text-xs text-muted-foreground mb-1">{field.label}</p>
                                        {field.type === 'link' ? (
                                            <a href={field.href} target="_blank" rel="noopener noreferrer"
                                               className="text-sm text-primary hover:underline cursor-pointer">
                                                {field.value}
                                            </a>
                                        ) : (
                                            <p className="text-sm text-foreground">{field.value}</p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="w-full flex gap-2">
                        <Button variant="outline" className="flex-1 cursor-pointer" onClick={handleSendMessage}>
                            Send Message
                        </Button>

                        {isOwner && onRemove && (
                            <Button
                                variant="destructive"
                                className="flex-1 cursor-pointer"
                                onClick={() => {
                                    onRemove(id);
                                    onOpenChange(false);
                                }}
                            >
                                Remove
                            </Button>
                        )}
                    </div>

                    <Button variant="ghost" className="w-full cursor-pointer" onClick={() => onOpenChange(false)}>
                        Close
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default TeamMemberModal;
