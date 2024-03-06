import { Inject } from '@nestjs/common';

import { REDIS_PROVIDER_NAME } from '../constants';

export const InjectRedis = () => Inject(REDIS_PROVIDER_NAME);
