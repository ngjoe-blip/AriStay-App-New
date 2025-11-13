import { registerAs } from '@nestjs/config';

export default registerAs('storage', () => ({
  uploadDir: process.env.UPLOAD_DIR || '/uploads',
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760', 10), // 10MB
  allowedMimeTypes: (process.env.ALLOWED_MIME_TYPES || 'image/jpeg,image/png,image/gif,image/webp').split(','),
  fileRetentionDays: parseInt(process.env.FILE_RETENTION_DAYS || '365', 10),
  enableImageCompression: process.env.ENABLE_IMAGE_COMPRESSION === 'true',
}));
