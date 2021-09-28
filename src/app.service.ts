import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Microservice for Mangement of Office and HR Details. Powered by NestJS';
  }
}
