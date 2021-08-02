import { Controller, Body, Post, UseGuards, Request, Res, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserDto } from '../users/dto/user.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Res() response: Response,@Body() user) {
        const res = await this.authService.login(user);
        if(res === null){
            response.status(HttpStatus.UNAUTHORIZED).send("Unauthorized")
        }else{
            response.status(HttpStatus.OK).send(res)
        }
    }

    @Post('signup')
    async signUp(@Body() user: UserDto) {
        return await this.authService.create(user);
    }
}