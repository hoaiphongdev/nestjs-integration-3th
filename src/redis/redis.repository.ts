import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { InjectRedis } from './decorators/redis.decorator';
import { RedisClientType } from 'redis';

@Injectable()
export class RedisRepository implements OnModuleDestroy {
  constructor(@InjectRedis() private readonly redisClient: RedisClientType) {}

  async onModuleDestroy(): Promise<void> {
    await this.redisClient.disconnect();
  }

  async get(key: string): Promise<string | null> {
    return await this.redisClient.get(key);
  }

  async set(key: string, value: string): Promise<void> {
    await this.redisClient.set(key, value);
  }

  async setExpire(key: string, expireTime: number): Promise<void> {
    await this.redisClient.expire(key, expireTime);
  }

  async setWithExpire(key: string, value: string, expireTime: number) {
    await this.set(key, value);
    await this.setExpire(key, expireTime);
  }

  async del(key: string): Promise<void> {
    await this.redisClient.del(key);
  }
}
