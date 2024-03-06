import { Module } from '@nestjs/common';

import { AppConfigModule } from '@/@core/app-config';

import { RedisProvider } from './redis.provider';
import { RedisRepository } from './redis.repository';
import { RedisService } from './redis.service';
import { LoggerModule } from '@/logger/logger.module';

@Module({
  imports: [AppConfigModule, LoggerModule],
  controllers: [],
  providers: [RedisProvider, RedisRepository, RedisService],
  exports: [RedisService],
})
export class RedisModule {}
