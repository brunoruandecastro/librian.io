export class AuthDto {
  accessToken: string;
  user: {
    id: string;
    email: string;
    name?: string;
    picture?: string;
  };
}
