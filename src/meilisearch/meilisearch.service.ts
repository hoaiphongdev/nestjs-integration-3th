import { Injectable } from '@nestjs/common';
import { fromPairs, sortBy, toPairs } from 'lodash';
import { MultiSearchQuery, SearchParams, SearchResponse } from 'meilisearch';


// TODO [CACHE] Implement cache for meilisearch
// TODO [LOGGER] Implement logger for meilisearch

// import { CacheService } from '@/cache/cache.service';
// import { LoggerErrorScope } from '@/logger/logger.constant';
// import { LoggerService } from '@/logger/logger.service';
import { MeilisearchDatabaseName } from '@/meilisearch/constants';
import { AppConfigService } from '@/@core/app-config';
import { NestedKeys } from '@/@core/types';
import { removeHyphens, findAndSortAllArrayValuesInObject } from '@/@core/utils';
import { CacheKeyPrefix, StrapiCollectionMapping } from '@/strapi/constants';

import { SearchOptions } from './interfaces';
import { MeilisearchRepository } from './meilisearch.repository';

@Injectable()
export class MeiliSearchService {
  constructor(
    private readonly meilisearchRepository: MeilisearchRepository,
    // private readonly cacheService: CacheService,
    // private readonly loggerService: LoggerService,
    private readonly appConfigService: AppConfigService
  ) {}

  private createDocumentCacheKey({
    index,
    uid,
    fields,
  }: {
    index: MeilisearchDatabaseName;
    uid: string;
    fields: string[];
  }) {
    const stringifiedIndex = StrapiCollectionMapping[index];
    const sortedFields = fields.sort().join('/');
    return `${CacheKeyPrefix}/${stringifiedIndex}?/${uid}/${sortedFields}`;
  }

  private createSearchCacheKey({
    indexes,
    searchText = '',
    options,
  }: {
    indexes: MeilisearchDatabaseName[];
    searchText?: string;
    options?: SearchParams;
  }): string {
    const formatedSearchText = searchText.trim().toLowerCase();
    const stringifiedIndexes = indexes
      .sort()
      .map((index) => StrapiCollectionMapping[index])
      .join('/');
    const sortedArrayValue = findAndSortAllArrayValuesInObject(options);
    const orderedObjectKeys = fromPairs(sortBy(toPairs(sortedArrayValue), 0));

    return [CacheKeyPrefix, `${stringifiedIndexes}?`, formatedSearchText, JSON.stringify(orderedObjectKeys)]
      .filter(Boolean)
      .join('/');
  }

  async getDocument<TFields extends Record<string, any>>({
    ignoreCache = false,
    index,
    uid,
    fields = ['*'],
  }: {
    ignoreCache?: boolean;
    index: MeilisearchDatabaseName;
    uid: string;
    fields?: NestedKeys<TFields>[] | ['*'];
  }) {
    const startTime = new Date().getTime();
    const documentId = `${index}-${uid}`;
    try {
      if (ignoreCache) {
        return this.meilisearchRepository.getDocument({ documentId, index, fields });
      }
      // const cacheKey = this.createDocumentCacheKey({
      //   index,
      //   uid,
      //   fields,
      // });
      // const cachedData = await this.cacheService.getCache(cacheKey);
      // if (cachedData.cacheHit) {
      //   return cachedData.data;
      // }
      const result = await this.meilisearchRepository.getDocument({ documentId, index, fields });
      // await this.cacheService.setCache(cacheKey, JSON.stringify(result));
      // const endTime = new Date().getTime();
      // this.loggerService.info({
      //   message: 'Meilisearch get document response time',
      //   attributes: { time: endTime - startTime },
      // });
      return result;
    } catch (error) {
      // this.loggerService.error({
      //   message: 'Error while getting document',
      //   err: error,
      //   scope: LoggerErrorScope.MeiliSearchError,
      // });
    }
    return null;
  }

  public async search<DataType extends Record<string, any>>({
    ignoreCache = true,
    searchText,
    index,
    options,
  }: SearchOptions): Promise<SearchResponse<DataType, SearchParams>> {
    const startTime = new Date().getTime();
    if (ignoreCache) {
      return this.meilisearchRepository.search({ index, searchText, options });
    }
    // const cacheKey = this.createSearchCacheKey({
    //   indexes: [index],
    //   searchText,
    //   options,
    // });
    // const cachedData = await this.cacheService.getCache(cacheKey);
    // if (cachedData.cacheHit) {
    //   return cachedData.data as SearchResponse<DataType, SearchParams>;
    // }

    let formatedSearchText = searchText;
    if (searchText) {
      formatedSearchText = removeHyphens(searchText);
    }
    const result = await this.meilisearchRepository.search<DataType>({
      index,
      searchText: formatedSearchText,
      options,
    });
    // await this.cacheService.setCache(cacheKey, JSON.stringify(result));
    const endTime = new Date().getTime();
    if (this.appConfigService.isProduction) {
      // this.loggerService.info({
      //   message: 'Meilisearch search response time',
      //   attributes: { time: endTime - startTime },
      // });
    }
    return result;
  }

  public async multiSearch({ ignoreCache = false, queries }: { ignoreCache?: boolean; queries: MultiSearchQuery[] }) {
    if (ignoreCache) {
      return this.meilisearchRepository.multiSearch({ queries });
    }

    const indexFromQueries = queries.map((query) => query.indexUid as MeilisearchDatabaseName);
    // const cacheKey = this.createSearchCacheKey({
    //   indexes: indexFromQueries,
    //   searchText: queries[0].q as string,
    //   options: {} as SearchParams,
    // });
    // const cachedData = await this.cacheService.getCache(cacheKey);

    // if (cachedData.cacheHit) {
    //   return cachedData.data;
    // }
    const result = await this.meilisearchRepository.multiSearch({ queries });
    // this.cacheService.setCache(cacheKey, JSON.stringify(result));
    return result;
  }
}
