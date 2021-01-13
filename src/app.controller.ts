import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// import { JwtAuthGuard } from './authentication/google/jwt-auth-google.guard';

@Controller('')
export class AppController {
  @Get()
  home() {
    return 'Welcome to Movie API';
  }

  @Get('test')
  @UseGuards(AuthGuard('google'))
  test() {
    return 'auth successful';
  }
}
