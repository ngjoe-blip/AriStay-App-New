import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs-extra';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FilesService {
  constructor(private configService: ConfigService) {}

  async uploadFile(file: Express.Multer.File, category: string, id: string): Promise<any> {
    // Validate file
    const uploadDir = this.configService.get('storage.uploadDir');
    const allowedMimeTypes = this.configService.get('storage.allowedMimeTypes');
    const maxFileSize = this.configService.get('storage.maxFileSize');

    if (!file) {
      throw new BadRequestException('No file provided');
    }

    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(`File type not allowed. Allowed types: ${allowedMimeTypes.join(', ')}`);
    }

    if (file.size > maxFileSize) {
      throw new BadRequestException(`File size exceeds maximum allowed size of ${maxFileSize / 1024 / 1024}MB`);
    }

    // Create directory structure
    const categoryPath = path.join(uploadDir, category, id);
    await fs.ensureDir(categoryPath);

    // Generate unique filename
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    const filename = `${uuidv4()}-${timestamp}${ext}`;
    const filepath = path.join(categoryPath, filename);

    // Save file
    await fs.writeFile(filepath, file.buffer);

    return {
      filename,
      path: `/uploads/${category}/${id}/${filename}`,
      size: file.size,
      mimetype: file.mimetype,
      uploadedAt: new Date(),
    };
  }

  async getFile(category: string, id: string, filename: string): Promise<Buffer> {
    const uploadDir = this.configService.get('storage.uploadDir');
    const filepath = path.join(uploadDir, category, id, filename);

    // Security: Prevent directory traversal
    const normalizedPath = path.normalize(filepath);
    const normalizedBase = path.normalize(uploadDir);
    if (!normalizedPath.startsWith(normalizedBase)) {
      throw new BadRequestException('Invalid file path');
    }

    if (!fs.existsSync(filepath)) {
      throw new BadRequestException('File not found');
    }

    return fs.readFile(filepath);
  }

  async deleteFile(category: string, id: string, filename: string): Promise<void> {
    const uploadDir = this.configService.get('storage.uploadDir');
    const filepath = path.join(uploadDir, category, id, filename);

    if (!fs.existsSync(filepath)) {
      throw new BadRequestException('File not found');
    }

    await fs.remove(filepath);
  }

  async listFiles(category: string, id: string): Promise<any[]> {
    const uploadDir = this.configService.get('storage.uploadDir');
    const categoryPath = path.join(uploadDir, category, id);

    if (!fs.existsSync(categoryPath)) {
      return [];
    }

    const files = await fs.readdir(categoryPath);
    return files.map((filename) => ({
      filename,
      path: `/uploads/${category}/${id}/${filename}`,
    }));
  }
}
