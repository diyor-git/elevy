import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { table } from '@devvai/devv-code-backend';
import { Search, UserX, Mail, Calendar, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { UserProfile } from '@/types/user';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export function UserManagement() {
    const [users, setUsers] = useState<UserProfile[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [deleteUser, setDeleteUser] = useState<UserProfile | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            setLoading(true);
            const result = await table.getItems('f3i1mk4ppbls', { limit: 100 });

            const profiles = result.items.map((user: any) => ({
                ...user,
                skills: JSON.parse(user.skills || '[]'),
                education: JSON.parse(user.education || '[]'),
                experience: JSON.parse(user.experience || '[]'),
            }));
            setUsers(profiles);
        } catch (error) {
            console.error('Failed to load users:', error);
            toast({
                title: 'Error',
                description: 'Failed to load users',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async () => {
        if (!deleteUser) return;

        try {
            await table.deleteItem('f3i1mk4ppbls', {
                _uid: deleteUser._uid,
                _id: deleteUser._id,
            });

            toast({
                title: 'Success',
                description: 'User deleted successfully',
            });
            loadUsers();
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to delete user',
                variant: 'destructive',
            });
        } finally {
            setDeleteUser(null);
        }
    };

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>View and manage all registered users</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search users by name or email..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9"
                        />
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-4 rounded-lg border">
                            <div className="text-2xl font-bold">{users.length}</div>
                            <div className="text-xs text-muted-foreground">Total Users</div>
                        </div>
                        <div className="text-center p-4 rounded-lg border">
                            <div className="text-2xl font-bold">
                                {users.filter(u => Date.now() - u.updatedAt < 7 * 24 * 60 * 60 * 1000).length}
                            </div>
                            <div className="text-xs text-muted-foreground">Active This Week</div>
                        </div>
                        <div className="text-center p-4 rounded-lg border">
                            <div className="text-2xl font-bold">
                                {users.filter(u => Date.now() - u.createdAt < 30 * 24 * 60 * 60 * 1000).length}
                            </div>
                            <div className="text-xs text-muted-foreground">New This Month</div>
                        </div>
                    </div>

                    {/* Users List */}
                    <div className="space-y-3">
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
                                <div
                                    key={user._id}
                                    className="flex items-start justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                                >
                                    <div className="flex items-start space-x-4 flex-1 min-w-0">
                                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            {user.avatar ? (
                                                <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                                            ) : (
                                                <span className="text-primary font-semibold text-lg">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                                            )}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-semibold truncate">{user.name}</h3>
                                                {user.skills.length > 0 && (
                                                    <Badge variant="secondary" className="text-xs">
                                                        {user.skills.length} skills
                                                    </Badge>
                                                )}
                                            </div>

                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                                                <div className="flex items-center gap-1">
                                                    <Mail className="h-3 w-3" />
                                                    <span className="truncate">{user.email}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="h-3 w-3" />
                                                    <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
                                                </div>
                                            </div>

                                            {user.bio && (
                                                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{user.bio}</p>
                                            )}

                                            {(user.education.length > 0 || user.experience.length > 0) && (
                                                <div className="flex gap-2 mt-2">
                                                    {user.education.length > 0 && (
                                                        <Badge variant="outline" className="text-xs">
                                                            {user.education.length} education
                                                        </Badge>
                                                    )}
                                                    {user.experience.length > 0 && (
                                                        <Badge variant="outline" className="text-xs">
                                                            {user.experience.length} experience
                                                        </Badge>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 ml-4">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => window.open(`/profile?uid=${user._uid}`, '_blank')}
                                        >
                                            <ExternalLink className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setDeleteUser(user)}
                                            className="text-destructive hover:text-destructive"
                                        >
                                            <UserX className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-muted-foreground">
                                    {searchQuery ? 'No users found matching your search' : 'No users yet'}
                                </p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={!!deleteUser} onOpenChange={() => setDeleteUser(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete the user account for <strong>{deleteUser?.name}</strong> and all associated data.
                            This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteUser} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            Delete User
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
