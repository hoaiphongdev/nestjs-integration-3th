import { Injectable } from '@nestjs/common';
import { Request } from 'express';

// TODO [CACHE] import module cache for strapi
// import { CacheService } from '@/cache/cache.service';
// TODO [LOGGER] import module logger for strapi
// import { LoggerService } from '@/logger/logger.service';
// TODO [MEILISEARCH] import module meilisearch for strapi
// import { MeilisearchDatabaseName } from '@/meilisearch/constants';

@Injectable()
export class StrapiService {
  constructor() // private readonly loggerService: LoggerService,
  // private readonly cacheService: CacheService
  {}

  delPatternCache(req: Request): { message: string; event: string } {
    // const requestData = req.body;
    // this.loggerService.info({ message: `Strapi webhook was received`, attributes: requestData });
    // const meilisearchCollection = StrapiCollectionMapping[requestData.model];

    // if (!EventToClearCache.includes(requestData.event)) {
    //   return { message: 'Event was out of scope', event: requestData.event };
    // }

    // if ([MeilisearchDatabaseName.Category, MeilisearchDatabaseName.Form].includes(requestData.model)) {
    //   const searchSuggestionPattern = `${CacheKeyPrefix}/${StrapiCollectionMapping[MeilisearchDatabaseName.Category]}/${
    //     StrapiCollectionMapping[MeilisearchDatabaseName.Form]
    //   }*`;
    //   await this.cacheService.delWithPattern(searchSuggestionPattern);
    // }
    // const patternToDelete = `${CacheKeyPrefix}/${meilisearchCollection}*`;
    // await this.cacheService.delWithPattern(patternToDelete);
    // return { message: 'Event was handled successfully', event: requestData.event };
    return { message: 'Event was handled successfully', event: 'something' };
  }
}
