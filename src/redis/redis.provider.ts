import { FactoryProvider } from '@nestjs/common';
import { createClient } from 'redis';
import { REDIS_PROVIDER_NAME } from './constants';
import { AppConfigService } from '@/@core/app-config';
import { LoggerService } from '@/logger/logger.service';
import { LoggerErrorScope } from '@/logger/logger.constant';

export const RedisProvider: FactoryProvider<ReturnType<typeof createClient>> = {
  provide: REDIS_PROVIDER_NAME,
  inject: [AppConfigService, LoggerService],
  useFactory: (appConfigService: AppConfigService, loggerService: LoggerService) => {
    const redisClient = createClient({ url: appConfigService.redis.redisUrl })
      .on('error', (e) => {
        loggerService.error({ message: 'Redis connection failed', err: e, scope: LoggerErrorScope.RedisError });
      })
      .connect();
    return redisClient;
  },
};
