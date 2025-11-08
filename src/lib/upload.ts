import { upload } from '@devvai/devv-code-backend';

/**
 * Upload a file to Devv cloud storage
 * @param file - Browser File object
 * @returns Upload result with file URL or error
 */
export const uploadFile = async (file: File) => {
    try {
        const result = await upload.uploadFile(file);

        if (upload.isErrorResponse(result)) {
            throw new Error(result.errMsg || 'Upload failed');
        }

        return {
            success: true,
            url: result.link,
            filename: result.filename,
        };
    } catch (error: any) {
        return {
            success: false,
            error: error.message || 'Upload failed',
        };
    }
};

/**
 * Validate file before upload
 * @param file - File to validate
 * @param maxSizeMB - Maximum file size in MB (default: 10MB)
 * @param allowedTypes - Allowed MIME types (default: all)
 */
export const validateFile = (
    file: File,
    maxSizeMB: number = 10,
    allowedTypes?: string[]
): { valid: boolean; error?: string } => {
    // Check file size
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
        return {
            valid: false,
            error: `File size exceeds ${maxSizeMB}MB limit`,
        };
    }

    // Check file type
    if (allowedTypes && !allowedTypes.includes(file.type)) {
        return {
            valid: false,
            error: `File type ${file.type} is not allowed`,
        };
    }

    return { valid: true };
};
