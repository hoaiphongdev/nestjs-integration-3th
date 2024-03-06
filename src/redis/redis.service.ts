import { Inject, Injectable } from '@nestjs/common';
import { RedisRepository } from './redis.repository';

@Injectable()
export class RedisService {
  constructor(@Inject(RedisRepository) private readonly redisRepository: RedisRepository) {}

  async get(key: string): Promise<string | null> {
    return await this.redisRepository.get(key);
  }

  async set(key: string, value: string): Promise<void> {
    await this.redisRepository.set(key, value);
  }

  async setWithExpire(key: string, value: string, expire: number): Promise<void> {
    await this.redisRepository.setWithExpire(key, value, expire);
  }

  async del(key: string): Promise<void> {
    await this.redisRepository.del(key);
  }
}
