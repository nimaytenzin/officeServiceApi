import { Controller, Body, Post, Res, HttpStatus, UseInterceptors, UploadedFile } from '@nestjs/common';

import { AuthService } from './auth.service';
import { UserDto } from '../users/dto/user.dto';
import { Response } from 'express';
import { Observable, of } from 'rxjs';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';


const storage = {
    storage: diskStorage({
        destination: './uploads/profileImages',
        filename: (req, file, cb) => {
            const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
            const extension: string = path.parse(file.originalname).ext;

            cb(null, `${filename}${extension}`);
        }
    })
}

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async login(@Res() response: Response, @Body() user) {
        const res = await this.authService.login(user);
        if (res === null) {
            response.status(HttpStatus.UNAUTHORIZED).send("Unauthorized")
        } else {
            response.status(HttpStatus.OK).send(res)
        }
    }

    @Post('signup')
    async signUp(@Body() user: UserDto) {
        return await this.authService.create(user);
    }

    @Post('uploadProfile')
    @UseInterceptors(FileInterceptor('file', storage))
    uploadProfile(@UploadedFile() file): Observable<Object> {
        console.log(file)
        return of({ imagePath: file.path })
    }


    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        console.log("ok")
        console.log(file);
    }
}