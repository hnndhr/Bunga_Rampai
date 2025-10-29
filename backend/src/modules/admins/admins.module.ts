// src/modules/admins/admins.module.ts
import { forwardRef, Module } from '@nestjs/common';
import { AdminsController } from './admins.controller.js';
import { AdminsService } from './admins.service.js';
import { SupabaseService } from '../../common/supabase.service.js';
import { AuthModule } from '../auth/auth.module.js';
import { JwtModule } from '@nestjs/jwt';
import { LimiterModule } from '../../common/limiter.module.js'; // ✅ import LimiterModule

@Module({
  controllers: [AdminsController],
  providers: [AdminsService, SupabaseService],
  imports: [
    forwardRef(() => AuthModule),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'DEV SECRET',
      signOptions: { expiresIn: '1d' },
    }),
    LimiterModule, // ✅ tambahkan LimiterModule di sini
  ],
  exports: [AdminsService],
})
export class AdminsModule {}
