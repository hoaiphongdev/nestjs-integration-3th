import { Module } from '@nestjs/common';

// TODO [CACHE] import module cache for strapi
// import { CacheModule } from '@/cache/cache.module';

// TODO [LOGGER] import module logger for strapi
// import { LoggerModule } from '@/logger/logger.module';

import { AppConfigModule } from '@/@core/app-config';

import { StrapiController } from './strapi.controller';
import { StrapiService } from './strapi.service';

@Module({
  imports: [
    // LoggerModule, 
    AppConfigModule, 
    // acheModule
  ],
  providers: [StrapiService],
  controllers: [StrapiController],
})
export class StrapiModule {}