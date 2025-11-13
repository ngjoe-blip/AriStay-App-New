import { Controller, Post, Get, Delete, Param, UseInterceptors, UploadedFile, BadRequestException, Res, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import { FilesService } from './files.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('files')
@UseGuards(JwtAuthGuard)
export class FilesController {
  constructor(private filesService: FilesService) {}

  @Post('upload/:category/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('category') category: string,
    @Param('id') id: string,
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    return this.filesService.uploadFile(file, category, id);
  }

  @Get(':category/:id/:filename')
  async getFile(
    @Param('category') category: string,
    @Param('id') id: string,
    @Param('filename') filename: string,
    @Res() res: Response,
  ) {
    const buffer = await this.filesService.getFile(category, id, filename);
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(buffer);
  }

  @Delete(':category/:id/:filename')
  async deleteFile(
    @Param('category') category: string,
    @Param('id') id: string,
    @Param('filename') filename: string,
  ) {
    await this.filesService.deleteFile(category, id, filename);
    return { message: 'File deleted successfully' };
  }

  @Get('list/:category/:id')
  async listFiles(
    @Param('category') category: string,
    @Param('id') id: string,
  ) {
    return this.filesService.listFiles(category, id);
  }
}
