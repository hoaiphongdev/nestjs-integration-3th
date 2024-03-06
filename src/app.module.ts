import { Module } from '@nestjs/common';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AppConfigModule } from '@/@core/app-config';
import { StrapiModule } from '@/strapi/strapi.module';
import { MeilisearchModule } from '@/meilisearch/meilisearch.module';
import { CategoryModule } from '@/category/category.module';
import { SearchEngineModule } from './search-engine/search-engine.module';
import { RedisModule } from './redis/redis.module';
import { CacheModule } from './cache/cache.module';

@Module({
  imports: [
    AppConfigModule,
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    StrapiModule,
    MeilisearchModule,
    CategoryModule,
    SearchEngineModule,
    RedisModule,
    CacheModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
