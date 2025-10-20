import { Module } from '@nestjs/common';
import { SupabaseService } from './common/supabase.service';
import { TestController } from './test.controller';

@Module({
  imports: [],
  providers: [SupabaseService],
  exports: [SupabaseService],
  controllers: [TestController]
})
export class AppModule {}
