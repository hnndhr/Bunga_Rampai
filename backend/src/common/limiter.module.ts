// src/common/limiter.module.ts
import { Module } from '@nestjs/common';
import { LimiterService } from './limiter.service.js';

@Module({
  providers: [LimiterService],
  exports: [LimiterService],
})
export class LimiterModule {}
