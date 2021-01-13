import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [MoviesModule, AuthenticationModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
