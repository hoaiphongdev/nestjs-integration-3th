import { Module } from '@nestjs/common';

// TODO [LOGGER] import logger for redis

import { AppConfigModule } from '@/@core/app-config';

import { RedisProvider } from './redis.provider';
import { RedisRepository } from './redis.repository';
import { RedisService } from './redis.service';

@Module({
  imports: [AppConfigModule, ],
  controllers: [],
  providers: [RedisProvider, RedisRepository, RedisService],
  exports: [RedisService],
})
export class RedisModule {}
