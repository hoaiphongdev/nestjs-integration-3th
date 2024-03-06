import { Module } from '@nestjs/common';


import { CacheModule } from '@/cache/cache.module';
import { LoggerModule } from '@/logger/logger.module';
import { RedisModule } from '@/redis/redis.module';
import { AppConfigModule } from '@/@core/app-config';

import { MeilisearchProvider } from './meilisearch.provider';
import { MeilisearchRepository } from './meilisearch.repository';
import { MeiliSearchService } from './meilisearch.service';

@Module({
  imports: [
    AppConfigModule,
    RedisModule,
     LoggerModule,
    CacheModule,
  ],
  providers: [MeilisearchProvider, MeilisearchRepository, MeiliSearchService],
  exports: [MeiliSearchService],
})
export class MeilisearchModule {}
