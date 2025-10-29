// src/modules/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AdminsService } from '../admins/admins.service.js';
import { SupabaseService } from '../../common/supabase.service.js';
import { LimiterService } from '../../common/limiter.service.js';

@Injectable()
export class AuthService {
  constructor(
    private adminsService: AdminsService,
    private jwtService: JwtService,
    private supabaseService: SupabaseService,
    private limiterService: LimiterService,
  ) {}

  async login(username: string, password: string, ip: string) {
    // 🔒 Cek apakah user sudah melewati limit login
    await this.limiterService.checkLoginAttempt(username, ip);

    const admin = await this.validateUser(username, password);

    // Jika berhasil login → reset counter
    await this.limiterService.resetLoginAttempt(username, ip);

    const payload = {
      id: admin.id,
      username: admin.username,
      name: admin.name,
      role: admin.role,
    };

    const token = this.jwtService.sign(payload);
    return { token };
  }

  async validateUser(username: string, password: string) {
    const supabase = this.supabaseService.client;
    const { data: user, error } = await supabase
      .from('admins')
      .select('*')
      .eq('username', username)
      .single();

    if (error || !user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Invalid username or password');
    }

    return user;
  }
}
