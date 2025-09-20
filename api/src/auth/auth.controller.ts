import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    try {
      const { accessToken } = await this.authService.login(req.user);

      const redirectUrl = `${process.env.FRONTEND_URL}/auth/callback?token=${accessToken}`;
      
      return res.redirect(redirectUrl);
    } catch (error) {
      return res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);
    }
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Req() req) {
    return req.user;
  }
}
