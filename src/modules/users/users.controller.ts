import { Controller, Body, Post, Res, HttpStatus, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { diskStorage } from 'multer';
import { Helper } from 'src/utils/fileupload';

@Controller('users')
export class UsersController {

    @Post('uploads')
    @UseInterceptors(
      FileInterceptor('file', {
        storage: diskStorage({
          destination: Helper.destinationPath,
          filename: Helper.customFileName,
        }),
      }),
    )
    async uploadedFile(@UploadedFile() file) {
     console.log(file)
    }
}
