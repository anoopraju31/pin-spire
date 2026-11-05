# Phase 1 Specification: AWS S3 Media Storage & Presigned URLs

## 1. Direct-to-S3 Upload Architecture

To maximize upload speeds and eliminate serverless request payload limits (e.g. Vercel's 4.5MB limit), media uploads bypass the Next.js server entirely.

```
┌───────────┐                                 ┌──────────────────┐                               ┌────────────┐
│  Browser  │                                 │  Next.js Server  │                               │   AWS S3   │
└─────┬─────┘                                 └────────┬─────────┘                               └─────┬──────┘
      │                                                │                                               │
      │ 1. Request presigned URL (filename, type, size)│                                               │
      │───────────────────────────────────────────────>│                                               │
      │                                                │ 2. Validate auth session & file type/size     │
      │                                                │    Generate signed S3 PutObject URL           │
      │                                                │                                               │
      │ 3. Returns { uploadUrl, publicUrl, imageKey }  │                                               │
      │<───────────────────────────────────────────────│                                               │
      │                                                                                                │
      │ 4. Direct HTTP PUT upload binary (progress 0% -> 100%)                                         │
      │───────────────────────────────────────────────────────────────────────────────────────────────>│
      │                                                                                                │
      │ 5. HTTP 200 OK                                                                                 │
      │<───────────────────────────────────────────────────────────────────────────────────────────────│
      │                                                │                                               │
      │ 6. Submit Post Form with { imageUrl, imageKey }│                                               │
      │───────────────────────────────────────────────>│                                               │
      │                                                │ 7. Save Post record in PostgreSQL             │
      │ 8. Success: Redirect to /posts/:id             │                                               │
      │<───────────────────────────────────────────────│                                               │
```

---

## 2. Security & Validation Rules

- **Allowed MIME Types**: `image/jpeg`, `image/png`, `image/webp`.
- **Maximum File Size**: `10MB` (10,485,760 bytes).
- **URL Expiration**: Presigned upload URLs expire after `60 seconds`.
- **Object Key Path Convention**: `pins/${userId}/${cuid()}.${extension}`.
- **Access Control**: S3 bucket is configured with private writes (via signed URLs) and public reads (or CloudFront CDN distribution).

---

## 3. Server Action Contract: `getPresignedUrlAction`

```typescript
export type GetPresignedUrlInput = {
  filename: string;
  contentType: string;
  fileSize: number;
};

export type GetPresignedUrlResult = {
  success: boolean;
  uploadUrl?: string;
  publicUrl?: string;
  imageKey?: string;
  error?: string;
};
```

---

## 4. Environment Variables Required

```bash
# AWS S3 Configuration
AWS_REGION="us-east-1"
AWS_ACCESS_KEY_ID="your-access-key-id"
AWS_SECRET_ACCESS_KEY="your-secret-access-key"
AWS_S3_BUCKET_NAME="pin-spire-uploads"

# Optional CloudFront or custom CDN domain
# NEXT_PUBLIC_IMAGE_CDN_URL="https://cdn.pinspire.com"
```

---

## 5. Step 3 Execution & Tracking Checklist

- [ ] **Step 3: AWS S3 Presigned URL Media Storage**
  - [x] **Sub-step 3.1**: Install AWS S3 SDK (`@aws-sdk/client-s3`, `@aws-sdk/s3-request-presigner`)
  - [x] **Sub-step 3.2**: Create S3 client configuration and validation helpers in `lib/s3.ts`
  - [ ] **Sub-step 3.3**: Implement Server Action `getPresignedUrlAction` in `actions/s3.ts`
