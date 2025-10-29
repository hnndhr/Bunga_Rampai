// src/modules/auth/auth.controller.ts
import { Controller, Post, Body, Req } from '@nestjs/common';
import { AuthService } from './auth.services.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: any, @Req() req: any) {
    const { username, password } = body;
    const ip =
      req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      'unknown';

    return this.authService.login(username, password, ip);
  }
}
