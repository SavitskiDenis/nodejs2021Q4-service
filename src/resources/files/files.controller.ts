import { Controller, Get, HttpCode, NotFoundException, Param, Post, StreamableFile, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream, existsSync } from 'fs';
import { join } from 'path';
import HTTP_CODES from '../../common/http_codes';

@Controller('file')
@UseInterceptors(FileInterceptor('file', { dest: 'uploads/' }))
export class FilesController {
  @Post('/')
  @HttpCode(HTTP_CODES.CODE_OK)
  uploadFile(@UploadedFile() file: Express.Multer.File): string {
    return `File save with name ${file.filename}`;
  }

  @Get('/:fileName')
  @HttpCode(200)
  getFileByName(@Param('fileName') fileName: string) {
    const filePath = join('uploads/', fileName);
    if (!existsSync(filePath)) {
      throw new NotFoundException(`Not found file ${fileName}`);
    }

    const file = createReadStream(join('uploads/', fileName));
    return new StreamableFile(file);
  }
}
