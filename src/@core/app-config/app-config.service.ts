import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { Environment } from './config.validation';
import { appConfig, redisConfig, databaseConfig, strapiConfig, meilisearchConfig } from './namspaces.config';

@Injectable()
export class AppConfigService {
  constructor(
    @Inject(appConfig.KEY)
    private applicationCfg: ConfigType<typeof appConfig>,

    @Inject(redisConfig.KEY)
    private redisCfg: ConfigType<typeof redisConfig>,

    @Inject(strapiConfig.KEY)
    private strapiCfg: ConfigType<typeof strapiConfig>,

    @Inject(databaseConfig.KEY)
    private databaseCfg: ConfigType<typeof databaseConfig>,

    @Inject(meilisearchConfig.KEY)
    private meilisearchCfg: ConfigType<typeof meilisearchConfig>
  ) {}

  get isProduction(): boolean {
    return this.applicationCfg.nodeEnv === Environment.Production;
  }

  get isDevelopment(): boolean {
    return this.applicationCfg.nodeEnv === Environment.Development;
  }

  get app() {
    return this.applicationCfg;
  }

  get redis() {
    return this.redisCfg;
  }

  get strapi() {
    return this.strapiCfg;
  }

  get meilisearch() {
    return this.meilisearchCfg;
  }

  // get jwt() {
  //   return this.jwtCfg;
  // }

  get database() {
    return this.databaseCfg;
  }
}
