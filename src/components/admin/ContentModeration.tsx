import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import { Textarea } from '@/components/ui/textarea.tsx';
import { table } from '@devvai/devv-code-backend';
import { Flag, Eye, Check, X, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast.tsx';
import { useAppSelector } from '@/store';
import type { ContentReport } from '@/types/admin';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog.tsx';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select.tsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx';

export function ContentModeration() {
    const [reports, setReports] = useState<ContentReport[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedReport, setSelectedReport] = useState<ContentReport | null>(null);
    const [reviewAction, setReviewAction] = useState<'resolved' | 'dismissed'>('resolved');
    const [reviewNote, setReviewNote] = useState('');
    const { toast } = useToast();
    const { user } = useAppSelector((state) => state.auth);

    useEffect(() => {
        loadReports();
    }, []);

    const loadReports = async () => {
        try {
            setLoading(true);
            const result = await table.getItems('f3i2sdx0o16o', { limit: 100 });

            const sorted = result.items.sort((a: any, b: any) => b.createdAt - a.createdAt) as ContentReport[];
            setReports(sorted);
        } catch (error) {
            console.error('Failed to load reports:', error);
            toast({
                title: 'Error',
                description: 'Failed to load reports',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleReview = async () => {
        if (!selectedReport || !user) return;

        try {
            await table.updateItem('f3i2sdx0o16o', {
                _uid: selectedReport._uid,
                _id: selectedReport._id,
                status: reviewAction,
                reviewedBy: user.uid,
                reviewedAt: Date.now(),
            });

            toast({
                title: 'Success',
                description: `Report ${reviewAction}`,
            });

            setSelectedReport(null);
            setReviewNote('');
            loadReports();
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to review report',
                variant: 'destructive',
            });
        }
    };

    const handleStartReview = async (report: ContentReport) => {
        if (!user) return;

        try {
            await table.updateItem('f3i2sdx0o16o', {
                _uid: report._uid,
                _id: report._id,
                status: 'reviewing',
                reviewedBy: user.uid,
            });

            loadReports();
            toast({
                title: 'Review started',
                description: 'This report is now being reviewed',
            });
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to start review',
                variant: 'destructive',
            });
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400';
            case 'reviewing':
                return 'bg-blue-500/10 text-blue-700 dark:text-blue-400';
            case 'resolved':
                return 'bg-green-500/10 text-green-700 dark:text-green-400';
            case 'dismissed':
                return 'bg-gray-500/10 text-gray-700 dark:text-gray-400';
            default:
                return '';
        }
    };

    const getContentTypeIcon = (type: string) => {
        switch (type) {
            case 'course':
                return '📚';
            case 'internship':
                return '💼';
            case 'startup':
                return '🚀';
            case 'user_profile':
                return '👤';
            default:
                return '📄';
        }
    };

    const filterReports = (status: string) => {
        if (status === 'all') return reports;
        return reports.filter(r => r.status === status);
    };

    const ReportsList = ({ reports }: { reports: ContentReport[] }) => (
        <div className="space-y-3">
            {reports.length > 0 ? (
                reports.map((report) => (
                    <div
                        key={report._id}
                        className="p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                        <div className="flex items-start justify-between gap-4 mb-3">
                            <div className="flex items-start gap-3 flex-1 min-w-0">
                                <div className="text-2xl">{getContentTypeIcon(report.contentType)}</div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="font-semibold capitalize truncate">
                                            {report.contentType.replace('_', ' ')}
                                        </h4>
                                        <Badge className={getStatusColor(report.status)}>
                                            {report.status}
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-2">
                                        <strong>Reason:</strong> {report.reason}
                                    </p>
                                    {report.description && (
                                        <p className="text-sm text-muted-foreground mb-2">
                                            {report.description}
                                        </p>
                                    )}
                                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                        <span>Content ID: {report.contentId.slice(0, 12)}...</span>
                                        <span>•</span>
                                        <span>{new Date(report.createdAt).toLocaleDateString()}</span>
                                        {report.reviewedAt && (
                                            <>
                                                <span>•</span>
                                                <span>Reviewed {new Date(report.reviewedAt).toLocaleDateString()}</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                {report.status === 'pending' && (
                                    <Button
                                        size="sm"
                                        onClick={() => handleStartReview(report)}
                                    >
                                        <Eye className="h-4 w-4 mr-2" />
                                        Review
                                    </Button>
                                )}
                                {report.status === 'reviewing' && (
                                    <Button
                                        size="sm"
                                        onClick={() => setSelectedReport(report)}
                                    >
                                        <Check className="h-4 w-4 mr-2" />
                                        Complete
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center py-12">
                    <Flag className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">No reports found</p>
                </div>
            )}
        </div>
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    const pendingCount = reports.filter(r => r.status === 'pending').length;
    const reviewingCount = reports.filter(r => r.status === 'reviewing').length;

    return (
        <>
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Content Moderation</CardTitle>
                            <CardDescription>Review and moderate reported content</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                            {pendingCount > 0 && (
                                <Badge variant="destructive" className="gap-1">
                                    <AlertTriangle className="h-3 w-3" />
                                    {pendingCount} pending
                                </Badge>
                            )}
                            {reviewingCount > 0 && (
                                <Badge variant="secondary">
                                    {reviewingCount} in review
                                </Badge>
                            )}
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="pending" className="space-y-4">
                        <TabsList>
                            <TabsTrigger value="pending">
                                Pending ({pendingCount})
                            </TabsTrigger>
                            <TabsTrigger value="reviewing">
                                Reviewing ({reviewingCount})
                            </TabsTrigger>
                            <TabsTrigger value="resolved">
                                Resolved ({reports.filter(r => r.status === 'resolved').length})
                            </TabsTrigger>
                            <TabsTrigger value="all">
                                All ({reports.length})
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="pending">
                            <ReportsList reports={filterReports('pending')} />
                        </TabsContent>

                        <TabsContent value="reviewing">
                            <ReportsList reports={filterReports('reviewing')} />
                        </TabsContent>

                        <TabsContent value="resolved">
                            <ReportsList reports={filterReports('resolved')} />
                        </TabsContent>

                        <TabsContent value="all">
                            <ReportsList reports={reports} />
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>

            {/* Review Dialog */}
            <Dialog open={!!selectedReport} onOpenChange={(open) => {
                if (!open) {
                    setSelectedReport(null);
                    setReviewNote('');
                }
            }}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Complete Review</DialogTitle>
                        <DialogDescription>
                            Choose an action for this report
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium mb-2 block">Action</label>
                            <Select value={reviewAction} onValueChange={(value: any) => setReviewAction(value)}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="resolved">
                                        <div className="flex items-center gap-2">
                                            <Check className="h-4 w-4 text-green-600" />
                                            <span>Resolved - Issue addressed</span>
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="dismissed">
                                        <div className="flex items-center gap-2">
                                            <X className="h-4 w-4 text-gray-600" />
                                            <span>Dismissed - No issue found</span>
                                        </div>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <label className="text-sm font-medium mb-2 block">Notes (optional)</label>
                            <Textarea
                                value={reviewNote}
                                onChange={(e) => setReviewNote(e.target.value)}
                                placeholder="Add any notes about this review..."
                                rows={3}
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setSelectedReport(null)}>
                            Cancel
                        </Button>
                        <Button onClick={handleReview}>
                            Complete Review
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
