import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // ✅ tambah ini
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { TestController } from './test.controller.js';
import { SupabaseService } from './common/supabase.service.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }) // ✅ aktifkan .env
  ],
  controllers: [AppController, TestController],
  providers: [AppService, SupabaseService],
})
export class AppModule {}
