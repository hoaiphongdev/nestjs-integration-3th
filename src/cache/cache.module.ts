import { Module } from '@nestjs/common';

import { LoggerModule } from '@/logger/logger.module';
import { RedisModule } from '@/redis/redis.module';

import { CacheRepository } from './cache.repository';
import { CacheService } from './cache.service';

@Module({
  imports: [RedisModule, LoggerModule],
  controllers: [],
  providers: [CacheRepository, CacheService],
  exports: [CacheService],
})
export class CacheModule {}
