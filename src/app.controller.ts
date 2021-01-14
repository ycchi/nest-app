import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('')
export class AppController {
  @Get()
  home() {
    return 'Welcome to Movie API';
  }

  @Get('test')
  @UseGuards(AuthGuard('jwt'))
  test() {
    return 'auth guard working';
  }
}
