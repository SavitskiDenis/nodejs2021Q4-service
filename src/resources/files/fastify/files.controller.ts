import { Controller, Get, HttpCode, NotFoundException, Param, Post, StreamableFile, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { createReadStream, existsSync } from 'fs';
import { diskStorage } from 'multer';
import { join } from 'path';
import { FileFastifyInterceptor } from 'fastify-file-interceptor';
import config from '../../../common/config';
import { AuthGuard } from '../../../common/authentification';
import HTTP_CODES from '../../../common/http_codes';

@Controller('file')
@UseGuards(AuthGuard)
@UseInterceptors(FileFastifyInterceptor('file', {
  storage: diskStorage({
    destination: config.UPLOADS_PATH,
    filename: (_, file, cb) => {
        const splitedOrigin = file.originalname.split('.')
        cb(null, `${Date.now()}.${splitedOrigin[splitedOrigin.length - 1]}`)
    }
  })
}))
export class FilesController {
  @Post('/')
  @HttpCode(HTTP_CODES.CODE_OK)
  uploadFile(@UploadedFile() file: Express.Multer.File): string {
    return `File saved with name ${file.filename}`;
  }

  @Get('/:fileName')
  @HttpCode(200)
  getFileByName(@Param('fileName') fileName: string) {
    const filePath = join(config.UPLOADS_PATH, fileName);
    if (!existsSync(filePath)) {
      throw new NotFoundException(`Not found file ${fileName}`);
    }

    const file = createReadStream(join('uploads/', fileName));
    return new StreamableFile(file);
  }
}
