import {Button} from '@/components/ui/button.tsx';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import {useMemo} from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

function StartupPagination({currentPage, totalPages, onPageChange}: PaginationProps) {
    const pages = useMemo(() => Array.from({length: totalPages}, (_, i) => i + 1), [totalPages]);

    return (
        <div className="flex items-center justify-center gap-2 mt-8 pb-8">
            <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="gap-1"
            >
                <ChevronLeft className="w-4 h-4"/>
                Previous
            </Button>

            <div className="flex items-center gap-1">
                {pages.map((page) => (
                    <Button
                        key={page}
                        variant={currentPage === page ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => onPageChange(page)}
                        className="w-10 h-10 p-0"
                    >
                        {page}
                    </Button>
                ))}
            </div>

            <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="gap-1"
            >
                Next
                <ChevronRight className="w-4 h-4"/>
            </Button>
        </div>
    );
}

export default StartupPagination;
