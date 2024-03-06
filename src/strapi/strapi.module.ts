import { Module } from '@nestjs/common';

import { CacheModule } from '@/cache/cache.module';

import { LoggerModule } from '@/logger/logger.module';

import { AppConfigModule } from '@/@core/app-config';

import { StrapiController } from './strapi.controller';
import { StrapiService } from './strapi.service';

@Module({
  imports: [LoggerModule, AppConfigModule, CacheModule],
  providers: [StrapiService],
  controllers: [StrapiController],
})
export class StrapiModule {}
