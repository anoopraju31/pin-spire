import { S3Client } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

// -----------------------------------------------------------------------------
// S3 Client Configuration
// -----------------------------------------------------------------------------

export const AWS_REGION = process.env.AWS_REGION || 'us-east-1';
export const S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME || 'pin-spire-uploads';

export const s3Client = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

// -----------------------------------------------------------------------------
// Constraints & Validation Constants
// -----------------------------------------------------------------------------

export const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
] as const;

export type AllowedMimeType = (typeof ALLOWED_MIME_TYPES)[number];

export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB
export const PRESIGNED_URL_EXPIRES_IN = 60; // 60 seconds

// -----------------------------------------------------------------------------
// Helpers & Validation Utilities
// -----------------------------------------------------------------------------

export function validateImageUpload(
  contentType: string,
  fileSize: number
): { valid: boolean; error?: string } {
  if (!ALLOWED_MIME_TYPES.includes(contentType as AllowedMimeType)) {
    return {
      valid: false,
      error: `Invalid file format: "${contentType}". Supported formats are JPEG, PNG, and WebP.`,
    };
  }

  if (fileSize > MAX_FILE_SIZE_BYTES) {
    return {
      valid: false,
      error: `File size exceeds the 10MB limit (received ${(fileSize / (1024 * 1024)).toFixed(2)}MB).`,
    };
  }

  if (fileSize <= 0) {
    return {
      valid: false,
      error: 'File size must be greater than 0 bytes.',
    };
  }

  return { valid: true };
}

export function getFileExtension(filename: string): string {
  const parts = filename.split('.');
  if (parts.length > 1) {
    const ext = parts.pop()?.toLowerCase();
    if (ext === 'jpeg' || ext === 'jpg') return 'jpg';
    if (ext === 'png') return 'png';
    if (ext === 'webp') return 'webp';
  }
  return 'jpg';
}

export function generateS3Key(userId: string, filename: string): string {
  const ext = getFileExtension(filename);
  const id = uuidv4();
  return `pins/${userId}/${id}.${ext}`;
}

export function getPublicUrl(key: string): string {
  const cdnUrl = process.env.NEXT_PUBLIC_IMAGE_CDN_URL?.replace(/\/$/, '');
  if (cdnUrl) {
    return `${cdnUrl}/${key}`;
  }
  return `https://${S3_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${key}`;
}
