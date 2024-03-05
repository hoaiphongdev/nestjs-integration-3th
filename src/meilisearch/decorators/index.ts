import { Inject } from '@nestjs/common';

import { MEILISEARCH_PROVIDER_NAME } from '../constants';

export const InjectMeiliSearch = () => Inject(MEILISEARCH_PROVIDER_NAME);
