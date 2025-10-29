import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis'; // Tetap gunakan import default

@Global()
@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        // Karena kamu pakai NodeNext (ESM), kita perlu akses constructor-nya secara eksplisit
        const RedisClient = (Redis as any).default || Redis;

        const client = new RedisClient({
          host: configService.get<string>('REDIS_HOST') || '127.0.0.1',
          port: configService.get<number>('REDIS_PORT') || 6379,
        });

        client.on('connect', () => console.log('✅ Redis connected'));
        client.on('error', (err: any) => console.error('❌ Redis error', err));

        return client;
      },
    },
  ],
  exports: ['REDIS_CLIENT'],
})
export class RedisModule {}
