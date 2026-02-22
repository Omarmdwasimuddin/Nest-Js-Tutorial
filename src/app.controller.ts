import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Throttle } from '@nestjs/throttler';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Throttle({
    ShortTermThrottler: {
      limit: 3, ttl: 60000,
    }
  })
  getHello(): string {
    //return this.appService.getHello();
    return 'This is a rate-limit route!'
  }
}
