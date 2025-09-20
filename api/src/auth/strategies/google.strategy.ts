import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
      scope: ['email', 'profile'],
      passReqToCallback: false,
    });
  }
  authenticate(req: any, options?: any) {
    const customOptions = {
      ...options,
      prompt: 'select_account',
      access_type: 'offline'
    };
    return super.authenticate(req, customOptions);
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, emails, name, photos } = profile;
    const user = await this.authService.validateUser(emails[0].value, id);

    if (!user.name || !user.picture) {
      const userData = {
        name: name?.givenName,
        picture: photos[0]?.value,
      };
      await this.authService.updateUser(user.id, userData);
    }

    done(null, user);
  }
}
