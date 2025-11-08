import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { table } from '@devvai/devv-code-backend';
import { Plus, Edit, Trash2, Search, Building2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAppSelector } from '@/store';
import type { Internship } from '@/types/admin';
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

export function InternshipManagement() {
    const [internships, setInternships] = useState<Internship[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingInternship, setEditingInternship] = useState<Internship | null>(null);
    const { toast } = useToast();
    const { user } = useAppSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        title: '',
        companyName: '',
        companyLogo: '',
        location: '',
        locationType: 'remote' as 'remote' | 'onsite' | 'hybrid',
        description: '',
        requirements: '',
        responsibilities: '',
        duration: '',
        stipend: 0,
        category: '',
        applicationDeadline: '',
        status: 'draft' as 'draft' | 'published' | 'closed' | 'archived',
    });

    useEffect(() => {
        loadInternships();
    }, []);

    const loadInternships = async () => {
        try {
            setLoading(true);
            const result = await table.getItems('f3i2sdwj6nls', { limit: 100 });

            const internshipsData = result.items.map((internship: any) => ({
                ...internship,
                requirements: JSON.parse(internship.requirements || '[]'),
                responsibilities: JSON.parse(internship.responsibilities || '[]'),
            }));
            setInternships(internshipsData);
        } catch (error) {
            console.error('Failed to load internships:', error);
            toast({
                title: 'Error',
                description: 'Failed to load internships',
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
            const internshipData = {
                ...formData,
                requirements: JSON.stringify(formData.requirements.split('\n').filter(r => r.trim())),
                responsibilities: JSON.stringify(formData.responsibilities.split('\n').filter(r => r.trim())),
                applicationDeadline: new Date(formData.applicationDeadline).getTime(),
                applicationsCount: 0,
                updatedAt: Date.now(),
                ...(editingInternship
                    ? {}
                    : {
                        createdAt: Date.now(),
                    }),
            };

            if (editingInternship) {
                await table.updateItem('f3i2sdwj6nls', {
                    _uid: editingInternship._uid,
                    _id: editingInternship._id,
                    ...internshipData,
                });
                toast({
                    title: 'Success',
                    description: 'Internship updated successfully',
                });
            } else {
                await table.addItem('f3i2sdwj6nls', {
                    _uid: user.uid,
                    ...internshipData,
                });
                toast({
                    title: 'Success',
                    description: 'Internship created successfully',
                });
            }

            setIsDialogOpen(false);
            resetForm();
            loadInternships();
        } catch (error) {
            toast({
                title: 'Error',
                description: editingInternship ? 'Failed to update internship' : 'Failed to create internship',
                variant: 'destructive',
            });
        }
    };

    const handleEdit = (internship: Internship) => {
        setEditingInternship(internship);
        setFormData({
            title: internship.title,
            companyName: internship.companyName,
            companyLogo: internship.companyLogo,
            location: internship.location,
            locationType: internship.locationType,
            description: internship.description,
            requirements: internship.requirements.join('\n'),
            responsibilities: internship.responsibilities.join('\n'),
            duration: internship.duration,
            stipend: internship.stipend || 0,
            category: internship.category,
            applicationDeadline: new Date(internship.applicationDeadline).toISOString().split('T')[0],
            status: internship.status,
        });
        setIsDialogOpen(true);
    };

    const handleDelete = async (internship: Internship) => {
        if (!confirm('Are you sure you want to delete this internship?')) return;

        try {
            await table.deleteItem('f3i2sdwj6nls', {
                _uid: internship._uid,
                _id: internship._id,
            });
            toast({
                title: 'Success',
                description: 'Internship deleted successfully',
            });
            loadInternships();
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to delete internship',
                variant: 'destructive',
            });
        }
    };

    const resetForm = () => {
        setEditingInternship(null);
        setFormData({
            title: '',
            companyName: '',
            companyLogo: '',
            location: '',
            locationType: 'remote',
            description: '',
            requirements: '',
            responsibilities: '',
            duration: '',
            stipend: 0,
            category: '',
            applicationDeadline: '',
            status: 'draft',
        });
    };

    const filteredInternships = internships.filter((internship) =>
        internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        internship.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        internship.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'published':
                return 'bg-green-500/10 text-green-700 dark:text-green-400';
            case 'draft':
                return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400';
            case 'closed':
                return 'bg-red-500/10 text-red-700 dark:text-red-400';
            case 'archived':
                return 'bg-gray-500/10 text-gray-700 dark:text-gray-400';
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
                            <CardTitle>Internship Management</CardTitle>
                            <CardDescription>Create and manage internship opportunities</CardDescription>
                        </div>
                        <Button onClick={() => setIsDialogOpen(true)}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Internship
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search internships..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9"
                        />
                    </div>

                    {/* Internships List */}
                    <div className="space-y-3">
                        {filteredInternships.length > 0 ? (
                            filteredInternships.map((internship) => (
                                <div
                                    key={internship._id}
                                    className="flex items-start gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                                >
                                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                                        {internship.companyLogo ? (
                                            <img src={internship.companyLogo} alt={internship.companyName} className="w-full h-full rounded-lg object-cover" />
                                        ) : (
                                            <Building2 className="h-6 w-6 text-muted-foreground" />
                                        )}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2 mb-1">
                                            <h3 className="font-semibold truncate">{internship.title}</h3>
                                            <Badge className={getStatusColor(internship.status)}>
                                                {internship.status}
                                            </Badge>
                                        </div>

                                        <p className="text-sm font-medium text-primary mb-1">{internship.companyName}</p>

                                        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-2">
                                            <span className="capitalize">{internship.locationType}</span>
                                            <span>•</span>
                                            <span>{internship.location}</span>
                                            <span>•</span>
                                            <span>{internship.duration}</span>
                                            {internship.stipend > 0 && (
                                                <>
                                                    <span>•</span>
                                                    <span className="font-medium">${internship.stipend}/month</span>
                                                </>
                                            )}
                                        </div>

                                        <p className="text-sm text-muted-foreground line-clamp-2">
                                            {internship.description}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Button variant="ghost" size="sm" onClick={() => handleEdit(internship)}>
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleDelete(internship)}
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
                                    {searchQuery ? 'No internships found' : 'No internships yet. Create your first internship!'}
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
                        <DialogTitle>{editingInternship ? 'Edit Internship' : 'Create New Internship'}</DialogTitle>
                        <DialogDescription>
                            {editingInternship ? 'Update internship details' : 'Add a new internship opportunity'}
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <Label htmlFor="title">Position Title *</Label>
                                <Input
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="companyName">Company Name *</Label>
                                <Input
                                    id="companyName"
                                    value={formData.companyName}
                                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="companyLogo">Company Logo URL</Label>
                                <Input
                                    id="companyLogo"
                                    type="url"
                                    value={formData.companyLogo}
                                    onChange={(e) => setFormData({ ...formData, companyLogo: e.target.value })}
                                />
                            </div>

                            <div>
                                <Label htmlFor="location">Location *</Label>
                                <Input
                                    id="location"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    placeholder="e.g., San Francisco, CA"
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="locationType">Location Type *</Label>
                                <Select value={formData.locationType} onValueChange={(value: any) => setFormData({ ...formData, locationType: value })}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="remote">Remote</SelectItem>
                                        <SelectItem value="onsite">Onsite</SelectItem>
                                        <SelectItem value="hybrid">Hybrid</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="col-span-2">
                                <Label htmlFor="description">Description *</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={3}
                                    required
                                />
                            </div>

                            <div className="col-span-2">
                                <Label htmlFor="requirements">Requirements (one per line) *</Label>
                                <Textarea
                                    id="requirements"
                                    value={formData.requirements}
                                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                                    rows={4}
                                    placeholder="Bachelor's degree in Computer Science&#10;Strong knowledge of React&#10;Excellent communication skills"
                                    required
                                />
                            </div>

                            <div className="col-span-2">
                                <Label htmlFor="responsibilities">Responsibilities (one per line) *</Label>
                                <Textarea
                                    id="responsibilities"
                                    value={formData.responsibilities}
                                    onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                                    rows={4}
                                    placeholder="Develop and maintain web applications&#10;Collaborate with the team&#10;Write clean, maintainable code"
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="duration">Duration *</Label>
                                <Input
                                    id="duration"
                                    value={formData.duration}
                                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                    placeholder="e.g., 3 months, 6 months"
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="stipend">Monthly Stipend ($)</Label>
                                <Input
                                    id="stipend"
                                    type="number"
                                    min="0"
                                    value={formData.stipend}
                                    onChange={(e) => setFormData({ ...formData, stipend: parseFloat(e.target.value) || 0 })}
                                />
                            </div>

                            <div>
                                <Label htmlFor="category">Category *</Label>
                                <Input
                                    id="category"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    placeholder="e.g., Software Development"
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="applicationDeadline">Application Deadline *</Label>
                                <Input
                                    id="applicationDeadline"
                                    type="date"
                                    value={formData.applicationDeadline}
                                    onChange={(e) => setFormData({ ...formData, applicationDeadline: e.target.value })}
                                    required
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
                                        <SelectItem value="closed">Closed</SelectItem>
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
                                {editingInternship ? 'Update Internship' : 'Create Internship'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}
