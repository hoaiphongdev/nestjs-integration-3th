import { MeilisearchDatabaseName } from '@/meilisearch/constants';
import { MeiliSearchService } from '@/meilisearch/meilisearch.service';
import { Injectable } from '@nestjs/common';
import { SearchParams } from 'meilisearch';

@Injectable()
export class SearchEngineService {
  constructor(private readonly meilisearchService: MeiliSearchService) {}

  searchCategory(options?: SearchParams & { searchText?: string }) {
    const { searchText, ...otherOptions } = options || {};
    return this.meilisearchService.search({
      index: MeilisearchDatabaseName.Category,
      searchText,
      options: otherOptions,
    });
  }
}
