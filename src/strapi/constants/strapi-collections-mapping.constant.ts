import { MeilisearchDatabaseName } from '@/meilisearch/constants';

export const StrapiCollectionMapping = {
  [MeilisearchDatabaseName.Restaurant]: 'restaurant',
  [MeilisearchDatabaseName.Category]: 'category',
};
