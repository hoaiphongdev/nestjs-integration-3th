import { FactoryProvider } from '@nestjs/common';
import { createClient } from 'redis';
import { REDIS_PROVIDER_NAME } from './constants';
import { AppConfigModule, AppConfigService } from '@/@core/app-config';
// import { LoggerService } from '@/logger/logger.service';

// TODO [LOGGER] import logger for reids
export const RedisProvider: FactoryProvider<ReturnType<typeof createClient>> = {
  provide: REDIS_PROVIDER_NAME,
  inject: [
    AppConfigService,
    // LoggerService
  ],
  useFactory: (appConfigService: AppConfigService) => {
    const redisClient = createClient({ url: appConfigService.redis.redisUrl })
      .on('error', (e) => {
        // loggerService.error({ message: 'Redis connection failed', err: e, scope: LoggerErrorScope.RedisError });
        console.log('Redis connection failed');
      })
      .connect();
    return redisClient;
  },
};
