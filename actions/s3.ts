'use server';

import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import {
  s3Client,
  S3_BUCKET_NAME,
  PRESIGNED_URL_EXPIRES_IN,
  validateImageUpload,
  generateS3Key,
  getPublicUrl,
} from '@/lib/s3';

export type GetPresignedUrlInput = {
  filename: string;
  contentType: string;
  fileSize: number;
  userId?: string;
};

export type GetPresignedUrlResult = {
  success: boolean;
  uploadUrl?: string;
  publicUrl?: string;
  imageKey?: string;
  error?: string;
};

/**
 * Server Action: getPresignedUrlAction
 * Validates the file payload and issues a temporary signed S3 PUT URL for direct browser-to-S3 uploads.
 */
export async function getPresignedUrlAction(
  input: GetPresignedUrlInput
): Promise<GetPresignedUrlResult> {
  try {
    if (!input || !input.filename || !input.contentType || typeof input.fileSize !== 'number') {
      return {
        success: false,
        error: 'Invalid input parameters. Filename, contentType, and fileSize are required.',
      };
    }

    // 1. Enforce MIME type and size boundaries
    const validation = validateImageUpload(input.contentType, input.fileSize);
    if (!validation.valid) {
      return {
        success: false,
        error: validation.error ?? 'File validation failed.',
      };
    }

    // 2. Generate unique S3 object key adhering to path convention: pins/${userId}/${uuid}.${ext}
    const targetUserId = input.userId || 'guest';
    const imageKey = generateS3Key(targetUserId, input.filename);

    // 3. Create PutObjectCommand and presigned upload URL
    const command = new PutObjectCommand({
      Bucket: S3_BUCKET_NAME,
      Key: imageKey,
      ContentType: input.contentType,
    });

    const uploadUrl = await getSignedUrl(s3Client, command, {
      expiresIn: PRESIGNED_URL_EXPIRES_IN,
    });

    // 4. Compute the accessible public URL
    const publicUrl = getPublicUrl(imageKey);

    return {
      success: true,
      uploadUrl,
      publicUrl,
      imageKey,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to generate S3 upload authorization.';
    return {
      success: false,
      error: message,
    };
  }
}
