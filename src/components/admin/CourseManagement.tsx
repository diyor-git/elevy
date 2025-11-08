import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { table } from '@devvai/devv-code-backend';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAppSelector } from '@/store';
import type { Course } from '@/types/admin';
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

export function CourseManagement() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingCourse, setEditingCourse] = useState<Course | null>(null);
    const { toast } = useToast();
    const { user } = useAppSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        instructor: '',
        thumbnail: '',
        category: '',
        level: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
        duration: 0,
        lessons: 0,
        price: 0,
        status: 'draft' as 'draft' | 'published' | 'archived',
    });

    useEffect(() => {
        loadCourses();
    }, []);

    const loadCourses = async () => {
        try {
            setLoading(true);
            const result = await table.getItems('f3i2sdx35udc', { limit: 100 });

            const coursesData = result.items.map((course: any) => ({
                ...course,
                curriculum: JSON.parse(course.curriculum || '[]'),
            }));
            setCourses(coursesData);
        } catch (error) {
            console.error('Failed to load courses:', error);
            toast({
                title: 'Error',
                description: 'Failed to load courses',
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
            const courseData = {
                ...formData,
                rating: 0,
                studentsCount: 0,
                curriculum: JSON.stringify([]),
                updatedAt: Date.now(),
                ...(editingCourse
                    ? {}
                    : {
                        createdAt: Date.now(),
                    }),
            };

            if (editingCourse) {
                await table.updateItem('f3i2sdx35udc', {
                    _uid: editingCourse._uid,
                    _id: editingCourse._id,
                    ...courseData,
                });
                toast({
                    title: 'Success',
                    description: 'Course updated successfully',
                });
            } else {
                await table.addItem('f3i2sdx35udc', {
                    _uid: user.uid,
                    ...courseData,
                });
                toast({
                    title: 'Success',
                    description: 'Course created successfully',
                });
            }

            setIsDialogOpen(false);
            resetForm();
            loadCourses();
        } catch (error) {
            toast({
                title: 'Error',
                description: editingCourse ? 'Failed to update course' : 'Failed to create course',
                variant: 'destructive',
            });
        }
    };

    const handleEdit = (course: Course) => {
        setEditingCourse(course);
        setFormData({
            title: course.title,
            description: course.description,
            instructor: course.instructor,
            thumbnail: course.thumbnail,
            category: course.category,
            level: course.level,
            duration: course.duration,
            lessons: course.lessons,
            price: course.price,
            status: course.status,
        });
        setIsDialogOpen(true);
    };

    const handleDelete = async (course: Course) => {
        if (!confirm('Are you sure you want to delete this course?')) return;

        try {
            await table.deleteItem('f3i2sdx35udc', {
                _uid: course._uid,
                _id: course._id,
            });
            toast({
                title: 'Success',
                description: 'Course deleted successfully',
            });
            loadCourses();
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to delete course',
                variant: 'destructive',
            });
        }
    };

    const resetForm = () => {
        setEditingCourse(null);
        setFormData({
            title: '',
            description: '',
            instructor: '',
            thumbnail: '',
            category: '',
            level: 'beginner',
            duration: 0,
            lessons: 0,
            price: 0,
            status: 'draft',
        });
    };

    const filteredCourses = courses.filter((course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase())
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
                            <CardTitle>Course Management</CardTitle>
                            <CardDescription>Create and manage courses</CardDescription>
                        </div>
                        <Button onClick={() => setIsDialogOpen(true)}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Course
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search courses..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9"
                        />
                    </div>

                    {/* Courses List */}
                    <div className="space-y-3">
                        {filteredCourses.length > 0 ? (
                            filteredCourses.map((course) => (
                                <div
                                    key={course._id}
                                    className="flex items-start gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                                >
                                    <img
                                        src={course.thumbnail || `https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=150&fit=crop`}
                                        alt={course.title}
                                        className="w-24 h-16 object-cover rounded-md"
                                    />

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2 mb-1">
                                            <h3 className="font-semibold truncate">{course.title}</h3>
                                            <Badge className={getStatusColor(course.status)}>
                                                {course.status}
                                            </Badge>
                                        </div>

                                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                                            {course.description}
                                        </p>

                                        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                                            <span>{course.instructor}</span>
                                            <span>•</span>
                                            <span>{course.category}</span>
                                            <span>•</span>
                                            <span className="capitalize">{course.level}</span>
                                            <span>•</span>
                                            <span>{course.duration}h</span>
                                            <span>•</span>
                                            <span>{course.lessons} lessons</span>
                                            <span>•</span>
                                            <span className="font-medium">${course.price}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Button variant="ghost" size="sm" onClick={() => handleEdit(course)}>
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleDelete(course)}
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
                                    {searchQuery ? 'No courses found' : 'No courses yet. Create your first course!'}
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
                        <DialogTitle>{editingCourse ? 'Edit Course' : 'Create New Course'}</DialogTitle>
                        <DialogDescription>
                            {editingCourse ? 'Update course details' : 'Add a new course to the catalog'}
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <Label htmlFor="title">Title *</Label>
                                <Input
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
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

                            <div>
                                <Label htmlFor="instructor">Instructor *</Label>
                                <Input
                                    id="instructor"
                                    value={formData.instructor}
                                    onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="category">Category *</Label>
                                <Input
                                    id="category"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    placeholder="e.g., Programming, Design"
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="level">Level *</Label>
                                <Select value={formData.level} onValueChange={(value: any) => setFormData({ ...formData, level: value })}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="beginner">Beginner</SelectItem>
                                        <SelectItem value="intermediate">Intermediate</SelectItem>
                                        <SelectItem value="advanced">Advanced</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
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

                            <div>
                                <Label htmlFor="duration">Duration (hours) *</Label>
                                <Input
                                    id="duration"
                                    type="number"
                                    min="0"
                                    value={formData.duration}
                                    onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 0 })}
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="lessons">Lessons *</Label>
                                <Input
                                    id="lessons"
                                    type="number"
                                    min="0"
                                    value={formData.lessons}
                                    onChange={(e) => setFormData({ ...formData, lessons: parseInt(e.target.value) || 0 })}
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="price">Price ($) *</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                                    required
                                />
                            </div>

                            <div className="col-span-2">
                                <Label htmlFor="thumbnail">Thumbnail URL</Label>
                                <Input
                                    id="thumbnail"
                                    type="url"
                                    value={formData.thumbnail}
                                    onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                                    placeholder="https://example.com/image.jpg"
                                />
                            </div>
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit">
                                {editingCourse ? 'Update Course' : 'Create Course'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}
