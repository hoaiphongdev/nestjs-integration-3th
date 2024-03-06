import { LoggerErrorScope } from '@/logger/logger.constant';
import { LoggerService } from '@/logger/logger.service';
import { RedisService } from '@/redis';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CacheRepository {
  constructor(
    private readonly redisService: RedisService,
    private readonly loggerService: LoggerService
  ) {}

  async getCache(key: string): Promise<{ cacheHit: boolean; data?: Record<string, any> }> {
    try {
      const cachedData = await this.redisService.get(key);
      if (cachedData) {
        return {
          cacheHit: true,
          data: JSON.parse(cachedData),
        };
      }
    } catch (error) {
      this.loggerService.error({
        message: 'Error while getting cache data',
        err: error,
        scope: LoggerErrorScope.CacheDataError,
      });
    }
    return { cacheHit: false };
  }

  async setCache(key: string, data: string): Promise<void> {
    try {
      await this.redisService.set(key, data);
    } catch (error) {
      this.loggerService.error({
        message: 'Error while getting cache data',
        err: error,
        scope: LoggerErrorScope.CacheDataError,
      });
    }
  }

  async setCacheWithExpire(key: string, data: string, expire: number): Promise<void> {
    try {
      await this.redisService.setWithExpire(key, data, expire);
    } catch (error) {
      this.loggerService.error({
        message: 'Error while getting cache data with expire',
        err: error,
        scope: LoggerErrorScope.CacheDataError,
      });
    }
  }

  async del(key: string) {
    try {
      await this.redisService.del(key);
    } catch (error) {
      this.loggerService.error({
        message: 'Error while deleting cache data with pattern',
        err: error,
        scope: LoggerErrorScope.CacheDataError,
      });
    }
  }
}
