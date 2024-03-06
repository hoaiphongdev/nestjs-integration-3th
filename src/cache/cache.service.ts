import { Injectable } from '@nestjs/common';

import { CacheRepository } from './cache.repository';

@Injectable()
export class CacheService {
  constructor(private readonly cacheRepository: CacheRepository) {}

  async getCache(key: string): Promise<{ cacheHit: boolean; data?: Record<string, any> }> {
    return this.cacheRepository.getCache(key);
  }

  async setCache(key: string, data: string): Promise<void> {
    return this.cacheRepository.setCache(key, data);
  }

  async setCacheWithExpire(key: string, data: string, expire: number): Promise<void> {
    return this.cacheRepository.setCacheWithExpire(key, data, expire);
  }

  async del(key: string) {
    return this.cacheRepository.del(key);
  }
}
