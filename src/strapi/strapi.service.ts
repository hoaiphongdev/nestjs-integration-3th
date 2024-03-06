import { Injectable } from '@nestjs/common';
import { Request } from 'express';

import { CacheService } from '@/cache/cache.service';
// TODO [LOGGER] import module logger for strapi
// import { LoggerService } from '@/logger/logger.service';
import { MeilisearchDatabaseName } from '@/meilisearch/constants';
import { CacheKeyPrefix, EventToClearCache, StrapiCollectionMapping } from './constants';

@Injectable()
export class StrapiService {
  constructor(private readonly cacheService: CacheService) {
    // private readonly loggerService: LoggerService,
  }

 async delPatternCache(req: Request): Promise<{ message: string; event: string }> {
    const requestData = req.body;
    // this.loggerService.info({ message: `Strapi webhook was received`, attributes: requestData });
    const meilisearchCollection = StrapiCollectionMapping[requestData.model];

    if (!EventToClearCache.includes(requestData.event)) {
      return { message: 'Event was out of scope', event: requestData.event };
    }

    if ([MeilisearchDatabaseName.Category, MeilisearchDatabaseName.Restaurant].includes(requestData.model)) {
      const searchSuggestionPattern = `${CacheKeyPrefix}/${StrapiCollectionMapping[MeilisearchDatabaseName.Category]}/${
        StrapiCollectionMapping[MeilisearchDatabaseName.Restaurant]
      }*`;
      await this.cacheService.del(searchSuggestionPattern);
    }
    const patternToDelete = `${CacheKeyPrefix}/${meilisearchCollection}*`;
    await this.cacheService.del(patternToDelete);
    return { message: 'Event was handled successfully', event: requestData.event };
  }
}
