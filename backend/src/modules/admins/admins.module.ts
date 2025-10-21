    // src/modules/admins/admins.module.ts
import { Module } from '@nestjs/common';
import { AdminsController } from './admins.controller.js';
import { AdminsService } from './admins.service.js';
import { SupabaseService } from '../../common/supabase.service.js';

@Module({
  controllers: [AdminsController],
  providers: [AdminsService, SupabaseService],
})
export class AdminsModule {}
