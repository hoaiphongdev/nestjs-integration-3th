import { plainToInstance } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional, IsString, validateSync } from 'class-validator';

export enum Environment {
  Development = 'development',
  Production = 'production',
}

export class EnvironmentVariables {
  @IsNotEmpty()
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsOptional()
  APP_VERSION?: string;

  @IsNotEmpty()
  APP_REDIS_URL: string;

  @IsNotEmpty()
  APP_ENVIRONMENT_NAME: string;

  @IsNotEmpty()
  @IsString()
  APP_STRAPI_WEBHOOK_TOKEN: string;

  @IsNotEmpty()
  @IsString()
  APP_STRAPI_ENDPOINT: string;

  @IsNotEmpty()
  @IsString()
  APP_STRAPI_TOKEN: string;

  @IsNotEmpty()
  @IsString()
  APP_MONGO_URL: string;

  @IsNotEmpty()
  @IsString()
  APP_MEILISEARCH_HOST: string;

  @IsNotEmpty()
  @IsString()
  APP_MEILISEARCH_API_KEY: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
