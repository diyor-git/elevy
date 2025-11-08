import { useState, useRef } from 'react';
import { uploadFile, validateFile } from '@/lib/upload';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Upload, File, X, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploadZoneProps {
  onUploadSuccess?: (url: string, filename?: string) => void;
  onUploadError?: (error: string) => void;
  maxSizeMB?: number;
  allowedTypes?: string[];
  className?: string;
}

export const FileUploadZone = ({
  onUploadSuccess,
  onUploadError,
  maxSizeMB = 10,
  allowedTypes,
  className,
}: FileUploadZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<{
    name: string;
    url: string;
    status: 'success' | 'error';
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = async (file: File) => {
    // Validate file
    const validation = validateFile(file, maxSizeMB, allowedTypes);
    if (!validation.valid) {
      toast({
        title: 'Invalid File',
        description: validation.error,
        variant: 'destructive',
      });
      onUploadError?.(validation.error || 'Invalid file');
      return;
    }

    // Upload file
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate progress (since actual SDK doesn't provide progress)
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    try {
      const result = await uploadFile(file);

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (result.success && result.url) {
        setUploadedFile({
          name: result.filename || file.name,
          url: result.url,
          status: 'success',
        });

        toast({
          title: 'Upload Successful',
          description: `${file.name} has been uploaded.`,
        });

        onUploadSuccess?.(result.url, result.filename);
      } else {
        throw new Error(result.error || 'Upload failed');
      }
    } catch (error: any) {
      clearInterval(progressInterval);
      setUploadedFile({
        name: file.name,
        url: '',
        status: 'error',
      });

      toast({
        title: 'Upload Failed',
        description: error.message || 'Failed to upload file.',
        variant: 'destructive',
      });

      onUploadError?.(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleClear = () => {
    setUploadedFile(null);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card className={cn('border-2 border-dashed', className)}>
      <CardContent className="p-6">
        {!uploadedFile ? (
          <div
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={cn(
              'flex flex-col items-center justify-center py-8 px-4 rounded-lg transition-colors',
              isDragging && 'bg-blue-50 border-blue-300',
              isUploading && 'opacity-50 pointer-events-none'
            )}
          >
            <Upload
              className={cn(
                'w-12 h-12 mb-4 transition-colors',
                isDragging ? 'text-blue-500' : 'text-gray-400'
              )}
            />

            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {isUploading ? 'Uploading...' : 'Upload a file'}
            </h3>

            <p className="text-sm text-gray-500 text-center mb-4">
              Drag and drop your file here, or click to browse
            </p>

            <input
              ref={fileInputRef}
              type="file"
              onChange={handleInputChange}
              className="hidden"
              disabled={isUploading}
              accept={allowedTypes?.join(',')}
            />

            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              variant={isDragging ? 'default' : 'outline'}
            >
              Select File
            </Button>

            {isUploading && (
              <div className="w-full mt-6">
                <Progress value={uploadProgress} className="h-2" />
                <p className="text-xs text-gray-500 text-center mt-2">{uploadProgress}% complete</p>
              </div>
            )}

            <p className="text-xs text-gray-400 mt-4">
              Max file size: {maxSizeMB}MB
              {allowedTypes && ` • Allowed types: ${allowedTypes.join(', ')}`}
            </p>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <div
              className={cn(
                'flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center',
                uploadedFile.status === 'success' ? 'bg-green-100' : 'bg-red-100'
              )}
            >
              {uploadedFile.status === 'success' ? (
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              ) : (
                <AlertCircle className="w-6 h-6 text-red-600" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">{uploadedFile.name}</p>
              <p className="text-sm text-gray-500">
                {uploadedFile.status === 'success' ? 'Upload successful' : 'Upload failed'}
              </p>
              {uploadedFile.url && (
                <a
                  href={uploadedFile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:underline"
                >
                  View file
                </a>
              )}
            </div>

            <Button variant="ghost" size="sm" onClick={handleClear}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
