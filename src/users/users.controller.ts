import { Controller, Get, Param } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('all')
  getAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('/:id')
  getOne(@Param('id') userId: string): Promise<User> {
    return this.usersService.findOne(userId);
  }
}
