import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import type { Redis } from 'ioredis'; // ✅ hanya import tipe

@Injectable()
export class LimiterService {
  private rateLimiter: RateLimiterRedis;

  constructor(@Inject('REDIS_CLIENT') private readonly redisClient: Redis) {
    this.rateLimiter = new RateLimiterRedis({
      storeClient: this.redisClient,
      keyPrefix: 'login_fail',
      points: 10,
      duration: 900,
      blockDuration: 900,
    });
  }

  async checkLoginAttempt(username: string, ip: string) {
    const key = `${username}:${ip}`;
    try {
      await this.rateLimiter.consume(key);
    } catch {
      throw new HttpException(
        'Terlalu banyak percobaan login. Tunggu 15 menit.',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    await this.redisClient.hset(
      `login_logs:${username}`,
      Date.now().toString(),
      JSON.stringify({ ip, time: new Date().toISOString() }),
    );
  }

  async resetLoginAttempt(username: string, ip: string) {
    await this.rateLimiter.delete(`${username}:${ip}`);
  }

  async getLoginLogs(username: string) {
    const logs = await this.redisClient.hgetall(`login_logs:${username}`);
    return Object.values(logs as Record<string, string>).map((v) =>
      JSON.parse(v),
    );
  }
}
