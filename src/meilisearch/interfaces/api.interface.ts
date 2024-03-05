import { SearchParams } from 'meilisearch';

import { MeilisearchDatabaseName } from '../constants';

export type SearchOptions = {
  ignoreCache?: boolean;
  searchText?: string;
  index: MeilisearchDatabaseName;
  options?: SearchParams;
};
