import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { table } from '@devvai/devv-code-backend';
import { Plus, Edit, Trash2, Search, Rocket } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAppSelector } from '@/store';
import type { Startup } from '@/types/admin';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export function StartupManagement() {
    const [startups, setStartups] = useState<Startup[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingStartup, setEditingStartup] = useState<Startup | null>(null);
    const { toast } = useToast();
    const { user } = useAppSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        name: '',
        logo: '',
        tagline: '',
        description: '',
        industry: '',
        stage: 'idea' as 'idea' | 'mvp' | 'launched' | 'growing' | 'scaling',
        founded: new Date().getFullYear(),
        teamSize: 0,
        website: '',
        lookingFor: '',
        status: 'draft' as 'draft' | 'published' | 'archived',
    });

    useEffect(() => {
        loadStartups();
    }, []);

    const loadStartups = async () => {
        try {
            setLoading(true);
            const result = await table.getItems('f3i2sdwj6nlt', { limit: 100 });

            const startupsData = result.items.map((startup: any) => ({
                ...startup,
                lookingFor: JSON.parse(startup.lookingFor || '[]'),
            }));
            setStartups(startupsData);
        } catch (error) {
            console.error('Failed to load startups:', error);
            toast({
                title: 'Error',
                description: 'Failed to load startups',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        try {
            const startupData = {
                ...formData,
                lookingFor: JSON.stringify(formData.lookingFor.split('\n').filter(item => item.trim())),
                updatedAt: Date.now(),
                ...(editingStartup
                    ? {}
                    : {
                        createdAt: Date.now(),
                    }),
            };

            if (editingStartup) {
                await table.updateItem('f3i2sdwj6nlt', {
                    _uid: editingStartup._uid,
                    _id: editingStartup._id,
                    ...startupData,
                });
                toast({
                    title: 'Success',
                    description: 'Startup updated successfully',
                });
            } else {
                await table.addItem('f3i2sdwj6nlt', {
                    _uid: user.uid,
                    ...startupData,
                });
                toast({
                    title: 'Success',
                    description: 'Startup created successfully',
                });
            }

            setIsDialogOpen(false);
            resetForm();
            loadStartups();
        } catch (error) {
            toast({
                title: 'Error',
                description: editingStartup ? 'Failed to update startup' : 'Failed to create startup',
                variant: 'destructive',
            });
        }
    };

    const handleEdit = (startup: Startup) => {
        setEditingStartup(startup);
        setFormData({
            name: startup.name,
            logo: startup.logo,
            tagline: startup.tagline,
            description: startup.description,
            industry: startup.industry,
            stage: startup.stage,
            founded: startup.founded,
            teamSize: startup.teamSize,
            website: startup.website || '',
            lookingFor: startup.lookingFor.join('\n'),
            status: startup.status,
        });
        setIsDialogOpen(true);
    };

    const handleDelete = async (startup: Startup) => {
        if (!confirm('Are you sure you want to delete this startup?')) return;

        try {
            await table.deleteItem('f3i2sdwj6nlt', {
                _uid: startup._uid,
                _id: startup._id,
            });
            toast({
                title: 'Success',
                description: 'Startup deleted successfully',
            });
            loadStartups();
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to delete startup',
                variant: 'destructive',
            });
        }
    };

    const resetForm = () => {
        setEditingStartup(null);
        setFormData({
            name: '',
            logo: '',
            tagline: '',
            description: '',
            industry: '',
            stage: 'idea',
            founded: new Date().getFullYear(),
            teamSize: 0,
            website: '',
            lookingFor: '',
            status: 'draft',
        });
    };

    const filteredStartups = startups.filter((startup) =>
        startup.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        startup.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        startup.industry.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'published':
                return 'bg-green-500/10 text-green-700 dark:text-green-400';
            case 'draft':
                return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400';
            case 'archived':
                return 'bg-gray-500/10 text-gray-700 dark:text-gray-400';
            default:
                return '';
        }
    };

    const getStageColor = (stage: string) => {
        switch (stage) {
            case 'idea':
                return 'bg-blue-500/10 text-blue-700 dark:text-blue-400';
            case 'mvp':
                return 'bg-purple-500/10 text-purple-700 dark:text-purple-400';
            case 'launched':
                return 'bg-green-500/10 text-green-700 dark:text-green-400';
            case 'growing':
                return 'bg-orange-500/10 text-orange-700 dark:text-orange-400';
            case 'scaling':
                return 'bg-pink-500/10 text-pink-700 dark:text-pink-400';
            default:
                return '';
        }
    };

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
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Startup Management</CardTitle>
                            <CardDescription>Create and manage startup profiles</CardDescription>
                        </div>
                        <Button onClick={() => setIsDialogOpen(true)}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Startup
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search startups..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9"
                        />
                    </div>

                    {/* Startups List */}
                    <div className="space-y-3">
                        {filteredStartups.length > 0 ? (
                            filteredStartups.map((startup) => (
                                <div
                                    key={startup._id}
                                    className="flex items-start gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                                >
                                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                                        {startup.logo ? (
                                            <img src={startup.logo} alt={startup.name} className="w-full h-full rounded-lg object-cover" />
                                        ) : (
                                            <Rocket className="h-6 w-6 text-muted-foreground" />
                                        )}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2 mb-1">
                                            <h3 className="font-semibold truncate">{startup.name}</h3>
                                            <div className="flex gap-2">
                                                <Badge className={getStageColor(startup.stage)} variant="secondary">
                                                    {startup.stage}
                                                </Badge>
                                                <Badge className={getStatusColor(startup.status)}>
                                                    {startup.status}
                                                </Badge>
                                            </div>
                                        </div>

                                        <p className="text-sm text-muted-foreground mb-2">{startup.tagline}</p>

                                        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-2">
                                            <span>{startup.industry}</span>
                                            <span>•</span>
                                            <span>Founded {startup.founded}</span>
                                            <span>•</span>
                                            <span>{startup.teamSize} team members</span>
                                            {startup.website && (
                                                <>
                                                    <span>•</span>
                                                    <a href={startup.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                                        Website
                                                    </a>
                                                </>
                                            )}
                                        </div>

                                        {startup.lookingFor.length > 0 && (
                                            <div className="flex gap-2 flex-wrap">
                                                {startup.lookingFor.map((item, index) => (
                                                    <Badge key={index} variant="outline" className="text-xs">
                                                        Looking for: {item}
                                                    </Badge>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Button variant="ghost" size="sm" onClick={() => handleEdit(startup)}>
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleDelete(startup)}
                                            className="text-destructive hover:text-destructive"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-muted-foreground">
                                    {searchQuery ? 'No startups found' : 'No startups yet. Create your first startup!'}
                                </p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Add/Edit Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={(open) => {
                setIsDialogOpen(open);
                if (!open) resetForm();
            }}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{editingStartup ? 'Edit Startup' : 'Create New Startup'}</DialogTitle>
                        <DialogDescription>
                            {editingStartup ? 'Update startup details' : 'Add a new startup profile'}
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <Label htmlFor="name">Startup Name *</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="col-span-2">
                                <Label htmlFor="tagline">Tagline *</Label>
                                <Input
                                    id="tagline"
                                    value={formData.tagline}
                                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                                    placeholder="One-line description of your startup"
                                    required
                                />
                            </div>

                            <div className="col-span-2">
                                <Label htmlFor="description">Description *</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={4}
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="industry">Industry *</Label>
                                <Input
                                    id="industry"
                                    value={formData.industry}
                                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                                    placeholder="e.g., EdTech, FinTech"
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="stage">Stage *</Label>
                                <Select value={formData.stage} onValueChange={(value: any) => setFormData({ ...formData, stage: value })}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="idea">Idea</SelectItem>
                                        <SelectItem value="mvp">MVP</SelectItem>
                                        <SelectItem value="launched">Launched</SelectItem>
                                        <SelectItem value="growing">Growing</SelectItem>
                                        <SelectItem value="scaling">Scaling</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label htmlFor="founded">Founded Year *</Label>
                                <Input
                                    id="founded"
                                    type="number"
                                    min="1900"
                                    max={new Date().getFullYear()}
                                    value={formData.founded}
                                    onChange={(e) => setFormData({ ...formData, founded: parseInt(e.target.value) || new Date().getFullYear() })}
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="teamSize">Team Size *</Label>
                                <Input
                                    id="teamSize"
                                    type="number"
                                    min="0"
                                    value={formData.teamSize}
                                    onChange={(e) => setFormData({ ...formData, teamSize: parseInt(e.target.value) || 0 })}
                                    required
                                />
                            </div>

                            <div className="col-span-2">
                                <Label htmlFor="website">Website URL</Label>
                                <Input
                                    id="website"
                                    type="url"
                                    value={formData.website}
                                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                    placeholder="https://example.com"
                                />
                            </div>

                            <div className="col-span-2">
                                <Label htmlFor="logo">Logo URL</Label>
                                <Input
                                    id="logo"
                                    type="url"
                                    value={formData.logo}
                                    onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                                    placeholder="https://example.com/logo.png"
                                />
                            </div>

                            <div className="col-span-2">
                                <Label htmlFor="lookingFor">Looking For (one per line)</Label>
                                <Textarea
                                    id="lookingFor"
                                    value={formData.lookingFor}
                                    onChange={(e) => setFormData({ ...formData, lookingFor: e.target.value })}
                                    rows={3}
                                    placeholder="Co-founder&#10;Interns&#10;Advisors&#10;Investors"
                                />
                            </div>

                            <div className="col-span-2">
                                <Label htmlFor="status">Status *</Label>
                                <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="draft">Draft</SelectItem>
                                        <SelectItem value="published">Published</SelectItem>
                                        <SelectItem value="archived">Archived</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit">
                                {editingStartup ? 'Update Startup' : 'Create Startup'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}
