import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Inicia o fluxo de autenticação do Google
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    try {
      console.log('Callback recebido:', req.user);
      console.log('FRONTEND_URL:', process.env.FRONTEND_URL);
      
      const { accessToken } = await this.authService.login(req.user);
      
      // Usar a variável de ambiente para consistência
      const redirectUrl = `${process.env.FRONTEND_URL}/auth/callback?token=${accessToken}`;
      console.log('Redirecionando para:', redirectUrl);
      
      return res.redirect(redirectUrl);
    } catch (error) {
      console.error('Erro no callback do Google:', error);
      return res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);
    }
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Req() req) {
    return req.user;
  }
}
