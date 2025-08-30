import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('stats')
  @UseGuards(JwtAuthGuard)
  async getUserStats(@CurrentUser() user: User) {
    return this.userService.getUserStats(user.id);
  }
}