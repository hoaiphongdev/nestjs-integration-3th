import { FactoryProvider } from '@nestjs/common';
import { MeiliSearch } from 'meilisearch';

import { AppConfigService } from '@/@core/app-config';

import { MEILISEARCH_PROVIDER_NAME } from './constants';

export const MeilisearchProvider: FactoryProvider<MeiliSearch> = {
  provide: MEILISEARCH_PROVIDER_NAME,
  inject: [AppConfigService],
  useFactory: (appConfigService: AppConfigService) => {
    const meilisearch = new MeiliSearch({
      host: appConfigService.meilisearch.host,
      apiKey: appConfigService.meilisearch.apiKey,
      requestConfig: {
        keepalive: true,
      },
    });
    return meilisearch;
  },
};
