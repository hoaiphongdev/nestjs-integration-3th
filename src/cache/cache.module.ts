import { Module } from '@nestjs/common';

// TODO [LOGGER] import logger for cache
// import { LoggerModule } from '@/logger/logger.module';
import { RedisModule } from '@/redis/redis.module';

import { CacheRepository } from './cache.repository';
import { CacheService } from './cache.service';

@Module({
  imports: [RedisModule],
  controllers: [],
  providers: [CacheRepository, CacheService],
  exports: [CacheService],
})
export class CacheModule {}
