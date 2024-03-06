export enum LoggerLevel {
  Info = 'info',
  Warn = 'warn',
  Error = 'error',
}

export enum LoggerErrorScope {
  UnknownError = 'unknown_error',
  RedisError = 'redis_error',
  MeiliSearchError = 'meilisearch_error',
  CacheDataError = 'cache_data_error',
}
