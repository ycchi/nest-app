import { Module } from '@nestjs/common';
import { GoogleService } from './google/google.service';
import { GoogleStrategy } from './google/google.strategy';
import { AuthenticationController } from './authentication.controller';

@Module({
  imports: [],
  controllers: [AuthenticationController],
  providers: [GoogleService, GoogleStrategy],
})
export class AuthenticationModule {}
