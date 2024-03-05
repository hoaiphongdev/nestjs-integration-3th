import { Injectable } from '@nestjs/common';
import { DocumentsQuery, MeiliSearch, MultiSearchQuery, SearchParams } from 'meilisearch';

import { MeilisearchDatabaseName } from '@/meilisearch/constants';

import { InjectMeiliSearch } from './decorators';

@Injectable()
export class MeilisearchRepository {
  constructor(@InjectMeiliSearch() private readonly meiliClient: MeiliSearch) {}

  async getDocument({
    index,
    documentId,
    fields = ['*'],
  }: {
    index: MeilisearchDatabaseName;
    documentId: string;
    fields?: string[];
  }): Promise<Record<string, any>> {
    return this.meiliClient.index(index).getDocument(documentId, {
      fields,
    });
  }

  async getStats({ index }: { index: MeilisearchDatabaseName }) {
    this.meiliClient.index(index).getStats();
  }

  async getDocuments({ index, options }: { index: MeilisearchDatabaseName; options: DocumentsQuery }) {
    return this.meiliClient.index(index).getDocuments(options);
  }

  async search<DataType extends Record<string, any>>({
    index,
    searchText,
    options,
  }: {
    index: MeilisearchDatabaseName;
    searchText?: string;
    options?: SearchParams;
  }) {
    return this.meiliClient.index(index).search<DataType>(searchText, options);
  }

  async multiSearch({ queries }: { queries: MultiSearchQuery[] }) {
    return this.meiliClient.multiSearch({ queries });
  }
}
