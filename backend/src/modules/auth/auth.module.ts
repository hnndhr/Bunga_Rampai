// src/modules/auth/auth.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller.js';
import { JwtStrategy } from './jwt.strategy.js';
import { AuthService } from './auth.services.js';
import { AdminsModule } from '../admins/admins.module.js';
import { SupabaseModule } from '../../common/supabase.module.js';
import { LimiterService } from '../../common/limiter.service.js';
import { RedisModule } from '../../common/redis.module.js';

@Module({
  imports: [
    forwardRef(() => AdminsModule),
    SupabaseModule,
    PassportModule,
    RedisModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'supersecretkey',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, JwtStrategy, LimiterService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
