import { registerAs } from '@nestjs/config';

import { Environment } from './config.validation';
import { EnvExtractor } from './env-extractor';

const extractor = new EnvExtractor();

export const appConfig = registerAs('app', () => ({
  port: extractor.getNumber('PORT', 4005),
  nodeEnv: extractor.noPrefix().getEnum<Environment>('NODE_ENV'),
  version: extractor.getString('VERSION'),
  clientUrl: extractor.getString('CLIENT_URL', 'http://localhost:3005'),
  enviromentName: extractor.getString('ENVIRONMENT_NAME'),
}));

export const redisConfig = registerAs('redis', () => ({
  redisUrl: extractor.getString('REDIS_URL'),
}));

export const meilisearchConfig = registerAs('meilisearch', () => ({
  host: extractor.getString('MEILISEARCH_HOST'),
  apiKey: extractor.getString('MEILISEARCH_API_KEY'),
}));

export const databaseConfig = registerAs('database', () => ({
  mongoUrl: extractor.getString('MONGO_URL'),
}));

export const jwtConfig = registerAs('jwt', () => ({}));

export const strapiConfig = registerAs('strapi', () => ({
  webhookToken: extractor.getString('STRAPI_WEBHOOK_TOKEN'),
  endpoint: extractor.getString('STRAPI_ENDPOINT'),
  token: extractor.getString('STRAPI_TOKEN'),
}));

export const namespaceConfigs = [appConfig, databaseConfig, jwtConfig, redisConfig, strapiConfig, meilisearchConfig];
